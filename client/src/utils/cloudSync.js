/* =========================================================================
   CROSS-DEVICE CLOUD SYNCHRONIZATION ENGINE (cloudSync.js)
   =========================================================================
   Enables multi-device persistent accounts across phones, laptops, and tablets.
   Syncs accounts, password updates, and user deletions in real-time.
   ========================================================================= */

const PRIMARY_URL = 'https://api.restful-api.dev/objects/ff808181a067127101a094bcbe660013';
const BACKUP_URL = 'https://api.restful-api.dev/objects/ff808181a067127101a094bd364e0014';
const STORAGE_KEY_USERS = 'college_notes_registered_users';
const STORAGE_KEY_DELETED = 'college_notes_deleted_users';

export const SUPER_ADMIN_ACCOUNT = {
  username: 'Bhavya Mishra',
  // Password stored as SHA-256 hash only — plaintext never in source
  passwordHash: '1e0489c5be19d207c5af83e422088a8ce588b04ee9096f78e4efd2478254448b',
  role: 'superadmin',
  isSuperAdmin: true,
  createdAt: '2026-01-01T00:00:00.000Z'
};

export const SEED_ACCOUNTS = [
  SUPER_ADMIN_ACCOUNT,
  {
    username: 'student123',
    role: 'student',
    salt: '492dc069b4896dc685b4ac3915d4b304',
    passwordHash: 'a1bfb0afa2fe31d4120ac198fdc803225eeadcdea7630e3582a41359d4eb84bf',
    createdAt: '2026-09-12T08:00:00.000Z'
  },
  { username: 'student', password: 'password123', role: 'student', createdAt: '2026-01-01T00:00:00.000Z' },
  { username: 'engineer', password: 'password123', role: 'student', createdAt: '2026-01-01T00:00:00.000Z' },
  { username: 'mikumandal', password: 'password123', role: 'student', createdAt: '2026-02-15T00:00:00.000Z' }
];

export function getDeletedList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getLocalUsers() {
  const deleted = getDeletedList().map(u => u.toLowerCase());
  const map = new Map();

  // Load baseline seed accounts
  for (const s of SEED_ACCOUNTS) {
    const key = s.username.toLowerCase();
    if (!deleted.includes(key)) {
      map.set(key, { ...s });
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        for (const p of parsed) {
          if (!p || !p.username) continue;
          const key = p.username.toLowerCase();
          if (deleted.includes(key)) continue;
          map.set(key, { ...(map.get(key) || {}), ...p });
        }
      }
    }
  } catch (e) {}

  return Array.from(map.values());
}

export function saveLocalUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {}
}

export function mergeUsers(localList, cloudList) {
  const deleted = getDeletedList().map(u => u.toLowerCase());
  const map = new Map();

  // Baseline seed accounts
  for (const s of SEED_ACCOUNTS) {
    const key = s.username.toLowerCase();
    if (!deleted.includes(key)) {
      map.set(key, { ...s });
    }
  }

  // Helper to merge candidate respecting timestamps & upgraded hashes
  const mergeCandidate = (candidate) => {
    if (!candidate || !candidate.username) return;
    const key = candidate.username.toLowerCase();
    if (deleted.includes(key)) return;

    if (!map.has(key)) {
      map.set(key, { ...candidate });
      return;
    }

    const existing = map.get(key);
    const existingTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
    const candidateTime = candidate.updatedAt ? new Date(candidate.updatedAt).getTime() : 0;

    if (candidateTime > existingTime) {
      // Candidate is newer - overwrite with candidate
      map.set(key, { ...existing, ...candidate });
    } else if (candidateTime < existingTime) {
      // Existing is newer - keep existing credentials, preserve new secondary fields
      map.set(key, { ...candidate, ...existing });
    } else {
      // Same or missing timestamp: prefer the one with salt & passwordHash (PBKDF2)
      const candidateHasSalt = Boolean(candidate.salt && candidate.passwordHash);
      const existingHasSalt = Boolean(existing.salt && existing.passwordHash);

      if (candidateHasSalt && !existingHasSalt) {
        map.set(key, { ...existing, ...candidate });
      } else {
        map.set(key, { ...existing, ...candidate });
      }
    }
  };

  // Merge cloud accounts
  if (Array.isArray(cloudList)) {
    for (const c of cloudList) {
      mergeCandidate(c);
    }
  }

  // Merge local accounts (local fresh edits take precedence if timestamp matches)
  if (Array.isArray(localList)) {
    for (const l of localList) {
      mergeCandidate(l);
    }
  }

  return Array.from(map.values());
}

export async function pullCloudUsers() {
  let cloudUsers = null;

  // Try Primary
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(PRIMARY_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.users)) {
        cloudUsers = json.data.users;
      }
    }
  } catch (err) {
    // silently fallback
  }

  // Try Backup if needed
  if (!cloudUsers) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(BACKUP_URL, { signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && Array.isArray(json.data.users)) {
          cloudUsers = json.data.users;
        }
      }
    } catch (err) {
      // fallback
    }
  }

  const local = getLocalUsers();
  const merged = mergeUsers(local, cloudUsers || []);
  saveLocalUsers(merged);
  return merged;
}

export async function pushCloudUsers(usersList) {
  saveLocalUsers(usersList);

  const payload = {
    name: 'all_college_notes_cloud_db_v1',
    data: {
      system: 'All College Notes Cloud Account Synchronizer',
      updatedAt: new Date().toISOString(),
      users: usersList
    }
  };

  const putOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  try {
    await Promise.allSettled([
      fetch(PRIMARY_URL, putOptions),
      fetch(BACKUP_URL, putOptions)
    ]);
  } catch (e) {}
}

