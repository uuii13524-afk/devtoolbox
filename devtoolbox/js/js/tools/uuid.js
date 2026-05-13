const UUIDTool = {
  view() {
    return `
      <h2>UUID Generator</h2>

      <button onclick="UUIDTool.generate()">Generate</button>
      <button onclick="UUIDTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  generate() {
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (crypto.randomUUID) {
      const uuid = crypto.randomUUID();
      output.textContent = uuid;
      status.textContent = "Generated";
    } else {
      // フォールバック
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });

      output.textContent = uuid;
      status.textContent = "Generated (fallback)";
    }
  },

  clear() {
    document.getElementById("status").textContent = "";
    document.getElementById("output").textContent = "";
  },
  
  toggleFavorite(id) {
    const i = State.favorites.indexOf(id);

    if (i >= 0) {
      State.favorites.splice(i, 1);
    } else {
      State.favorites.push(id);
    }

    Registry.saveFavorites();
    UI.renderNav();
  }
};