const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll-reveals via IntersectionObserver */
function initReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (reduceMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* Hero-titel woord voor woord laten binnenkomen */
function initHeroTitle() {
  const title = document.querySelector("[data-split-words]");
  if (!title || reduceMotion()) return;

  const words = title.textContent.trim().split(/\s+/);
  title.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.setProperty("--word-index", String(index));
    span.textContent = word;
    title.appendChild(span);
    if (index < words.length - 1) title.appendChild(document.createTextNode(" "));
  });
}

/* Lichte parallax op de hero-achtergrond tijdens scrollen */
function initHeroParallax() {
  const media = document.querySelector(".hero__media");
  if (!media || reduceMotion()) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    media.style.transform = `translateY(${y * 0.22}px)`;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

/* Spotlight-hover: cards volgen de muispositie met een lichtvlek */
function initSpotlightCards() {
  if (reduceMotion() || window.matchMedia("(hover: none)").matches) return;

  document.addEventListener("pointermove", (event) => {
    const card = event.target.closest?.("[data-spotlight]");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}

/* Leesvoortgang in de header */
function initScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.setProperty("--scroll-progress", String(progress));
  };

  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

/* Scrollspy: markeer de navigatielink van de zichtbare sectie */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const sections = links
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.hash === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}

export function initAnimations() {
  initHeroTitle();
  initReveals();
  initHeroParallax();
  initSpotlightCards();
  initScrollProgress();
  initScrollSpy();
}
