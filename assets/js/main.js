const navLinks = Array.from(document.querySelectorAll(".section-nav__link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

function setActiveSection(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.hash === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
      if (window.matchMedia("(max-width: 800px)").matches) {
        const nav = link.parentElement;
        const centeredPosition = link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2;
        nav.scrollTo({ left: centeredPosition, behavior: "smooth" });
      }
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window) {
  const visibleSections = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      const mostVisible = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
      if (mostVisible) setActiveSection(mostVisible[0]);
    },
    {
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0, 0.15, 0.35, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveSection(link.hash.slice(1)));
});
