const Base64Tool = {
  view() {
    return `
      <h2>Base64 Encode / Decode</h2>

      <textarea id="input" placeholder="Enter text or Base64"></textarea>

      <br><br>

      <button onclick="Base64Tool.encode()">Encode</button>
      <button onclick="Base64Tool.decode()">Decode</button>
      <button onclick="Base64Tool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  encode() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    try {
      const result = btoa(unescape(encodeURIComponent(input)));
      output.textContent = result;
      status.textContent = "Encoded";
    } catch (e) {
      status.textContent = "Error encoding";
      output.textContent = "";
    }
  },

  decode() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    try {
      const result = decodeURIComponent(escape(atob(input)));
      output.textContent = result;
      status.textContent = "Decoded";
    } catch (e) {
      status.textContent = "Invalid Base64";
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