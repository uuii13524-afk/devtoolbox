const Registry = {
  tools: [],

  async load() {
    const res = await fetch("data/tools.json");
    this.tools = await res.json();

    this.loadPersisted();
    UI.renderNav();
  },

  loadPersisted() {
    const fav = localStorage.getItem("favorites");
    const hist = localStorage.getItem("history");

    State.favorites = fav ? JSON.parse(fav) : [];
    State.history = hist ? JSON.parse(hist) : [];
  },

  saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(State.favorites));
  },

  saveHistory() {
    localStorage.setItem("history", JSON.stringify(State.history));
  }
};