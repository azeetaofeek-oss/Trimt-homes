document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("dashboard-year");
  if (year) year.textContent = new Date().getFullYear();

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".dashboard-section");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");

  function showSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target || !target.classList.contains("dashboard-section")) return;
    sections.forEach((section) => section.classList.remove("active"));
    target.classList.add("active");
    navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === sectionId));
    document.body.classList.remove("sidebar-open");
    sidebarToggle?.setAttribute("aria-expanded", "false");
    history.replaceState(null, "", `#${sectionId}`);
  }

  navLinks.forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.dataset.section) showSection(link.dataset.section);
  }));
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.open) showSection(button.dataset.open);
  }));
  sidebarToggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("sidebar-open");
    sidebarToggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (document.body.classList.contains("sidebar-open") && !sidebar?.contains(event.target) && !sidebarToggle?.contains(event.target)) {
      document.body.classList.remove("sidebar-open");
      sidebarToggle?.setAttribute("aria-expanded", "false");
    }
  });
  const initialSection = window.location.hash.slice(1);
  if (initialSection) showSection(initialSection);
  document.getElementById("add-property-button")?.addEventListener("click", () => {
    window.alert("Property management will be activated after the database and admin features are connected.");
  });
});
