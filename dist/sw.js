//file: src/public/sw.js
const CACHE_NAME = "story-app-cache-v2";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/logo.png",
  "/favicon.png",
  "/styles/styles.css",
  "/offline.html",
  "/scripts/index.js",
  "/scripts/pages/app.js",
  "/scripts/pages/home-page.js",
  "/scripts/pages/login-page.js",
  "/scripts/pages/register-page.js",
];

// Push Notification Handler
self.addEventListener("push", (event) => {
  const data = event.data?.json() || { title: "Notifikasi", options: {} };
  const { title, options } = data;
  event.waitUntil(self.registration.showNotification(title, options));
});

// Install: Pre-cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: Hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first dengan fallback ke offline.html
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      return (
        cachedRes ||
        fetch(event.request).catch(() => {
          // Jika HTML dan gagal fetch, kembalikan offline.html
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/offline.html");
          }
        })
      );
    })
  );
});
