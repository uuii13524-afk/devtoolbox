const jsonFormatter = {
  format() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    status.textContent = '';

    if (!input.trim()) {
      Common.setError('Input is empty');
      output.textContent = '';
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      output.textContent = formatted;
      Common.setSuccess('Valid JSON');

    } catch (e) {
      output.textContent = '';
      Common.setError('Invalid JSON: ' + e.message);
    }
  },

  copy() {
    const output = document.getElementById('output').textContent;
    if (!output) return;

    navigator.clipboard.writeText(output)
      .then(() => Common.setSuccess('Copied to clipboard'))
      .catch(() => Common.setError('Copy failed'));
  },

  clear() {
    document.getElementById('input').value = '';
    document.getElementById('output').textContent = '';
    Common.clearStatus();
  }
};
