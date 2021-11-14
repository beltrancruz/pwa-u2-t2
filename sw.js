const CACHE_STATIC = "static_v1"
const CACHE_INMUTABLE = "inmutable_v1"

self.addEventListener('install', event => {
    const cacheStatic = caches.open(CACHE_STATIC)
    .then( cache => {
        cache.addAll([
            './',
            './index.html',
            './css/main.css',
            './js/camera.js',
            './js/app.js'
        ])
    })
    const cacheInmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
        cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
            'https://pro.fontawesome.com/releases/v5.10.0/css/all.css',
            'https://code.jquery.com/jquery-3.6.0.slim.js'
        ])
    })
    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]))
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});