// Service Worker for DevFinder PWA
const CACHE_NAME = 'devfinder-v1.0.0';
const urlsToCache = [
  '/DevFinder/',
  '/DevFinder/index.html',
  '/DevFinder/static/js/main.chunk.js',
  '/DevFinder/static/js/0.chunk.js',
  '/DevFinder/static/js/bundle.js',
  '/DevFinder/manifest.json',
  '/DevFinder/logo192.png',
  '/DevFinder/logo512.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/DevFinder/logo192.png',
    badge: '/DevFinder/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Now',
        icon: '/DevFinder/logo192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/DevFinder/favicon.ico'
      },
    ]
  };
  event.waitUntil(
    self.registration.showNotification('DevFinder Update', options)
  );
});