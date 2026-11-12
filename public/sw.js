const CACHE = 'trace-neon-v1'
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['./', './index.html', './icon.svg']))))
self.addEventListener('fetch', event => event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html')))))
