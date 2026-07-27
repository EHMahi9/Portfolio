"use strict";

const mockups = Array.from(document.querySelectorAll(".browser-mockup"));
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotionProjects = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && !reducedMotionProjects) {
    mockups.forEach((mockup) => {
        mockup.addEventListener("pointermove", (event) => {
            const rect = mockup.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 5;
            const rotateX = ((y / rect.height) - 0.5) * -5;

            mockup.classList.add("is-tilting");
            mockup.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        mockup.addEventListener("pointerleave", () => {
            mockup.classList.remove("is-tilting");
            mockup.style.transform = "";
        });
    });
}

document.querySelectorAll("[aria-disabled='true']").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
    });
});