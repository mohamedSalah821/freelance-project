/* ui.js — navbar interactions, smooth scroll, scroll-spy, reveal-on-scroll */
(function () {
  /* Mobile menu */
  function initMenu() {
    const toggle = document.getElementById("menuToggle");
    const links  = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.matches(".nav-link")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Smooth scroll for in-page anchors (CSS already does it; this offsets for sticky nav) */
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  /* Scroll-spy: highlight nav link of section currently in view */
  function initScrollSpy() {
    const links = document.querySelectorAll(".nav-link");
    const map = new Map();
    links.forEach(l => {
      const id = l.getAttribute("href")?.slice(1);
      if (id && document.getElementById(id)) map.set(id, l);
    });
    if (map.size === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove("is-active"));
          map.get(en.target.id)?.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    map.forEach((_, id) => observer.observe(document.getElementById(id)));
  }

  /* Reveal-on-scroll for any .reveal element */
  function initReveal() {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  window.UI = { initMenu, initSmoothScroll, initScrollSpy, initReveal };
})();
