// File: src/scripts/present/home-presenter.js
class HomePresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async init(container) {
    container.innerHTML = this.view.getTemplate();

    try {
      const stories = await this.model.getAllStories();
      this.view.showStories(stories);
      this.view.showMapWithMarkers(stories);
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}

export default HomePresenter;
