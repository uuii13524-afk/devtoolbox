const Common = {
  setStatus(msg, isError = false) {
    const el = document.getElementById('status');
    el.textContent = msg;
    el.className = isError ? 'error' : '';
  },

  setError(msg) {
    this.setStatus(msg, true);
  },

  setSuccess(msg) {
    this.setStatus(msg, false);
  },

  clearStatus() {
    this.setStatus('');
  }
};
