//file: src/scripts/pages/auth/register-page.js
import AuthView from "../view/auth-view";
import AuthPresenter from "../presenter/auth-presenter";
import AuthModel from "../model/auth-model";

class RegisterPage {
  async render() {
    const section = document.createElement("section");
    section.innerHTML = AuthView.registerTemplate();
    return section;
  }

  async afterRender() {
    AuthPresenter.initRegister(AuthModel);
  }
}

export default RegisterPage;
