const ColorTool = {
  view() {
    return `
      <h2>Color Picker</h2>

      <input type="color" id="colorInput" />

      <br><br>

      <button onclick="ColorTool.copyHex()">Copy HEX</button>
      <button onclick="ColorTool.clear()">Reset</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  copyHex() {
    const color = document.getElementById("colorInput").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!color) {
      status.textContent = "No color selected";
      output.textContent = "";
      return;
    }

    try {
      navigator.clipboard.writeText(color);
      output.textContent = color;
      status.textContent = "Copied HEX";
    } catch (e) {
      status.textContent = "Copy failed";
    }
  },

  clear() {
    document.getElementById("colorInput").value = "#000000";
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