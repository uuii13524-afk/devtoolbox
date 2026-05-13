const CACHE_NAME = "dev-toolbox-v3";
const FILES = [
  "./",
  "./index.html",
  "./assets/style.css",
  "./js/app.js",
  "./js/ui.js",
  "./js/router.js",
  "./js/state.js",
  "./js/registry.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// 古いキャッシュを自動削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
