const CACHE_NAME = "pwa-cache";
const PRECACHE_ASSETS = [
  "/",
  "/icons/",
  "bootstrap.bundle.min.js",
  "bootstrap.min.css",
  "index.html",
  "manifest.json",
  "style.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(PRECACHE_ASSETS);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
