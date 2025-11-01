// Theme Switcher
const themeSwitcher = document.getElementById("themeSwitcher");
const htmlElement = document.documentElement;

const menuButton = document.querySelector(".mobile-menu-button");
const navMenu = document.querySelector(".nav-menu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const isExpanded = navMenu.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isExpanded);
  // Optional: Toggle the icon from bars to close (X)
  menuButton.querySelector("i").className = isExpanded
    ? "fas fa-times"
    : "fas fa-bars";
});

// Make service cards clickable
document.querySelectorAll(".service-card-1").forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    if (link) window.location.href = link;
  });
});

const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    dropdown.classList.toggle("open");
  }
});

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
}

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  themeSwitcher.innerHTML = isLightMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("hide");
  } else {
    // Scrolling up
    navbar.classList.remove("hide");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Scroll Animation
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

// Observe all elements with scroll-animate class
document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el);
});

// Add scroll-animate class to elements on page load
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

// Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// Initialize Map
function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // T-Plus Technologies location (Silicon Valley, CA)
  const location = [37.3382, -121.8863];

  const map = L.map("map").setView(location, 13);

  // Custom tile layer with dark theme
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 19,
  }).addTo(map);

  // Add marker
  const marker = L.marker(location).addTo(map);
  marker
    .bindPopup(
      "<b>T-Plus Technologies</b><br>123 Tech Avenue<br>Silicon Valley, CA 94025"
    )
    .openPopup();

  // Add custom styling to map
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

// Initialize map when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMap);
} else {
  initMap();
}

// Active nav link based on current page
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
