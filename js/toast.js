/* toast.js — lightweight toast notifications */
(function () {
  const container = () => document.getElementById("toastContainer");

  function show(message, opts = {}) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
    container().appendChild(el);
    const ttl = opts.duration || 2600;
    setTimeout(() => {
      el.classList.add("is-leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, ttl);
  }

  window.Toast = { show };
})();
