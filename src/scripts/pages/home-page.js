// File: src/scripts/pages/home-page.js
import HomeModel from "../model/home-model";
import HomeView from "../view/home-view";
import HomePresenter from "../presenter/home-presenter";

class HomePage {
  constructor() {
    this.view = new HomeView();
    this.model = HomeModel;
    this.presenter = new HomePresenter(this.view, this.model);
  }

  async render() {
    const section = document.createElement("section");
    return section;
  }

  async afterRender() {
    const section = document.querySelector("section");
    await this.presenter.init(section);
  }
}

export default HomePage;
