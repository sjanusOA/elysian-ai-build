/* Service Worker for Caching */
const CACHE_NAME = 'elysian-build-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/portfolio.html',
    '/projects.html',
    '/testimonials.html',
    '/contact.html',
    '/assets/css/styles.min.css',
    '/assets/js/script.min.js',
    '/assets/js/performance.js',
    '/assets/images/elysian-logo-color.avif',
    '/assets/images/portfolio/project1/hero-slide-1.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
