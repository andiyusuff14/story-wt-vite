// file: src/scripts/data/push-api.js

import CONFIG from "../config";

const PushApi = {
  async subscribePushNotification(subscription) {
    const token = localStorage.getItem("token"); // ambil token login
    const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) throw new Error("Gagal subscribe notifikasi");

    return response.json();
  },

  async unsubscribePushNotification(endpoint) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint }),
    });

    if (!response.ok) throw new Error("Gagal unsubscribe notifikasi");

    return response.json();
  },
};

export default PushApi;
