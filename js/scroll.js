"use strict";

const progressBar = document.querySelector(".scroll-bar");
const backToTopButton = document.querySelector("#backToTop");
const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let ticking = false;

function updateScrollUi() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    backToTopButton?.classList.toggle("is-visible", window.scrollY > 640);
    ticking = false;
}

function requestScrollUpdate() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateScrollUi);
}

if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "0px 0px -90px 0px",
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

backToTopButton?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });
});

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollUi();
