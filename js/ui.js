const UI = {
  init() {
    
    this.loadTheme();

    document.addEventListener("input", (e) => {
      if (e.target.id === "search") {
        this.renderNav(e.target.value);
      }
    });
  },

  toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  },

  loadTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  },

  renderNav(keyword = "") {
    const nav = document.getElementById("nav");

    const tools = Registry.tools.filter(t =>
      t.name.toLowerCase().includes(keyword.toLowerCase())
    );

    const fav = Registry.tools.filter(t =>
      State.favorites.includes(t.id)
    );

    const hist = State.history
      .map(id => Registry.tools.find(t => t.id === id))
      .filter(Boolean);

    let html = `
      <button onclick="UI.toggleTheme()">🌓 Theme</button>
      <hr/>
    `;

    if (fav.length) {
      html += "<div><b>★ Favorites</b></div>";
      html += fav.map(t => this.toolButton(t)).join("");
    }

    if (hist.length) {
      html += "<div style='margin-top:10px'><b>🕒 Recent</b></div>";
      html += hist.map(t => this.toolButton(t)).join("");
    }

    html += "<hr/>";
    html += tools.map(t => this.toolButton(t)).join("");

    nav.innerHTML = html;
  },

  toolButton(t) {
    const isFav = State.favorites.includes(t.id);

    return `
      <button onclick="Router.go('${t.id}')">
        ${isFav ? "★ " : ""}${t.name}
      </button>
    `;
  },

  render() {
    const app = document.getElementById("app");

    const map = {
      json: JSONTool,
      base64: Base64Tool,
      hash: HashTool,
      uuid: UUIDTool,
      regex: RegexTool,
      urlEncode: UrlEncodeTool,
      jwt: JWTTool,
      csv: CSVTool,
      timestamp: TimestampTool,
      color: ColorTool
    };

    app.innerHTML = map[State.currentTool]
      ? map[State.currentTool].view()
      : "Tool not found";
  }
};
