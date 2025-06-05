// file: src/scripts/data/api.js
import CONFIG from "../config";

export async function register(name, email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function login(email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  const { token, name } = data.loginResult;
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);

  return data;
}

export async function getStories() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Gagal ambil data cerita");
  }
  const data = await response.json();
  return data.listStory;
}

export async function addNewStory({
  description,
  photoFile,
  lat = null,
  lon = null,
  token,
}) {
  if (!token) throw new Error("Token auth wajib ada");

  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photoFile);

  if (lat !== null) formData.append("lat", lat);
  if (lon !== null) formData.append("lon", lon);

  const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Jangan set 'Content-Type' kalau pake FormData, biarkan browser atur otomatis
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result.error) {
    throw new Error(result.message || "Gagal tambah story");
  }

  return result; // { error: false, message: "success" }
}
