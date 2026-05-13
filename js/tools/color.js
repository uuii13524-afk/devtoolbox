const ColorTool = {
  view() {
    return `
      <h2>Color Picker</h2>
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
        <input type="color" id="colorInput" value="#ff0000"
          style="width:80px; height:80px; border:none; cursor:pointer; border-radius:8px;"
          oninput="ColorTool.preview()" />
        <div id="colorPreview"
          style="width:200px; height:80px; border-radius:8px; background:#ff0000;
                 display:flex; align-items:center; justify-content:center;
                 font-size:1.2em; font-weight:bold; color:#fff; letter-spacing:2px;">
          #ff0000
        </div>
      </div>
      <button onclick="ColorTool.copyHex()">Copy HEX</button>
      <button onclick="ColorTool.clear()">Reset</button>
      <p id="status"></p>
    `;
  },
  preview() {
    const color = document.getElementById("colorInput").value;
    const preview = document.getElementById("colorPreview");
    preview.style.background = color;
    preview.textContent = color;
    // 明暗に応じてテキストカラーを変更
    const r = parseInt(color.slice(1,3),16);
    const g = parseInt(color.slice(3,5),16);
    const b = parseInt(color.slice(5,7),16);
    const brightness = (r*299 + g*587 + b*114) / 1000;
    preview.style.color = brightness > 128 ? "#000" : "#fff";
  },
  copyHex() {
    const color = document.getElementById("colorInput").value;
    const status = document.getElementById("status");
    try {
      navigator.clipboard.writeText(color);
      status.textContent = "✅ Copied: " + color;
    } catch (e) {
      status.textContent = "Copy failed";
    }
  },
  clear() {
    document.getElementById("colorInput").value = "#000000";
    document.getElementById("colorPreview").style.background = "#000000";
    document.getElementById("colorPreview").textContent = "#000000";
    document.getElementById("colorPreview").style.color = "#fff";
    document.getElementById("status").textContent = "";
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
