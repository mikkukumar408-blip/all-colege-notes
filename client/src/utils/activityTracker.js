/* =========================================================================
   ACTIVITY TRACKER & AUDIT TELEMETRY UTILITY (activityTracker.js)
   =========================================================================
   Tracks:
   1. User downloads (Handwritten PDFs, bundles, lab manuals)
   2. User views (Units, chapters, subjects)
   3. Account registrations & logins
   4. Super Admin audit reporting & statistics
   5. Super Admin user management (Change Password & Delete User)
   ========================================================================= */

import { hashPasswordPBKDF2 } from './security';
import { pushCloudUsers, pullCloudUsers, getLocalUsers, saveLocalUsers, broadcastUsers, getApiBase, mergeUsers, getDeviceName } from './cloudSync';

const STORAGE_KEY_ACTIVITIES = 'college_notes_user_activities';
const STORAGE_KEY_USERS = 'college_notes_registered_users';
const STORAGE_KEY_DELETED = 'college_notes_deleted_users';

// Pre-seeded base accounts
export const PRESEEDED_ACCOUNTS = [
  {
    username: 'Bhavya Mishra',
    role: 'superadmin',
    isSuperAdmin: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    bio: 'Root Master Administrator',
    lastDevice: 'Windows PC (Chrome)'
  },
  {
    username: 'student',
    role: 'student',
    isSuperAdmin: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    bio: 'Verified College Student',
    lastDevice: 'Windows PC (Chrome)'
  },
  {
    username: 'mikumandal',
    role: 'student',
    isSuperAdmin: false,
    createdAt: '2026-02-15T00:00:00.000Z',
    bio: 'B.Tech CS Undergrad',
    lastDevice: 'Android Phone (Chrome)'
  },
  {
    username: 'engineer',
    role: 'student',
    isSuperAdmin: false,
    createdAt: '2026-02-20T00:00:00.000Z',
    bio: 'Electrical Engineering Peer',
    lastDevice: 'Apple iPhone (Safari)'
  }
];

// Pre-seeded initial activities with device names & AI query examples
const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    username: 'mikumandal',
    action: 'DOWNLOAD',
    resource: 'BCSE-011: Fundamentals of AI & ML (12-Page Handwritten PDF)',
    details: 'Downloaded authentic classroom handwritten PDF with A* trace & Apriori numericals',
    device: 'Android Phone (Chrome)',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    badgeColor: '#f59e0b'
  },
  {
    id: 'act-ai-1',
    username: 'mikumandal',
    action: 'AI_QUERY',
    resource: 'Data Structures & Algorithms',
    details: 'Explain AVL tree balance factor calculation and LL/LR double rotation rules with tree diagrams.',
    device: 'Android Phone (Chrome)',
    model: 'openai/gpt-oss-120b',
    solutionSnippet: '📌 Core Concept: AVL tree maintains balance factor bf(v) in {-1,0,1}. LL case requires single right rotation; LR case requires left rotation on left child followed by right rotation.',
    timestamp: new Date(Date.now() - 11 * 60 * 1000).toISOString(),
    badgeColor: '#a855f7'
  },
  {
    id: 'act-2',
    username: 'mikumandal',
    action: 'VIEW',
    resource: 'BCSE-011: Unit 1 Foundations of AI & ML Notes',
    details: 'Viewed Russell & Norvig 4 Approaches & PEAS Framework in Real Notebook mode',
    device: 'Android Phone (Chrome)',
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    badgeColor: '#00f0ff'
  },
  {
    id: 'act-3',
    username: 'student',
    action: 'DOWNLOAD',
    resource: 'BELE-001: Basic Electrical Engineering (BEEE) Solved Derivations',
    details: 'Downloaded Norton / Thevenin theorem step-by-step solved derivations',
    device: 'Windows PC (Chrome)',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    badgeColor: '#f59e0b'
  },
  {
    id: 'act-ai-2',
    username: 'student',
    action: 'AI_QUERY',
    resource: 'Basic Electrical & Electronics (BEEE)',
    details: 'How to calculate Thevenin equivalent resistance R_th and open-circuit voltage V_th across terminals A-B?',
    device: 'Windows PC (Chrome)',
    model: 'openai/gpt-oss-120b',
    solutionSnippet: '📌 Core Concept: Thevenin model is single voltage source V_th in series with R_th. Independent sources zeroed: voltage sources shorted, current sources open.',
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    badgeColor: '#a855f7'
  },
  {
    id: 'act-4',
    username: 'student',
    action: 'VIEW',
    resource: 'BELE-001: Unit 2 AC Circuits & Phasor Diagrams',
    details: 'Viewed interactive RLC resonance vector circuit schematic',
    device: 'Windows PC (Chrome)',
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    badgeColor: '#00f0ff'
  },
  {
    id: 'act-ai-3',
    username: 'Bhavya Mishra',
    action: 'AI_QUERY',
    resource: 'Engineering Mathematics',
    details: 'Evaluate Gaussian integral \\int_0^\\infty e^{-x^2} dx using the double integral polar coordinates method.',
    device: 'Windows PC (Chrome)',
    model: 'openai/gpt-oss-120b',
    solutionSnippet: '📌 Core Concept: Gaussian integral I evaluated by squaring I^2 = \\iint e^{-(x^2+y^2)} dx dy, converting to polar coordinates r dr d\\theta over the first quadrant.',
    timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    badgeColor: '#a855f7'
  },
  {
    id: 'act-5',
    username: 'rahul_sharma',
    action: 'DOWNLOAD',
    resource: 'BCSE-011: Unit 2 A* Search Graph Trace Table',
    details: 'Downloaded 14-Mark university numerical question with Open/Closed list',
    device: 'Apple iPhone (Safari)',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    badgeColor: '#f59e0b'
  },
  {
    id: 'act-6',
    username: 'Bhavya Mishra',
    action: 'AUTH',
    resource: 'Super Admin Command Console',
    details: 'Root administrator session initialized with elevated clearance',
    device: 'Windows PC (Chrome)',
    timestamp: new Date().toISOString(),
    badgeColor: '#22c55e'
  }
];

