/* =========================================================================
   REAL-TIME VISITOR TRACKING & TELEMETRY CLIENT (visitorTracker.js)
   =========================================================================
   Tracks unique visitors across Android Native APK and Web Browser.
   Zero personal data, privacy-respecting, high performance.
   ========================================================================= */

import { getApiUrl } from './cloudSync';

const STORAGE_KEY_VISITOR_ID = 'college_notes_visitor_id';
const STORAGE_KEY_LAST_VISIT_PING = 'college_notes_last_visit_ping';

/**
 * Returns a persistent unique visitor ID for this device / browser.
 */
export function getVisitorId() {
  try {
    let id = localStorage.getItem(STORAGE_KEY_VISITOR_ID);
    if (!id) {
      id = 'vis_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEY_VISITOR_ID, id);
    }
    return id;
  } catch (e) {
    return 'vis_' + Math.random().toString(36).substring(2, 10);
  }
}

/**
 * Detects whether the user is on the native mobile app or web browser.
 */
export function getPlatformType() {
  if (typeof window === 'undefined') return 'web';
  const isNative = 
    Boolean(window.Capacitor?.isNativePlatform?.()) ||
    window.location.protocol === 'capacitor:' ||
    window.location.protocol === 'file:';
  return isNative ? 'app' : 'web';
}

/**
 * Detects readable device / operating system.
 */
export function getDeviceDetails() {
  if (typeof navigator === 'undefined') return 'Standard Device';
  const ua = navigator.userAgent || '';
  const isNativeApp = getPlatformType() === 'app';

  let os = 'Device';
  if (/android/i.test(ua)) os = isNativeApp ? 'Android Phone (App)' : 'Android Phone';
  else if (/iphone/i.test(ua)) os = 'Apple iPhone';
  else if (/ipad/i.test(ua)) os = 'Apple iPad';
  else if (/windows/i.test(ua)) os = 'Windows PC';
  else if (/macintosh|mac os x/i.test(ua)) os = 'Mac Computer';
  else if (/linux/i.test(ua)) os = 'Linux PC';

  let browser = '';
  if (!isNativeApp) {
    if (/edg/i.test(ua)) browser = ' • Edge';
    else if (/chrome|crios/i.test(ua)) browser = ' • Chrome';
    else if (/firefox|fxios/i.test(ua)) browser = ' • Firefox';
    else if (/safari/i.test(ua)) browser = ' • Safari';
  }

  return os + browser;
}

/**
 * Automatically records a visit to the backend / cloud KV store.
 * Rate-limited to once every 15 minutes per device to avoid artificial inflation.
 */
export async function recordVisit(page = 'home') {
  const visitorId = getVisitorId();
  const platform = getPlatformType();
  const device = getDeviceDetails();

  // Throttle check (max 1 hit every 15 minutes)
  try {
    const lastPing = parseInt(localStorage.getItem(STORAGE_KEY_LAST_VISIT_PING) || '0', 10);
    const now = Date.now();
    if (now - lastPing < 15 * 60 * 1000) {
      return null; // Already recorded recently
    }
    localStorage.setItem(STORAGE_KEY_LAST_VISIT_PING, String(now));
  } catch (e) {}

  try {
    const payload = {
      visitorId,
      platform,
      device,
      page,
      timestamp: new Date().toISOString()
    };

    const res = await fetch(getApiUrl('/api/visitors'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Silent fail in case of offline/network issues
  }
  return null;
}

/**
 * Fetches the latest visitor analytics from the server.
 */
export async function fetchVisitorStats() {
  try {
    const res = await fetch(getApiUrl('/api/visitors'));
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {}

  return {
    totalVisitors: 0,
    totalVisits: 0,
    appVisitors: 0,
    webVisitors: 0,
    recentVisits: []
  };
}
