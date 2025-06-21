// file: public/sw.js
const CACHE_NAME = "story-app-cache-v2";
const BASE_PATH = "/story-wt-vite";

const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/offline.html`,
  `${BASE_PATH}/favicon.png`,
  `${BASE_PATH}/icons/icon-192x192.png`,
  `${BASE_PATH}/icons/icon-512x512.png`,
  `${BASE_PATH}/styles/styles.css`,
  `${BASE_PATH}/scripts/index.js`,
  `${BASE_PATH}/scripts/pages/app.js`,
  `${BASE_PATH}/scripts/pages/home-page.js`,
  `${BASE_PATH}/scripts/pages/login-page.js`,
  `${BASE_PATH}/scripts/pages/register-page.js`,
];

// Push Notification Handler
self.addEventListener("push", (event) => {
  const data = event.data?.json();

  const title = data.title || "Notifikasi";
  const options = data.options || {};
  event.waitUntil(self.registration.showNotification(title, options));
});


// Install: Pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(STATIC_ASSETS);
        console.log("✅ Assets berhasil dicache");
      } catch (error) {
        console.error("❌ Gagal caching:", error);
        // Coba cache satu per satu biar tahu yang gagal
        for (const url of STATIC_ASSETS) {
          try {
            await cache.add(url);
            console.log(`✅ Cached: ${url}`);
          } catch (e) {
            console.error(`❌ Gagal cache: ${url}`, e);
          }
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate: Hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`🧹 Menghapus cache lama: ${key}`);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache first, fallback offline
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match(`${BASE_PATH}/offline.html`);
          }
        })
      );
    })
  );
});