// Helper to get all recorded activities
export function getUserActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  try {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
  } catch (e) {}
  return INITIAL_ACTIVITIES;
}

// Log a new user action with device detection
export function logUserActivity(username, action, resource, details = '', metadata = {}) {
  try {
    const activities = getUserActivities();
    const cleanUser = username || 'Guest';
    const currentDevice = metadata.device || getDeviceName();

    let badgeColor = '#00f0ff';
    if (action === 'DOWNLOAD') badgeColor = '#f59e0b';
    if (action === 'AUTH') badgeColor = '#22c55e';
    if (action === 'VIEW') badgeColor = '#38bdf8';
    if (action === 'AI_QUERY') badgeColor = '#a855f7';
    if (action.includes('ADMIN')) badgeColor = '#ef4444';

    const newActivity = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      username: cleanUser,
      action: action.toUpperCase(),
      resource,
      details,
      device: currentDevice,
      timestamp: new Date().toISOString(),
      badgeColor,
      ...metadata
    };

    const updated = [newActivity, ...activities].slice(0, 250);
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
    return newActivity;
  } catch (e) {
    console.error('Failed to log activity:', e);
  }
}

// Get deleted users blacklist
function getDeletedUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Helper to retrieve all registered accounts + aggregate stats
export function getAllAccountsWithStats(customUsers = null) {
  const localUsers = getLocalUsers();
  const incoming = Array.isArray(customUsers) && customUsers.length > 0 ? customUsers : [];
  const storedUsers = mergeUsers(localUsers, incoming);

  const deletedList = getDeletedUsers().map(u => u.toLowerCase());

  const map = new Map();
  PRESEEDED_ACCOUNTS.forEach((acc) => {
    if (!deletedList.includes(acc.username.toLowerCase())) {
      map.set(acc.username.toLowerCase(), { ...acc });
    }
  });

  storedUsers.forEach((u) => {
    if (!u || !u.username) return;
    const key = u.username.toLowerCase();
    if (!deletedList.includes(key)) {
      if (map.has(key)) {
        map.set(key, { ...map.get(key), ...u });
      } else {
        map.set(key, {
          username: u.username,
          role: (key === 'bhavya mishra' || u.role === 'superadmin') ? 'superadmin' : 'student',
          isSuperAdmin: key === 'bhavya mishra' || !!u.isSuperAdmin,
          createdAt: u.createdAt || new Date().toISOString(),
          updatedAt: u.updatedAt,
          bio: u.bio || 'Student Account'
        });
      }
    }
  });

  const allAccounts = Array.from(map.values());
  const activities = getUserActivities();

  return allAccounts.map((acc) => {
    const userActs = activities.filter(
      (a) => (a.username || '').toLowerCase() === acc.username.toLowerCase()
    );
    const downloadsList = userActs.filter((a) => a.action === 'DOWNLOAD');
    const viewsList = userActs.filter((a) => a.action === 'VIEW');
    const aiQueriesList = userActs.filter((a) => a.action === 'AI_QUERY');
    const lastActive = userActs.length > 0 ? userActs[0].timestamp : (acc.updatedAt || acc.createdAt);

    // Detect user device from activeDevices, activity telemetry, or fallback
    const detectedDevice = acc.lastDevice || 
      (acc.activeDevices && acc.activeDevices[0]?.deviceName) || 
      (userActs.find(a => a.device)?.device) || 
      'Windows PC (Chrome)';

    return {
      ...acc,
      downloadsCount: downloadsList.length,
      viewsCount: viewsList.length,
      aiQueriesCount: aiQueriesList.length,
      downloads: downloadsList,
      aiQueries: aiQueriesList,
      views: viewsList,
      device: detectedDevice,
      activeDevices: acc.activeDevices || [],
      totalActions: userActs.length,
      lastActive
    };
  });
}