export async function syncNewUserToCloud(newUser) {
  const current = await pullCloudUsers();
  const index = current.findIndex(u => u.username.toLowerCase() === newUser.username.toLowerCase());
  if (index >= 0) {
    current[index] = { ...current[index], ...newUser };
  } else {
    current.push(newUser);
  }
  await pushCloudUsers(current);
  return current;
}


// =========================================================================
// MULTI-DEVICE SIMULTANEOUS SESSION ENFORCER (MAX 2 DEVICES PER ACCOUNT)
// =========================================================================

export function getDeviceId() {
  try {
    let id = localStorage.getItem('college_notes_device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      localStorage.setItem('college_notes_device_id', id);
    }
    return id;
  } catch (e) {
    return 'dev_' + Date.now();
  }
}

export function getDeviceName() {
  if (typeof navigator === 'undefined') return 'Authorized Device';
  const ua = navigator.userAgent || '';
  let os = 'Device';
  if (/android/i.test(ua)) os = 'Android Phone';
  else if (/iphone/i.test(ua)) os = 'Apple iPhone';
  else if (/ipad/i.test(ua)) os = 'Apple iPad';
  else if (/windows/i.test(ua)) os = 'Windows PC';
  else if (/macintosh|mac os x/i.test(ua)) os = 'Mac Computer';
  else if (/linux/i.test(ua)) os = 'Linux PC';

  let browser = 'Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';

  return os + ' (' + browser + ')';
}

/**
 * Validates and enforces maximum 2 simultaneous active devices for any account
 */
export async function verifyAndRegisterDeviceSession(username) {
  const currentDeviceId = getDeviceId();
  const currentDeviceName = getDeviceName();
  const clean = username.trim().toLowerCase();

  // Pull latest users from cloud
  const users = await pullCloudUsers();
  const user = users.find(u => u.username.toLowerCase() === clean);

  if (!user) {
    return { allowed: true, deviceId: currentDeviceId };
  }

  // Ensure activeDevices array exists
  let devices = Array.isArray(user.activeDevices) ? [...user.activeDevices] : [];

  // Filter out expired devices (inactive for > 24 hours)
  const now = Date.now();
  const EXPIRY_MS = 24 * 60 * 60 * 1000;
  devices = devices.filter(d => {
    if (!d || !d.deviceId) return false;
    const last = d.lastActive ? new Date(d.lastActive).getTime() : 0;
    return (now - last) < EXPIRY_MS;
  });

  // Check if current device is already one of the registered sessions
  const existingIndex = devices.findIndex(d => d.deviceId === currentDeviceId);

  if (existingIndex !== -1) {
    // Already registered device, refresh activity timestamp
    devices[existingIndex].lastActive = new Date().toISOString();
    devices[existingIndex].deviceName = currentDeviceName;
    user.activeDevices = devices;
    await pushCloudUsers(users);
    return { allowed: true, deviceId: currentDeviceId, activeDevices: devices };
  }

  // New device trying to log in! Check limit (MAX 2 SIMULTANEOUS DEVICES)
  if (devices.length >= 2) {
    return {
      allowed: false,
      deviceId: currentDeviceId,
      activeDevices: devices,
      message: '🚫 SIMULTANEOUS DEVICE LIMIT REACHED: This account is already active on 2 devices simultaneously (' + devices.map(d => d.deviceName).join(' & ') + '). Maximum 2 devices allowed simultaneously.'
    };
  }

  // Under limit (0 or 1 device currently active), register this 2nd device!
  devices.push({
    deviceId: currentDeviceId,
    deviceName: currentDeviceName,
    lastActive: new Date().toISOString()
  });

  user.activeDevices = devices;
  await pushCloudUsers(users);

  return { allowed: true, deviceId: currentDeviceId, activeDevices: devices };
}

/**
 * Force logout older devices and establish current device session
 */
export async function forceLoginThisDevice(username) {
  const currentDeviceId = getDeviceId();
  const currentDeviceName = getDeviceName();
  const clean = username.trim().toLowerCase();

  const users = await pullCloudUsers();
  const user = users.find(u => u.username.toLowerCase() === clean);

  if (user) {
    user.activeDevices = [
      {
        deviceId: currentDeviceId,
        deviceName: currentDeviceName,
        lastActive: new Date().toISOString()
      }
    ];
    await pushCloudUsers(users);
  }

  return { allowed: true, deviceId: currentDeviceId };
}

/**
 * Logout this device and free up the slot immediately
 */
export async function removeDeviceSession(username) {
  if (!username) return;
  const currentDeviceId = getDeviceId();
  const clean = username.trim().toLowerCase();

  try {
    const users = await pullCloudUsers();
    const user = users.find(u => u.username.toLowerCase() === clean);
    if (user && Array.isArray(user.activeDevices)) {
      user.activeDevices = user.activeDevices.filter(d => d.deviceId !== currentDeviceId);
      await pushCloudUsers(users);
    }
  } catch (e) {}
}

/**
 * Session Heartbeat: checks if this device is still authorized
 */
export async function checkDeviceSessionActive(username) {
  if (!username) return true;
  const currentDeviceId = getDeviceId();
  const clean = username.trim().toLowerCase();

  try {
    const users = getLocalUsers();
    const user = users.find(u => u.username.toLowerCase() === clean);
    if (user && Array.isArray(user.activeDevices) && user.activeDevices.length > 0) {
      return user.activeDevices.some(d => d.deviceId === currentDeviceId);
    }
    return true;
  } catch (e) {
    return true;
  }
}
