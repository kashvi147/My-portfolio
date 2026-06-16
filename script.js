// ============================================
// Portfolio — beginner-friendly JavaScript
// ============================================

// --- Grab elements we need ---
const html = document.documentElement;
const nav = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconOpen = document.getElementById("menu-icon-open");
const menuIconClose = document.getElementById("menu-icon-close");
const navLinks = document.querySelectorAll("[data-nav]");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const form = document.getElementById("contact-form");

// How far from top before navbar gets a background (pixels)
const NAVBAR_SCROLL_OFFSET = 24;
// Space above section when scrolling (for fixed navbar)
const SCROLL_OFFSET = 64;


// ============================================
// 1. DARK MODE (toggle light / dark)
// ============================================

function updateThemeIcons() {
  const isLight = html.classList.contains("light-mode");

  const darkIconMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="lucide lucide-moon-icon lucide-moon">
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
    </svg>
  `;

  const lightIconMarkup = `
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
      <g stroke="#a78bfa" stroke-width="1.2">
        <line x1="12" y1="2.6" x2="12" y2="5.1"/>
        <line x1="12" y1="18.9" x2="12" y2="21.4"/>
        <line x1="2.6" y1="12" x2="5.1" y2="12"/>
        <line x1="18.9" y1="12" x2="21.4" y2="12"/>
        <line x1="5.75" y1="5.75" x2="7.4" y2="7.4"/>
        <line x1="16.6" y1="16.6" x2="18.25" y2="18.25"/>
        <line x1="5.75" y1="18.25" x2="7.4" y2="16.6"/>
        <line x1="16.6" y1="7.4" x2="18.25" y2="5.75"/>
      </g>
    </svg>
  `;

  // Update desktop icons
  const darkIcon = document.getElementById("theme-icon-dark");
  const lightIcon = document.getElementById("theme-icon-light");
  if (darkIcon && lightIcon) {
    darkIcon.innerHTML = darkIconMarkup;
    lightIcon.innerHTML = lightIconMarkup;
    darkIcon.classList.toggle("hidden", isLight);
    lightIcon.classList.toggle("hidden", !isLight);
  }

  // Update mobile icons to match desktop
  const darkIconMobile = document.getElementById("theme-icon-dark-mobile");
  const lightIconMobile = document.getElementById("theme-icon-light-mobile");
  if (darkIconMobile && lightIconMobile) {
    darkIconMobile.innerHTML = darkIconMarkup;
    lightIconMobile.innerHTML = lightIconMarkup;
    darkIconMobile.classList.toggle("hidden", isLight);
    lightIconMobile.classList.toggle("hidden", !isLight);
  }
}

function initHeroAnimations() {
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "Web development that feels polished.",
        "Embedded systems built to work reliably.",
        "AI and robotics solutions with real purpose.",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      startDelay: 600,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: false,
      autoInsertCss: false,
    });
  }

  if (typeof tsParticles !== "undefined") {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      particles: {
        number: {
          value: 22,
          density: {
            enable: true,
            area: 900,
          },
        },
        color: {
          value: "#a78bfa",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.16,
          random: {
            enable: true,
            minimumValue: 0.05,
          },
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
          random: true,
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: false,
          },
          onClick: {
            enable: false,
          },
          resize: true,
        },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    });
  }
}

function toggleTheme() {
  // Add or remove "light-mode" class on <html>
  html.classList.toggle("light-mode");

  // Remember choice in browser storage
  if (html.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  updateThemeIcons();
}

// Run once on page load (theme may already be set in <head>)
updateThemeIcons();
initHeroAnimations();

// Both buttons do the same thing
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", toggleTheme);
}


// ============================================
// 2. MOBILE NAVBAR (hamburger menu)
// ============================================

function setMenuOpen(isOpen) {
  mobileMenu.classList.toggle("hidden", !isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuIconOpen.classList.toggle("hidden", isOpen);
  menuIconClose.classList.toggle("hidden", !isOpen);
  // Stop page scrolling behind open menu
  document.body.classList.toggle("overflow-hidden", isOpen);
}

function closeMobileMenu() {
  setMenuOpen(false);
}

function openMobileMenu() {
  setMenuOpen(true);
}

// Click hamburger to open or close
menuBtn.addEventListener("click", function () {
  const isHidden = mobileMenu.classList.contains("hidden");
  if (isHidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
});

// Close menu when a nav link is clicked
navLinks.forEach(function (link) {
  link.addEventListener("click", closeMobileMenu);
});

// Close menu on desktop-sized screens
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

// Navbar background when user scrolls down
let scrollScheduled = false;

function updateScrollState() {
  if (window.scrollY > NAVBAR_SCROLL_OFFSET) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }

  let currentSection = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - SCROLL_OFFSET;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    const isActive = link.getAttribute("href") === "#" + currentSection;
    link.classList.toggle("text-violet-400", isActive);
    if (!link.closest("#mobile-menu")) {
      link.classList.toggle("text-slate-400", !isActive);
    }
  });
}

window.addEventListener("scroll", function () {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(function () {
      updateScrollState();
      scrollScheduled = false;
    });
  }
});


// ============================================
// 3. SMOOTH SCROLLING (click links → scroll)
// ============================================

// All links that start with # (same-page sections)
const pageLinks = document.querySelectorAll('a[href^="#"]');

pageLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const href = link.getAttribute("href");

    // Skip empty hash
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      event.preventDefault();

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  });
});


// ============================================
// Contact form — submit to Formspree and show real result
// ============================================

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : "Send Message";

    if (btn) {
      btn.textContent = "Sending...";
      btn.disabled = true;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        if (btn) btn.textContent = "Message sent!";
        form.reset();
        setTimeout(function () {
          if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
          }
        }, 2500);
      } else {
        // Try to surface server error message if available
        let errorMsg = "There was a problem submitting the form.";
        try {
          const data = await response.json();
          if (data && data.error) errorMsg = data.error;
        } catch (e) {
          // ignore JSON parse errors
        }
        alert(errorMsg + " Please try again.");
        if (btn) {
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }
    } catch (err) {
      console.error("Form submission failed", err);
      alert("Network error. Please try again later.");
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }
  });
}


// ============================================
// AOS scroll animations
// ============================================

function initAOS() {
  if (typeof AOS === "undefined") {
    return;
  }

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
