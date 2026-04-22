/* main.js — bootstraps all modules once DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  Products.mount();      // inject product cards (must run before reveal observer)
  Cart.render();         // restore cart count from localStorage
  ContactForm.mount();
  UI.initMenu();
  UI.initSmoothScroll();
  UI.initScrollSpy();
  UI.initReveal();       // observe newly-injected .reveal elements too
});
