const CACHE_NAME = 'vico-pocket-v8';
// Agregamos versiones de librerías externas para que no fallen sin internet
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalación: Guarda todo en el bolsillo del móvil
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Obliga a la nueva versión a activarse de inmediato
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('VICO: Cacheando recursos de élite...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpia basuras de versiones viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Estrategia de Red: Intenta ir a internet, si falla, usa la caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
function changeTheme(t) {
    document.body.className = `p-4 pb-48 ${t}-grad`;
    // Definimos los gradientes si no están en tu CSS
    if(t === 'gold') document.body.style.background = "linear-gradient(135deg, #0f0c08, #262112)";
    if(t === 'cyber') document.body.style.background = "linear-gradient(135deg, #000428, #004e92)";
    playUX('click');
}
