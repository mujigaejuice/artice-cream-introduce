// Keep the content in HTML so it is readable even when JavaScript is disabled.
(() => {
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const menuLinks = document.querySelectorAll(".nav-menu [data-section]");
  const sectionIds = new Set(panels.map((panel) => panel.id));

  function showSection(id, moveFocus = false) {
    for (const panel of panels) {
      panel.hidden = panel.id !== id;
    }

    for (const link of menuLinks) {
      if (link.dataset.section === id) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }

    const panel = document.getElementById(id);
    document.title = `artice cream — ${panel.getAttribute("aria-label")}`;
    if (moveFocus) panel.focus({ preventScroll: true });
  }

  document.documentElement.classList.add("js-enabled");
  const initialId = window.location.hash.slice(1);
  showSection(sectionIds.has(initialId) ? initialId : "overview");

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.slice(1);
    // The skip link targets the main landmark without changing the selected page.
    if (!id || sectionIds.has(id)) {
      showSection(id || "overview", true);
    }
  });
})();
