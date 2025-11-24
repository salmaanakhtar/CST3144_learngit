var CACHE_NAME = 'petstore-cache-v1';
var urlsToCache = [
    'index.html',
    'style.css',
    'products.js',
    'petstore.webmanifest',
    'images/images.jpg'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            // 'r' is the matching file if it exists in the cache
            return r || fetch(e.request);
        })
    );
});