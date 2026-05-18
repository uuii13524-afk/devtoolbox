const UI = {
  init() {
    this.loadTheme();

    document.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        this.renderNav(e.target.value);
      }
    });
  },

  toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  },

  loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  },

  renderNav(keyword = '') {
    const nav = document.getElementById('nav');
    const fav  = Registry.tools.filter(t => State.favorites.includes(t.id));
    const hist = State.history
      .map(id => Registry.tools.find(t => t.id === id))
      .filter(Boolean)
      .slice(0, 5);
    const isSearching = keyword.length > 0;
  
    // url持ちツールもusedIdsに含める（カテゴリリストから除外するため）
    const usedIds = new Set([...fav.map(t => t.id), ...hist.map(t => t.id)]);
  
    let html = `<button onclick="Router.go('home')">🏠 Home</button>
                <button onclick="UI.toggleTheme()">🌓 Theme</button><hr/>`;
  
    if (!isSearching) {
      if (fav.length) {
        html += '<div><b>★ Favorites</b></div>';
        // Recentはフラットリスト、カテゴリループなし
        html += fav.map(t => this.toolButton(t)).join('');
        html += '<hr/>';
      }
      if (hist.length) {
        html += '<div><b>🕒 Recent</b></div>';
        // Recentはフラットリスト、カテゴリループなし
        html += hist.map(t => this.toolButton(t)).join('');
        html += '<hr/>';
      }
    }
  
    // カテゴリリスト（RecentとFavを除いたもの）
    const tools = Registry.tools.filter(t =>
      t.name.toLowerCase().includes(keyword.toLowerCase()) &&
      (isSearching || !usedIds.has(t.id))
    );
  
    const categories = {};
    tools.forEach(t => {
      const cat = t.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(t);
    });
  
    const catEntries = Object.entries(categories);
    catEntries.forEach(([cat, catTools], index) => {
      if (!isSearching) {
        html += `<div class="nav-category-label">${cat}</div>`;
      }
      html += catTools.map(t => this.toolButton(t)).join('');
      if (index < catEntries.length - 1) {
        html += '<hr/>';
      }
    });
  
    nav.innerHTML = html;
  },

  toolButton(t) {
    const isFav = State.favorites.includes(t.id);
    return `<button onclick="Router.go('${t.id}')">${isFav ? '★ ' : ''}${t.name}</button>`;
  },

  renderHome() {
    const categories = {};
    Registry.tools.forEach(t => {
      const cat = t.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(t);
    });

    let html = `<div class="home-hero">
      <p class="home-subtitle">Free browser-based tools for developers. No signup, no tracking, no data sent to servers.</p>
    </div>`;

    for (const [cat, tools] of Object.entries(categories)) {
      html += `<div class="home-category-section">
        <div class="home-category-title">${cat}</div>
        <div class="tool-card-grid">`;

      tools.forEach(t => {
        const action = t.url
          ? `href="${t.url}"`
          : `href="#" onclick="event.preventDefault();Router.go('${t.id}')"`;
        html += `<a class="tool-card" ${action}>
          <div class="tool-card-icon">${t.icon || ''}</div>
          <div class="tool-card-body">
            <strong>${t.name}</strong>
            <p>${t.desc || ''}</p>
          </div>
        </a>`;
      });

      html += `</div></div>`;
    }
    return html;
  },

  render() {
    const app = document.getElementById('app');

    if (!State.currentTool) {
      app.innerHTML = this.renderHome();
      return;
    }

    const map = {
      json:      JSONTool,
      base64:    Base64Tool,
      hash:      HashTool,
      uuid:      UUIDTool,
      regex:     RegexTool,
      urlEncode: UrlEncodeTool,
      jwt:       JWTTool,
      csv:       CSVTool,
      timestamp: TimestampTool,
      color:     ColorTool
    };

    app.innerHTML = map[State.currentTool]
      ? map[State.currentTool].view()
      : this.renderHome();
  }
};
