"use strict";

const themePreferenceKey = "mahi-portfolio-theme";
const savedTheme = localStorage.getItem(themePreferenceKey);
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = savedTheme || (systemPrefersDark ? "dark" : "light");
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const updateThemeToggle = () => {
        const isLight = document.documentElement.dataset.theme === "light";
        themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.querySelector(".theme-toggle-icon").textContent = isLight ? "☾" : "☀";
        themeToggle.querySelector(".theme-toggle-label").textContent = isLight ? "Dark" : "Light";
    };

    if (themeToggle) {
        updateThemeToggle();
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem(themePreferenceKey, nextTheme);
            updateThemeToggle();
        });
    }

    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });

    document.querySelectorAll("a[target='_blank']").forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll("img").forEach((image) => {
        if (!image.hasAttribute("decoding")) {
            image.setAttribute("decoding", "async");
        }
    });

    document.body.classList.add("is-ready");
});
