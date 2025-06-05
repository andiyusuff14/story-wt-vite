// File: src/scripts/pages/home/home-view.js
class HomeView {
  getTemplate() {
    return `
        <section tabindex="0">
          <h1>Home</h1>
          <p>Selamat datang di aplikasi Story API kami!</p>
          <ul id="story-list" aria-live="polite">
            <li>Loading stories...</li>
          </ul>
          <div id="map" style="height: 400px; width: 100%; margin-top: 1rem;"></div>
        </section>
      `;
  }

  showStories(stories) {
    const list = document.getElementById("story-list");
    list.innerHTML = "";

    if (!stories || stories.length === 0) {
      list.innerHTML = "<li>Tidak ada cerita tersedia.</li>";
      return;
    }

    stories.forEach((story) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <article tabindex="0" aria-label="Cerita dari ${story.name}">
            <img src="${story.photoUrl}" alt="Gambar ${
        story.name
      }" width="200" height="140"/>
            <h2>${story.name}</h2>
            <p><strong>Deskripsi:</strong> ${story.description || "-"}</p>
            <p><strong>Lokasi:</strong> ${story.lat ?? "-"}, ${
        story.lon ?? "-"
      }</p>
          </article>
        `;
      list.appendChild(li);
    });
  }

  showMapWithMarkers(stories) {
    const map = L.map("map").setView([-2.5489, 118.0149], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<b>${story.name}</b><br>${story.description || "-"}`);
      }
    });
  }

  showError(message) {
    const list = document.getElementById("story-list");
    list.innerHTML = `<li>Error: ${message}</li>`;
  }
}

export default HomeView;
