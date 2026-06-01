const nav = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconOpen = document.getElementById("menu-icon-open");
const menuIconClose = document.getElementById("menu-icon-close");
const navLinks = document.querySelectorAll("[data-nav]");

function setMenuOpen(isOpen) {
  mobileMenu.classList.toggle("hidden", !isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuIconOpen?.classList.toggle("hidden", isOpen);
  menuIconClose?.classList.toggle("hidden", !isOpen);
  document.body.classList.toggle("overflow-hidden", isOpen);
}

function closeMobileMenu() {
  setMenuOpen(false);
}

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("hidden");
  setMenuOpen(isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMobileMenu());
});

window.addEventListener(
  "resize",
  () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeMobileMenu();
    }
  },
  { passive: true }
);

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }

  const sections = document.querySelectorAll("section[id]");
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("text-violet-400", isActive);
    if (!link.closest("#mobile-menu")) {
      link.classList.toggle("text-slate-400", !isActive);
    }
  });
});

const form = document.getElementById("contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = "Message sent!";
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = original;
    btn.disabled = false;
  }, 2500);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-6");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
