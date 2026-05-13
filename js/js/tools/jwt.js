const JWTTool = {
  view() {
    return `
      <h2>JWT Decoder</h2>

      <textarea id="input" placeholder="Paste JWT here"></textarea>

      <br><br>

      <button onclick="JWTTool.decode()">Decode</button>
      <button onclick="JWTTool.clear()">Clear</button>

      <p id="status"></p>

      <h3>Header</h3>
      <pre id="header"></pre>

      <h3>Payload</h3>
      <pre id="payload"></pre>
    `;
  },

  decode() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const headerEl = document.getElementById("header");
    const payloadEl = document.getElementById("payload");

    if (!input) {
      status.textContent = "Empty input";
      headerEl.textContent = "";
      payloadEl.textContent = "";
      return;
    }

    try {
      const parts = input.split(".");
      if (parts.length < 2) throw new Error("Invalid JWT");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      headerEl.textContent = JSON.stringify(header, null, 2);
      payloadEl.textContent = JSON.stringify(payload, null, 2);

      status.textContent = "Decoded";
    } catch (e) {
      status.textContent = "Invalid JWT";
      headerEl.textContent = "";
      payloadEl.textContent = "";
    }
  },

  clear() {
    document.getElementById("input").value = "";
    document.getElementById("status").textContent = "";
    document.getElementById("header").textContent = "";
    document.getElementById("payload").textContent = "";
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