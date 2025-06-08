import PushApi from "../data/push-api";

const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

const PushPresenter = {
  async init() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Push notification tidak didukung browser ini.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.error("Izin notifikasi tidak diberikan.");
      return;
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this._urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    try {
      await PushApi.subscribePushNotification(subscription.toJSON());
      console.log("Berhasil subscribe push notification!");
    } catch (err) {
      console.error("Gagal mengaktifkan Push Notification:", err.message);
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  },
};

export default PushPresenter;
