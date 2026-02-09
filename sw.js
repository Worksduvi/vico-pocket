// 1. Configuración de tu PayPal
function irAPayPal() {
    // Esto fuerza a que se abra en el navegador externo
    window.open("https://www.paypal.com/paypalme/texiduvi", '_blank');
}

// 2. Obtener el icono de la web (Favicon)
function getFavicon(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch (e) {
        return 'https://cdn-icons-png.flaticon.com/512/1243/1243933.png'; // Icono por defecto
    }
}

// 3. Crear un título automático si el enlace no tiene uno
function getSlugFromUrl(url) {
    try {
        const path = new URL(url).pathname;
        const slug = path.split('/').filter(Boolean).pop();
        return slug ? slug.replace(/-/g, ' ').toUpperCase() : 'NUEVO ENLACE';
    } catch (e) {
        return 'ENLACE GUARDADO';
    }
}

const CACHE_NAME = 'vico-pocket-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdn.tailwindcss.com'
];

// Instalación y Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estrategia Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
