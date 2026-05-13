const Router = {
  go(toolId) {
    State.currentTool = toolId;

    // URLに反映
    location.hash = toolId;

    // 履歴
    State.history = [
      toolId,
      ...State.history.filter(t => t !== toolId)
    ].slice(0, 20);

    Registry.saveHistory();

    UI.render();
  },

  init() {
    const hash = location.hash.replace("#", "");

    if (hash) {
      State.currentTool = hash;
    }

    window.addEventListener("hashchange", () => {
      const newHash = location.hash.replace("#", "");
      if (newHash) {
        State.currentTool = newHash;
        UI.render();
      }
    });
  }
};