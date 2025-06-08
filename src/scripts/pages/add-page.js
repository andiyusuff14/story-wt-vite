import AddModel from "../model/add-model";
import AddView from "../view/add-view";
import AddPresenter from "../presenter/add-presenter";

class AddStoryPage {
  constructor() {
    this.view = new AddView();
    this.presenter = null;
  }

  async render() {
    const container = document.createElement("section");
    container.innerHTML = this.view.getTemplate();
    return container;
  }

  async afterRender() {
    const container = document.querySelector("section");
    this.presenter = new AddPresenter(container, AddModel, this.view);
    await this.presenter.init();
  }

  // ✅ Tambahan: Memastikan kamera dimatikan saat keluar dari halaman
  async beforeRender() {
    if (this.presenter) {
      this.presenter.destroy(); // Memanggil stopVideoStream()
    }
  }
}

export default AddStoryPage;
