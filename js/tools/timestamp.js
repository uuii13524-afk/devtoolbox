const TimestampTool = {
  view() {
    return `
      <h2>Timestamp Converter</h2>

      <textarea id="input" placeholder="Enter timestamp or date string"></textarea>

      <br><br>

      <button onclick="TimestampTool.toDate()">To Date</button>
      <button onclick="TimestampTool.toTimestamp()">To Timestamp</button>
      <button onclick="TimestampTool.clear()">Clear</button>

      <p id="status"></p>
      <pre id="output"></pre>
    `;
  },

  toDate() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const date = new Date(Number(input) * (input.length === 10 ? 1000 : 1));

      if (isNaN(date.getTime())) throw new Error("Invalid date");

      output.textContent = date.toISOString();
      status.textContent = "Converted to Date";
    } catch (e) {
      status.textContent = "Invalid timestamp";
      output.textContent = "";
    }
  },

  toTimestamp() {
    const input = document.getElementById("input").value;
    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!input) {
      status.textContent = "Empty input";
      output.textContent = "";
      return;
    }

    try {
      const date = new Date(input);
      const ts = Math.floor(date.getTime() / 1000);

      if (isNaN(ts)) throw new Error("Invalid date");

      output.textContent = ts.toString();
      status.textContent = "Converted to Timestamp";
    } catch (e) {
      status.textContent = "Invalid date";
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