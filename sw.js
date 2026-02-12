const CACHE_NAME = 'vico-pocket-v9.9';
const ASSETS = ['./', './index.html', './manifest.json', './icon.png', 'https://cdn.tailwindcss.com'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
