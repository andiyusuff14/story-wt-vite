// File: src/scripts/pages/add/add-view.js
class AddView {
  constructor() {
    this.lat = null;
    this.lon = null;
    this.videoStream = null;
  }

  getTemplate() {
    return `
      <section tabindex="0">
        <h1>Tambah Story Baru</h1>
        <form id="story-form">
          <label>Deskripsi:<br>
            <textarea id="description" required rows="3" cols="30"></textarea>
          </label><br><br>

          <div>
            <button type="button" id="start-camera">Mulai Kamera</button>
            <button type="button" id="take-photo" disabled>Ambil Foto</button>
            <video id="video" width="300" height="200" autoplay style="display:none;"></video>
            <canvas id="canvas" width="300" height="200" style="display:none;"></canvas>
          </div><br>

          <div id="map" style="height: 300px; width: 100%;"></div><br>

          <button type="submit">Kirim Story</button>
        </form>
        <div id="message" role="alert" aria-live="assertive"></div>
      </section>
    `;
  }

  bindEvents({ onSubmit, onStartCamera, onTakePhoto, onUploadPhoto }) {
    const form = document.getElementById("story-form");
    form.addEventListener("submit", onSubmit);

    document
      .getElementById("start-camera")
      .addEventListener("click", onStartCamera);

    document
      .getElementById("take-photo")
      .addEventListener("click", onTakePhoto);

    // Optional: handle upload photo jika tombol upload ditambahkan
    if (onUploadPhoto) {
      const fileInput = document.getElementById("upload-photo");
      if (fileInput) {
        fileInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) onUploadPhoto(file);
        });
      }
    }
  }

  showMessage(msg, isError = false) {
    const msgEl = document.getElementById("message");
    msgEl.textContent = msg;
    msgEl.style.color = isError ? "red" : "green";
  }

  startVideoStream(stream) {
    this.videoStream = stream;
    const video = document.getElementById("video");
    video.srcObject = stream;
    video.style.display = "block";
    document.getElementById("take-photo").disabled = false;
  }

  stopVideoStream() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.videoStream = null;
    }
    const video = document.getElementById("video");
    video.style.display = "none";
  }

  async takePhoto() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    canvas.style.display = "block";

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], "photo.jpg", { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.9
      );
    });
  }

  setLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  getDescription() {
    return document.getElementById("description")?.value.trim();
  }

  resetForm() {
    document.getElementById("story-form")?.reset();
    document.getElementById("canvas").style.display = "none";
    document.getElementById("video").style.display = "none";
    document.getElementById("take-photo").disabled = true;
  }

  redirectToHome() {
    window.location.hash = "#/";
  }
}

export default AddView;
