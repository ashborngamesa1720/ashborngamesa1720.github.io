const CACHE_NAME = 'rollventures-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  console.log('[ServiceWorker] Installed and caching');
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activated');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
