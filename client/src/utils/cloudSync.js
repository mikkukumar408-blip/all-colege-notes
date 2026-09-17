/* =========================================================================
   CROSS-DEVICE CLOUD SYNCHRONIZATION ENGINE (cloudSync.js)
   =========================================================================
   Enables multi-device persistent accounts across phones, laptops, and tablets.
   Syncs accounts, password updates, and user deletions in real-time.
   ========================================================================= */

export const getApiBase = () => {
  if (typeof window !== 'undefined') {
    return '/api/users';
  }
  return 'https://all-college-notes.vercel.app/api/users';
};

// Primary KV backup object ID (Active & verified)
const BACKUP_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0ae98a56225a3';
const STORAGE_KEY_USERS = 'college_notes_registered_users';
const STORAGE_KEY_DELETED = 'college_notes_deleted_users';

// Real-time Cross-Tab BroadcastChannel
export const authBroadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('college_notes_auth_sync')
  : null;

export function broadcastUsers(usersList) {
  try {
    authBroadcastChannel?.postMessage({
      type: 'USERS_UPDATED',
      users: usersList,
      timestamp: Date.now()
    });
  } catch (e) {}
}

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

  // 1. Initialize with baseline seed accounts
  for (const s of SEED_ACCOUNTS) {
    const key = s.username.toLowerCase();
    if (!deleted.includes(key)) {
      map.set(key, { ...s });
    }
  }

  // 2. Helper to merge any candidate user
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
      // Candidate is strictly newer - overwrite with candidate
      map.set(key, { ...existing, ...candidate });
    } else if (candidateTime < existingTime) {
      // Existing is strictly newer - keep existing credentials
      map.set(key, { ...candidate, ...existing });
    } else {
      // Same or zero timestamp:
      // If candidate has a custom password or passwordHash and existing does not, take candidate
      const candidateHasCustom = Boolean(candidate.salt || (candidate.passwordHash && candidate.passwordHash !== '1e0489c5be19d207c5af83e422088a8ce588b04ee9096f78e4efd2478254448b') || (candidate.password && candidate.password !== 'password123'));
      const existingHasCustom = Boolean(existing.salt || (existing.passwordHash && existing.passwordHash !== '1e0489c5be19d207c5af83e422088a8ce588b04ee9096f78e4efd2478254448b') || (existing.password && existing.password !== 'password123'));

      if (candidateHasCustom && !existingHasCustom) {
        map.set(key, { ...existing, ...candidate });
      } else if (!candidateHasCustom && existingHasCustom) {
        map.set(key, { ...candidate, ...existing });
      } else {
        map.set(key, { ...existing, ...candidate });
      }
    }
  };

  // Merge cloud accounts first
  if (Array.isArray(cloudList)) {
    for (const c of cloudList) {
      mergeCandidate(c);
    }
  }

  // Merge local accounts (local fresh edits take precedence if timestamp matches or is higher)
  if (Array.isArray(localList)) {
    for (const l of localList) {
      mergeCandidate(l);
    }
  }

  return Array.from(map.values());
}

export async function pullCloudUsers() {
  let serverUsers = null;
  let backupUsers = null;

  try {
    const results = await Promise.allSettled([
      // 1. First-Party Vercel Serverless Endpoint (/api/users)
      (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(getApiBase(), { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.users) && json.users.length > 0) {
            return json.users;
          }
        }
        return null;
      })(),
      // 2. Secondary: Backup external KV store
      (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(BACKUP_URL, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const json = await res.json();
          if (json && json.data && Array.isArray(json.data.users) && json.data.users.length > 0) {
            return json.data.users;
          }
        }
        return null;
      })()
    ]);

    if (results[0].status === 'fulfilled' && results[0].value) {
      serverUsers = results[0].value;
    }
    if (results[1].status === 'fulfilled' && results[1].value) {
      backupUsers = results[1].value;
    }
  } catch (err) {
    // fallback
  }

  let combinedCloud = [];
  if (serverUsers && backupUsers) {
    combinedCloud = mergeUsers(serverUsers, backupUsers);
  } else if (serverUsers) {
    combinedCloud = serverUsers;
  } else if (backupUsers) {
    combinedCloud = backupUsers;
  }

  const local = getLocalUsers();
  const merged = mergeUsers(local, combinedCloud);
  saveLocalUsers(merged);
  return merged;
}

export async function pushCloudUsers(usersList) {
  saveLocalUsers(usersList);
  broadcastUsers(usersList);

  const payload = {
    name: 'college_notes_cloud_users_v2',
    data: {
      system: 'All College Notes Cloud Account Synchronizer',
      updatedAt: new Date().toISOString(),
      users: usersList
    }
  };

  try {
    await Promise.allSettled([
      fetch(getApiBase() + '/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: usersList })
      }),
      fetch(BACKUP_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    ]);
  } catch (e) {}
}

export async function syncNewUserToCloud(newUser) {
  const now = new Date().toISOString();
  const cleanUser = {
    ...newUser,
    createdAt: newUser.createdAt || now,
    updatedAt: newUser.updatedAt || now
  };

  // 1. Immediately save to local storage & broadcast to open tabs
  const local = getLocalUsers();
  const idx = local.findIndex(u => u.username.toLowerCase() === cleanUser.username.toLowerCase());
  if (idx >= 0) {
    local[idx] = { ...local[idx], ...cleanUser };
  } else {
    local.push(cleanUser);
  }
  saveLocalUsers(local);
  broadcastUsers(local);

  // 2. Push directly to /api/users for immediate registration
  try {
    await fetch(getApiBase(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanUser)
    });
  } catch (e) {}

  // 3. Pull latest cloud users, merge, and push back to KV backup
  const current = await pullCloudUsers();
  const currentIdx = current.findIndex(u => u.username.toLowerCase() === cleanUser.username.toLowerCase());
  if (currentIdx >= 0) {
    current[currentIdx] = { ...current[currentIdx], ...cleanUser };
  } else {
    current.push(cleanUser);
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
