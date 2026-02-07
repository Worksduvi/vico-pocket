// Capturar contenido compartido desde Android
window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    const sharedTitle = parsedUrl.searchParams.get('title');
    const sharedText = parsedUrl.searchParams.get('text');
    const sharedUrl = parsedUrl.searchParams.get('url');

    if (sharedUrl || sharedText) {
        const linkToSave = sharedUrl || sharedText;
        let links = JSON.parse(localStorage.getItem('vico_links') || '[]');
        links.unshift({ title: sharedTitle || 'Nuevo Link', url: linkToSave, date: new Date().toLocaleDateString() });
        localStorage.setItem('vico_links', JSON.stringify(links));
        
        // Limpiar la URL para no duplicar al recargar
        window.history.replaceState({}, document.title, "/");
        switchTab('links');
    } else {
        switchTab('links'); // Carga inicial por defecto
    }
});
const CACHE_NAME = 'vico-pocket-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com'
];

// Instalación y Cache
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Estrategia Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
