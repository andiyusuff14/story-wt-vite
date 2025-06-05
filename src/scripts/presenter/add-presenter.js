// file: src/scripts/pages/add/add-presenter.js
class AddPresenter {
  constructor(container, model, view) {
    this.model = model;
    this.view = view;
    this.container = container;
    this.photoFile = null;
  }

  async init() {
    this.container.innerHTML = this.view.getTemplate();

    this.view.bindEvents({
      onSubmit: this.handleSubmit.bind(this),
      onStartCamera: this.handleStartCamera.bind(this),
      onTakePhoto: this.handleTakePhoto.bind(this),
      onUploadPhoto: this.handleUploadPhoto.bind(this),
    });

    this.initMap();
  }

  // ✅ Tambahkan method destroy
  destroy() {
    this.view.stopVideoStream();
  }

  async handleStartCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.view.startVideoStream(stream);
    } catch (error) {
      this.view.showMessage("Tidak bisa akses kamera: " + error.message, true);
    }
  }

  async handleTakePhoto(event) {
    if (event) event.preventDefault();
    this.photoFile = await this.view.takePhoto();
    this.view.stopVideoStream();
    this.view.showMessage(
      "Foto berhasil diambil, silakan tekan tombol submit untuk mengirim."
    );
  }

  async handleUploadPhoto(file) {
    this.photoFile = file;
    this.view.showMessage("Foto berhasil diupload, siap dikirim.");
  }

  initMap() {
    const map = L.map("map").setView([-2.5489, 118.0149], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([-2.5489, 118.0149], { draggable: true }).addTo(
      map
    );

    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      this.view.setLocation(pos.lat, pos.lng);
    });

    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      this.view.setLocation(e.latlng.lat, e.latlng.lng);
    });

    this.view.setLocation(-2.5489, 118.0149);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.submitStory();
  }

  async submitStory() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.view.showMessage("User belum login", true);
      return;
    }

    const description = this.view.getDescription();
    if (!description) {
      this.view.showMessage("Deskripsi wajib diisi", true);
      return;
    }

    if (!this.photoFile) {
      this.view.showMessage("Foto wajib diambil atau diupload", true);
      return;
    }

    this.view.showMessage("Mengirim story...");

    try {
      await this.model.saveStory({
        description,
        photoFile: this.photoFile,
        lat: this.view.lat,
        lon: this.view.lon,
        token,
      });

      this.view.showMessage("Story berhasil ditambahkan");
      this.view.resetForm();
      this.photoFile = null;
      this.view.setLocation(-2.5489, 118.0149);
      this.view.redirectToHome();
    } catch (error) {
      this.view.showMessage(error.message, true);
    }
  }
}

export default AddPresenter;
