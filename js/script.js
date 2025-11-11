// Theme Switcher
const themeSwitcher = document.getElementById("themeSwitcher");
const htmlElement = document.documentElement;

const menuButton = document.querySelector(".mobile-menu-button");
const navMenu = document.querySelector(".nav-menu");

// === Mobile Menu Toggle ===
menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const isExpanded = navMenu.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isExpanded);

  // Toggle icon between bars and close (X)
  menuButton.querySelector("i").className = isExpanded
    ? "fas fa-times"
    : "fas fa-bars";
});

// === Dropdown Menu Fix for Mobile ===
document.querySelectorAll(".dropdown > a").forEach((dropToggle) => {
  dropToggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // prevent immediate navigation
      const parent = dropToggle.parentElement;
      parent.classList.toggle("open");
    }
  });
});

// === Theme Preference ===
// Always default to light theme
let currentTheme = localStorage.getItem("theme") || "light";

// Apply theme on page load
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  document.body.classList.remove("light-mode");
  themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme switcher click event
themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  themeSwitcher.innerHTML = isLightMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});


// === Navbar Hide/Show on Scroll ===
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// === Scroll Animation ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el);
});

window.addEventListener("load", () => {
  document
    .querySelectorAll(
      ".content-grid, .service-card, .expertise-card, .feature-card, .stat-card, .info-card, .skill-item"
    )
    .forEach((el) => {
      el.classList.add("scroll-animate");
      observer.observe(el);
    });
});

// === Contact Form ===
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// === Map Initialization ===
function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  const location = [37.3382, -121.8863];
  const map = L.map("map").setView(location, 13);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 19,
  }).addTo(map);

  const marker = L.marker(location).addTo(map);
  marker
    .bindPopup(
      "<b>T-Plus Technologies</b><br>123 Tech Avenue<br>Silicon Valley, CA 94025"
    )
    .openPopup();

  const style = document.createElement("style");
  style.textContent = `
    .leaflet-popup-content-wrapper {
        background: rgba(10, 14, 39, 0.95) !important;
        border: 1px solid rgba(0, 217, 255, 0.3) !important;
        border-radius: 10px !important;
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.2) !important;
    }
    .leaflet-popup-content {
        color: #e0e6ff !important;
    }
    .leaflet-popup-tip {
        background: rgba(10, 14, 39, 0.95) !important;
    }
  `;
  document.head.appendChild(style);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMap);
} else {
  initMap();
}

// === Active Nav Link ===
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// === Client Carousel Hover Pause ===
const track = document.querySelector(".carousel-track");
if (track) {
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}

// === Number Counter Animation ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-card h3");

  const animateValue = (el, start, end, duration) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent = value + (el.textContent.includes("+") ? "+" : "");
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const h3 = entry.target.querySelector("h3");
          if (!h3.classList.contains("counted")) {
            h3.classList.add("counted");
            const target = parseInt(h3.getAttribute("data-target"));
            animateValue(h3, 0, target, 1500);
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".stat-card")
    .forEach((card) => counterObserver.observe(card));
});

// Netowrking Popup

const modal = document.getElementById("servicesModal");
const openBtn = document.getElementById("openServicesModal");
const closeBtn = document.getElementById("closeServicesModal");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // prevent background scroll
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close when clicking outside the modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
