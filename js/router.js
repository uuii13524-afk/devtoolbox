const Router = {
  go(toolId) {
    // Standalone-page tools: navigate directly
    const tool = Registry.tools.find(t => t.id === toolId);
    if (tool && tool.url) {
      location.href = tool.url;
      return;
    }

    if (toolId === 'home' || !toolId) {
      State.currentTool = null;
      history.pushState(null, '', location.pathname);
    } else {
      State.currentTool = toolId;
      location.hash = toolId;

      State.history = [
        toolId,
        ...State.history.filter(t => t !== toolId)
      ].slice(0, 20);
      Registry.saveHistory();
    }

    UI.render();
    UI.renderNav();
  },

  init() {
    const hash = location.hash.replace('#', '');
    State.currentTool = hash || null;

    window.addEventListener('hashchange', () => {
      const newHash = location.hash.replace('#', '');
      State.currentTool = newHash || null;
      UI.render();
      UI.renderNav();
    });

    window.addEventListener('popstate', () => {
      const newHash = location.hash.replace('#', '');
      State.currentTool = newHash || null;
      UI.render();
      UI.renderNav();
    });
  }
};
