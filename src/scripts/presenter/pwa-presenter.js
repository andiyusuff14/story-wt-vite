//file:src/scripts/presenter/pwa-presenter.js
const PwaPresenter = {
  initInstallPrompt() {
    let deferredPrompt;
    const installButton = document.getElementById("installBtn");

    if (!installButton) {
      console.warn("Install button (#installBtn) not found!");
      return;
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installButton.style.display = "block";

      installButton.addEventListener("click", async () => {
        installButton.style.display = "none";
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("User response to install prompt:", outcome);
      });
    });
  },
};

export default PwaPresenter;
