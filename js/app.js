window.onload = async () => {
  await Registry.load();

  Router.init();
  UI.init();
  UI.render();

  // PWA登録
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
};