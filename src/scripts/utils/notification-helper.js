// file: src/utils/notification-helper.js
import CONFIG from "../config";

const NotificationHelper = {
  vapidPublicKey:
    "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",

  async requestPermission() {
    console.log("Meminta izin notifikasi...");
    const permission = await Notification.requestPermission();
    console.log("Status izin:", permission);
    if (permission !== "granted") {
      throw new Error("Izin notifikasi tidak diberikan.");
    }
  },

  async subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const convertedKey = this._urlBase64ToUint8Array(this.vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak ditemukan!");

    const { endpoint, keys } = subscription.toJSON();

    const payload = {
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    };

    console.log("Payload ke /notifications/subscribe:", payload);

    const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gagal subscribe:", errorData);
      throw new Error(errorData.message || "Gagal subscribe push notification");
    }

    return subscription;
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  },
};

export default NotificationHelper;
