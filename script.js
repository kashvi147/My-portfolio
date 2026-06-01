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

function initAOS() {
  if (typeof AOS === "undefined") return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  AOS.init({
    duration: 650,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
    delay: 0,
    mirror: false,
    disable: prefersReducedMotion,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAOS);
} else {
  initAOS();
}
