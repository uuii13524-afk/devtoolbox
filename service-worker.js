const CACHE_NAME = "dev-toolbox-v1";

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
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});