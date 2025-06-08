//file: src/scripts/pages/auth/login-page.js
import AuthView from "../view/auth-view";
import AuthPresenter from "../presenter/auth-presenter";
import AuthModel from "../model/auth-model";

class LoginPage {
  async render() {
    const section = document.createElement("section");
    section.innerHTML = AuthView.loginTemplate();
    return section;
  }

  async afterRender() {
    AuthPresenter.initLogin(AuthModel);
  }
}

export default LoginPage;
