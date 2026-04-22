/* products.js — render product cards from PRODUCTS data */
(function () {
  function template(p) {
    return `
      <article class="card product-card reveal" data-id="${p.id}">
        <div class="product-thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="600" />
        </div>
        <div class="product-body">
          <span class="product-cat">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-foot">
            <span class="product-price">EGP${p.price.toFixed(2)}</span>
            <button class="product-add" type="button" data-add="${p.id}">
              + Add
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function mount() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = window.PRODUCTS.map(template).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const product = window.PRODUCTS.find(p => p.id === btn.dataset.add);
      if (!product) return;
      window.Cart.add(product);
      window.Toast.show(`${product.name} added to cart`);
    });
  }

  window.Products = { mount };
})();
