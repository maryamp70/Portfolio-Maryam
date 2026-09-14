document.addEventListener("DOMContentLoaded", () => {
  const langToggleBtn = document.getElementById("lang-toggle");

  let currentLang = "de";

  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "de" ? "en" : "de";

    langToggleBtn.textContent = currentLang === "de" ? "EN" : "DE";

    const elementsToTranslate = document.querySelectorAll("[data-en][data-de]");

    elementsToTranslate.forEach((element) => {
      const newText = element.getAttribute(`data-${currentLang}`);
      if (newText) {
        element.innerHTML = newText;
      }
    });
  });
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Projects Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      card.classList.remove("show-project");

      if (filterValue === "all" || filterValue === category) {
        card.classList.remove("hide-project");

        setTimeout(() => {
          card.classList.add("show-project");
        }, 10);
      } else {
        card.classList.add("hide-project");
      }
    });
  });
});

// === Scroll Spy ===
const sections = document.querySelectorAll("section[id]");
const navLinksItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  const isAtBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 50;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute("id");
    const correspondingNavLink = document.querySelector(
      `.nav-links a[href*="#${sectionId}"]`,
    );

    if (correspondingNavLink) {
      if (isAtBottom && sectionId === "contact") {
        navLinksItems.forEach((link) => link.classList.remove("active-nav"));
        correspondingNavLink.classList.add("active-nav");
      } else if (
        !isAtBottom &&
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        correspondingNavLink.classList.add("active-nav");
      } else {
        correspondingNavLink.classList.remove("active-nav");
      }
    }
  });
});

//  Dark Mode
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");
const body = document.body;

const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});
