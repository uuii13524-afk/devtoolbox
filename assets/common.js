function copyText(id) {
  const el = document.getElementById(id);

  if (!el) return;

  const text = el.textContent;

  if (!text) return;

  navigator.clipboard.writeText(text)
    .then(() => {
      console.log("Copied!");
    })
    .catch(() => {
      alert("Copy failed");
    });
}
