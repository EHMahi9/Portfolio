"use strict";

const roleTarget = document.querySelector("[data-role-rotator]");
const roles = ["Software Engineering Student", "Full-Stack Developer", "Backend Enthusiast"];

if (roleTarget && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let index = 0;

    window.setInterval(() => {
        index = (index + 1) % roles.length;
        roleTarget.textContent = roles[index];
    }, 2600);
}
