const RegexTool = {
  view() {
    return `
      <h2>Regex Tester</h2>

      <input id="pattern" placeholder="Pattern (e.g. \\d+)" style="width:100%;max-width:900px;" />
      <br><br>

      <textarea id="input" placeholder="Test text"></textarea>

      <br><br>

      <button onclick="RegexTool.test()">Test</button>
      <button onclick="RegexTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  test() {
    const pattern = document.getElementById("pattern").value;
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!pattern || !input) {
      status.textContent = "Empty pattern or input";
      output.textContent = "";
      return;
    }

    try {
      const regex = new RegExp(pattern, "g");
      const matches = [...input.matchAll(regex)].map(m => m[0]);

      if (matches.length === 0) {
        status.textContent = "No matches";
        output.textContent = "";
      } else {
        status.textContent = `Found ${matches.length} match(es)`;
        output.textContent = matches.join("\n");
      }
    } catch (e) {
      status.textContent = "Invalid regex";
      output.textContent = "";
    }
  },

  clear() {
    document.getElementById("pattern").value = "";
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