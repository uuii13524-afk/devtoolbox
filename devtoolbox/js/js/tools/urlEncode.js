const UrlEncodeTool = {
  view() {
    return `
      <h2>URL Encode / Decode</h2>

      <textarea id="input" placeholder="Enter text or encoded URL"></textarea>

      <br><br>

      <button onclick="UrlEncodeTool.encode()">Encode</button>
      <button onclick="UrlEncodeTool.decode()">Decode</button>
      <button onclick="UrlEncodeTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  encode() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const result = encodeURIComponent(input);
      output.textContent = result;
      status.textContent = "Encoded";
    } catch (e) {
      status.textContent = "Error";
      output.textContent = "";
    }
  },

  decode() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const result = decodeURIComponent(input);
      output.textContent = result;
      status.textContent = "Decoded";
    } catch (e) {
      status.textContent = "Invalid input";
      output.textContent = "";
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