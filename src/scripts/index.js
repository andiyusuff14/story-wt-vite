//file: src/scripts/index.js
import "../../styles/styles.css";
import App from "./pages/app";
import NotificationHelper from "./utils/notification-helper";
import PwaPresenter from "./presenter/pwa-presenter";

// Daftarkan service worker dan aktifkan push notification jika support
async function registerServiceWorkerAndPush() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);

      if ("PushManager" in window) {
        await NotificationHelper.requestPermission();
        await NotificationHelper.subscribeToPush();
        console.log("Push Notification aktif!");
      } else {
        console.log("Browser tidak mendukung PushManager");
      }
    } catch (error) {
      console.error(
        "Gagal mengaktifkan Service Worker atau Push Notification:",
        error.message
      );
    }
  } else {
    console.warn("Service Worker tidak didukung di browser ini.");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Inisialisasi SPA app
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });

  // Init prompt install PWA
  PwaPresenter.initInstallPrompt();

  // Accessibility: skip to content
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.getElementById("main-content");

  if (skipLink && mainContent) {
    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      skipLink.blur();
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Daftarkan SW dan push di sini supaya sudah pasti DOM siap
  await registerServiceWorkerAndPush();
});
