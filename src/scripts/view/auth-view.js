//file: src/scripts/pages/auth/auth-view.js
class AuthView {
  static loginTemplate() {
    return `
      <section tabindex="0">
        <h1>Login</h1>
        <form id="login-form">
          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>

          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password" required><br><br>

          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register" id="to-register">Register di sini</a></p>
      </section>
    `;
  }

  static registerTemplate() {
    return `
      <section tabindex="0">
        <h1>Register</h1>
        <form id="register-form">
          <label for="name">Nama:</label><br>
          <input type="text" id="name" name="name" required><br><br>

          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>

          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password" required minlength="8"><br><br>

          <button type="submit">Register</button>
        </form>
        <p>Sudah punya akun? <a href="#/login" id="to-login">Login di sini</a></p>
      </section>
    `;
  }
}

export default AuthView;