/**
 * Returns comprehensive audit details for a specific user:
 * - All downloaded notes/PDFs
 * - All questions asked to the AI Academic Mentor
 * - All viewed units/chapters
 * - Detected devices and login history
 */
export function getAccountFullAudit(username) {
  if (!username) return { downloads: [], views: [], aiQueries: [], allActivities: [] };
  const clean = username.toLowerCase().trim();
  const allActs = getUserActivities();
  const userActs = allActs.filter(a => (a.username || '').toLowerCase().trim() === clean);

  // Cross-reference with campusnotes_student_doubts from localStorage
  let forumDoubts = [];
  try {
    const rawDoubts = localStorage.getItem('campusnotes_student_doubts');
    if (rawDoubts) {
      const parsed = JSON.parse(rawDoubts);
      forumDoubts = parsed.filter(d => (d.author || '').toLowerCase().includes(clean));
    }
  } catch (e) {}

  const downloads = userActs.filter(a => a.action === 'DOWNLOAD');
  const views = userActs.filter(a => a.action === 'VIEW');
  
  // Combine activity tracker AI queries and forum doubts asked by this user
  const aiQueriesMap = new Map();
  userActs.filter(a => a.action === 'AI_QUERY').forEach(q => {
    aiQueriesMap.set(q.details, q);
  });

  forumDoubts.forEach(d => {
    if (!aiQueriesMap.has(d.question)) {
      aiQueriesMap.set(d.question, {
        id: d.id,
        username: d.author,
        action: 'AI_QUERY',
        resource: d.subject,
        details: d.question,
        solutionSnippet: d.bestAnswer ? d.bestAnswer.slice(0, 300) : '',
        fullAnswer: d.bestAnswer,
        model: d.aiModel || 'openai/gpt-oss-120b',
        device: d.device || 'Windows PC (Chrome)',
        timestamp: d.date === 'Just now' ? new Date().toISOString() : d.date
      });
    }
  });

  return {
    downloads,
    views,
    aiQueries: Array.from(aiQueriesMap.values()),
    allActivities: userActs
  };
}

// =========================================================================
// SUPER ADMIN PRIVILEGED ACTIONS: Change Password & Delete User
// =========================================================================

/**
 * Change a user's password directly from Super Admin Panel
 */
