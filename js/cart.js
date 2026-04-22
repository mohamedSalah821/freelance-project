/* cart.js — cart state + navbar counter (persisted in localStorage) */
(function () {
  const KEY = "eldesouki.cart";
  let items = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(items)); }

  function count() { return items.reduce((n, i) => n + i.qty, 0); }

  function render() {
    const el = document.getElementById("cartCount");
    if (!el) return;
    const n = count();
    el.textContent = n;
    el.classList.toggle("is-visible", n > 0);
    el.classList.remove("bump");
    void el.offsetWidth; // restart animation
    if (n > 0) el.classList.add("bump");
  }

  function add(product) {
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.qty += 1;
    else items.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    save();
    render();
  }

  window.Cart = { add, count, render };
})();
