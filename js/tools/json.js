const JSONTool = {
  view() {
    return `
      <h2>JSON Formatter</h2>

      <textarea id="input" placeholder="Paste JSON here"></textarea>

      <br><br>

      <button onclick="JSONTool.format()">Format</button>
      <button onclick="JSONTool.minify()">Minify</button>
      <button onclick="JSONTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  format() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    try {
      const obj = JSON.parse(input);
      output.textContent = JSON.stringify(obj, null, 2);
      status.textContent = "Formatted";
    } catch (e) {
      output.textContent = "";
      status.textContent = "Invalid JSON";
    }
  },

  minify() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    try {
      const obj = JSON.parse(input);
      output.textContent = JSON.stringify(obj);
      status.textContent = "Minified";
    } catch (e) {
      output.textContent = "";
      status.textContent = "Invalid JSON";
    }
  },

  clear() {
    document.getElementById("input").value = "";
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