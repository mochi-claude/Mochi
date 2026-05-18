const CACHE_NAME = 'mochi-v1';
const urlsToCache = [
  '/Mochi/',
  '/Mochi/index.html',
  '/Mochi/shelf.html',
  '/Mochi/scrapbook.html',
  '/Mochi/pet.html',
  '/Mochi/wrapped.html',
  '/Mochi/discover.html',
  '/Mochi/account.html',
  '/Mochi/mochi.js',
  '/Mochi/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Mochi 🐰', {
      body: data.body || 'Your shelf is waiting for you!',
      icon: '/Mochi/icon.svg',
      badge: '/Mochi/icon.svg',
      data: { url: data.url || '/Mochi/shelf.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
