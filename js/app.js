window.onload = async () => {
  await Registry.load();
  Router.init();
  UI.init();
  UI.renderNav();
  UI.render();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};
