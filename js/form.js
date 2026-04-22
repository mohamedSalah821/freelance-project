/* form.js — contact form validation */
(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(values) {
    const errors = {};
    if (!values.name || values.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!EMAIL_RE.test(values.email || "")) errors.email = "Enter a valid email address.";
    if (!values.message || values.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
    return errors;
  }

  function setError(form, name, msg) {
    const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
    const errEl = form.querySelector(`[data-error="${name}"]`);
    if (field) field.classList.toggle("is-invalid", Boolean(msg));
    if (errEl) errEl.textContent = msg || "";
  }

  function mount() {
    const form = document.getElementById("contactForm");
    if (!form) return;

  form.addEventListener("submit", async (e) => {
  const values = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const errors = validate(values);

  ["name", "email", "message"].forEach(k => setError(form, k, errors[k]));

  if (Object.keys(errors).length > 0) {
    e.preventDefault(); 
    return;
  }

  // لو مفيش errors → سيب الفورم يتبعت لـ Formspree
  window.Toast.show("Sending message...");
});

    // Live-clear errors as the user types
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (t.name) setError(form, t.name, "");
    });
  }

  window.ContactForm = { mount };
})();
