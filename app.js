const properties = {
  1: { title: "Modern Residential Home", category: "For Sale", description: "A sample residential property in Lagos, Nigeria. Contact TRIMT HOMES for verified availability, price and full property details." },
  2: { title: "Contemporary Apartment", category: "For Rent", description: "A sample contemporary apartment in Lagos, Nigeria. Contact TRIMT HOMES for verified availability, rental terms and full property details." },
  3: { title: "Property Investment Opportunity", category: "Investment", description: "A sample property investment opportunity. Contact TRIMT HOMES to discuss current opportunities and obtain verified information." }
};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const loader = document.getElementById("loader");
  window.addEventListener("load", () => window.setTimeout(() => loader?.classList.add("is-hidden"), 250));
  window.setTimeout(() => loader?.classList.add("is-hidden"), 2500);

  const menuButton = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    nav?.classList.toggle("is-open", open);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation menu");
  }));

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".property-card");
  filters.forEach((button) => button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    cards.forEach((card) => { card.hidden = selected !== "all" && card.dataset.category !== selected; });
  }));

  document.querySelectorAll(".save-property").forEach((button) => button.addEventListener("click", () => {
    const saved = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(saved));
    button.classList.toggle("saved", saved);
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${button.closest(".property-card")?.querySelector("h3")?.textContent ?? "property"} ${saved ? "from" : "to"} favourites`);
  }));

  const modal = document.getElementById("propertyModal");
  const modalBody = document.getElementById("modalBody");
  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  document.querySelectorAll(".details-btn").forEach((button) => button.addEventListener("click", () => {
    const property = properties[button.dataset.property];
    if (!property || !modal || !modalBody) return;
    const heading = document.createElement("h2");
    heading.id = "modalTitle";
    heading.textContent = property.title;
    const category = document.createElement("p");
    category.textContent = property.category;
    const description = document.createElement("p");
    description.textContent = property.description;
    const contact = document.createElement("a");
    contact.href = "#contact";
    contact.className = "btn btn-primary";
    contact.textContent = "Enquire about this property";
    modalBody.replaceChildren(heading, category, description, contact);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }));
  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  modalBody?.addEventListener("click", (event) => { if (event.target.closest("a")) closeModal(); });

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const recipient = "REPLACE_WITH_YOUR_BUSINESS_EMAIL";
    if (recipient === "REPLACE_WITH_YOUR_BUSINESS_EMAIL") {
      if (formMessage) formMessage.textContent = "The enquiry form is a preview. Configure your business email or connect Supabase before collecting enquiries.";
      return;
    }
    const subject = encodeURIComponent(`TRIMT HOMES enquiry: ${data.get("interest")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\nInterest: ${data.get("interest")}\n\nMessage:\n${data.get("message")}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    if (formMessage) formMessage.textContent = "Your email app should open with your enquiry ready to send.";
  });

  const revealTargets = document.querySelectorAll(".section-heading, .service-card, .property-card, .why-card, .about-image, .about-content, .investment-content, .investment-image, .contact-form");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach((element) => { element.classList.add("reveal"); observer.observe(element); });
  }
});
