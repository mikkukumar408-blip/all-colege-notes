/* =========================================================================
   COLLEGE NOTES HUB - HIGH PERFORMANCE SERVICE WORKER (sw.js)
   Provides instant offline caching for study notes, KaTeX, and fonts.
   ========================================================================= */

const CACHE_NAME = 'college-notes-v2.1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'
];

// 1. Install: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Non-critical precache item skipped:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate: Purge obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Stale-While-Revalidate for CSS/JS/Images, Network-first for dynamic API
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET, Chrome extension, or external analytics
  if (req.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // For API and dynamic data calls, use Network-First
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/auth') || url.pathname.includes('/cloud')) {
    event.respondWith(
      fetch(req).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline - Unable to connect to cloud' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate for static assets, scripts, stylesheets, and fonts
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
