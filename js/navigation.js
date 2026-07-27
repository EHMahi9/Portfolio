"use strict";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("#primaryNavigation");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

function setMenu(open) {
    if (!nav || !menuButton) return;

    nav.classList.toggle("is-open", open);
    menuButton.classList.toggle("is-active", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
}

function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

menuButton?.addEventListener("click", () => {
    setMenu(!nav?.classList.contains("is-open"));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

document.addEventListener("click", (event) => {
    if (!nav || !menuButton) return;

    const target = event.target;
    const clickedOutside = !nav.contains(target) && !menuButton.contains(target);

    if (clickedOutside) {
        setMenu(false);
    }
});

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
            navLinks.forEach((link) => link.classList.remove("is-active"));
            activeLink?.classList.add("is-active");
        });
    },
    {
        rootMargin: "-38% 0px -54% 0px",
        threshold: 0.01
    }
);

sections.forEach((section) => navObserver.observe(section));

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
        setMenu(false);
    }
});

updateHeader();