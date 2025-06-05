import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderNav() {
    const token = localStorage.getItem("token");
    let navHTML = `
      <ul id="nav-list" class="nav-list">
        <li><a href="#/">Beranda</a></li>
        <li><a href="#/add-story">Add Story</a></li>
    `;

    if (token) {
      navHTML += `<li><a href="#" id="login-logout-link">Logout</a></li>`;
    } else {
      navHTML += `<li><a href="#/login" id="login-logout-link">Login</a></li>`;
    }

    navHTML += `</ul>`;

    this.#navigationDrawer.innerHTML = navHTML;

    if (token) {
      const logoutLink = document.getElementById("login-logout-link");
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        alert("Berhasil logout!");
        this.renderNav(); // refresh nav
        window.location.hash = "#/login";
      });
    }
  }

  async renderPage() {
    await this.renderNav();

    const token = localStorage.getItem("token");
    const url = getActiveRoute();

    if (!token && url !== "/login" && url !== "/register") {
      window.location.hash = "#/login";
      return;
    }

    const page = routes[url];
    if (!page) {
      this.#content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      return;
    }

    const render = async () => {
      this.#content.innerHTML = "";
      const pageElement = await page.render();
      this.#content.appendChild(pageElement);
      await page.afterRender();
    };

    // 🔥 View Transition API
    if (document.startViewTransition) {
      document.startViewTransition(() => render());
    } else {
      await render();
    }
  }
}
export default App;
