const AuthPresenter = {
  initLogin(model) {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          const result = await model.login(email, password);

          // Simpan token dan nama ke localStorage
          localStorage.setItem("token", result.loginResult.token);
          localStorage.setItem("name", result.loginResult.name);

          alert(`Login sukses! Halo, ${result.loginResult.name}`);
          window.location.href = "#/";
        } catch (err) {
          alert("Login gagal: " + err.message);
        }
      });
  },

  initRegister(model) {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          const result = await model.register(name, email, password);

          alert("Register sukses! Silakan login.");
          window.location.href = "#/login";
        } catch (err) {
          alert("Register gagal: " + err.message);
        }
      });
  },
};

export default AuthPresenter;
