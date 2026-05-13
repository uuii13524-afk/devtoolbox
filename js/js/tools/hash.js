const HashTool = {
  view() {
    return `
      <h2>SHA-256 Hash Generator</h2>

      <textarea id="input" placeholder="Enter text"></textarea>

      <br><br>

      <button onclick="HashTool.generate()">Generate</button>
      <button onclick="HashTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  async generate() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const data = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);

      const hash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      output.textContent = hash;
      status.textContent = "OK";
    } catch (e) {
      status.textContent = "Error";
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