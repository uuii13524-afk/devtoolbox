const CSVTool = {
  view() {
    return `
      <h2>CSV Viewer</h2>

      <textarea id="input" placeholder="Paste CSV here"></textarea>

      <br><br>

      <button onclick="CSVTool.parse()">Parse</button>
      <button onclick="CSVTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  parse() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input.trim()) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const rows = input.trim().split("\n").map(row =>
        row.split(",").map(cell => cell.trim())
      );

      const formatted = rows
        .map(r => r.join(" | "))
        .join("\n");

      output.textContent = formatted;
      status.textContent = `Parsed ${rows.length} rows`;
    } catch (e) {
      status.textContent = "Error parsing CSV";
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