export async function adminChangeUserPassword(username, newPassword) {
  if (!username || !newPassword) {
    return { success: false, message: 'Username and new password are required.' };
  }
  const cleanPass = newPassword.trim();
  if (cleanPass.length < 5) {
    return { success: false, message: 'New password must be at least 5 characters.' };
  }

  // Guard against changing Master Super Admin root password
  if (username.trim().toLowerCase() === 'bhavya mishra') {
    return { 
      success: false, 
      message: '🛑 Access Denied: The Master Super Admin root password (@Bhavya Mishra) is permanently protected and cannot be changed from this panel.' 
    };
  }

  try {
    // 1. First fetch latest cloud accounts to prevent overwriting other sessions
    const local = getLocalUsers();
    let cloud = [];
    try {
      cloud = await pullCloudUsers();
    } catch (e) {}
    let users = mergeUsers(local, Array.isArray(cloud) ? cloud : []);

    // 2. Hash with PBKDF2-100k + Salt
    const { salt, hash } = await hashPasswordPBKDF2(cleanPass);

    const cleanUsername = username.trim();
    const isSuperAdmin = cleanUsername.toLowerCase() === 'bhavya mishra';
    const nowISO = new Date().toISOString();

    const userIndex = users.findIndex(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    const updatedUserObj = {
      username: cleanUsername,
      salt,
      passwordHash: hash,
      password: cleanPass, // plaintext fallback for instant verification compatibility
      role: isSuperAdmin ? 'superadmin' : 'student',
      isSuperAdmin,
      updatedAt: nowISO
    };

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updatedUserObj
      };
    } else {
      users.push({
        ...updatedUserObj,
        createdAt: nowISO
      });
    }

    // 3. Save locally and broadcast across tabs
    saveLocalUsers(users);
    broadcastUsers(users);

    // 4. Send directly to Vercel Serverless API (supporting both parameter variants)
    try {
      const apiBase = getApiBase();
      await fetch(`${apiBase}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUsername,
          newPassword: cleanPass,
          password: cleanPass,
          salt,
          hash,
          newSalt: salt,
          newHash: hash,
          passwordHash: hash
        })
      });
    } catch (e) {}

    // 5. Await push to cloud so cloud database is immediately synchronized
    try { 
      await pushCloudUsers(users); 
    } catch (e) {}

    logUserActivity(
      'Bhavya Mishra',
      'ADMIN_ACTION',
      `Password Changed for @${cleanUsername}`,
      `Super Admin reset password for @${cleanUsername} using PBKDF2-100k encryption`
    );

    return { 
      success: true, 
      message: `Password for @${cleanUsername} has been successfully updated with PBKDF2-100k encryption!` 
    };
  } catch (err) {
    return { success: false, message: 'Failed to update password: ' + err.message };
  }
}

/**
 * Permanently delete a user account from Super Admin Panel
 */
export async function adminDeleteUser(username) {
  if (!username) {
    return { success: false, message: 'Username is required.' };
  }

  // Guard against deleting Super Admin root account
  if (username.toLowerCase() === 'bhavya mishra') {
    return { 
      success: false, 
      message: '🛑 Access Denied: The Master Super Admin root account (@Bhavya Mishra) cannot be deleted.' 
    };
  }

  try {
    // 1. Remove from registered users
    let users = getLocalUsers();
    try {
      const cloud = await pullCloudUsers();
      if (Array.isArray(cloud) && cloud.length > 0) {
        users = cloud;
      }
    } catch (e) {}

    const updatedUsers = users.filter(
      (u) => u.username.toLowerCase() !== username.trim().toLowerCase()
    );
    saveLocalUsers(updatedUsers);
    broadcastUsers(updatedUsers);

    // 2. Add to deleted blacklist (so preseeded accounts like 'student' don't reappear)
    const deleted = getDeletedUsers();
    if (!deleted.map(u => u.toLowerCase()).includes(username.trim().toLowerCase())) {
      deleted.push(username.trim());
      localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(deleted));
    }

    // 3. Delete from Vercel API
    try {
      const apiBase = getApiBase();
      await fetch(`${apiBase}/${encodeURIComponent(username.trim())}`, {
        method: 'DELETE'
      });
    } catch (e) {}

    try { 
      await pushCloudUsers(updatedUsers); 
    } catch (e) {}

    // 4. Log the deletion audit event
    logUserActivity(
      'Bhavya Mishra',
      'ADMIN_ACTION',
      `Account Deleted: @${username}`,
      `Super Admin permanently expunged user account from portal`
    );

    return { 
      success: true, 
      message: `Account @${username} has been permanently deleted.` 
    };
  } catch (err) {
    return { success: false, message: 'Failed to delete user: ' + err.message };
  }
}

// Reset activity logs
export function resetActivityLogs() {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
  } catch (e) {}
}
