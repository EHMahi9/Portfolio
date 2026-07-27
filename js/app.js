import { applyTheme, getInitialTheme, saveTheme } from "./theme.js";

applyTheme(getInitialTheme());
document.documentElement.classList.add("js-enabled");

const themeToggle = document.querySelector("[data-theme-toggle]");

const updateThemeToggle = () => {
    if (!themeToggle) return;

    const isLight = document.documentElement.dataset.theme === "light";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.querySelector(".theme-toggle-icon").textContent = isLight ? "\u263E" : "\u2600";
    themeToggle.querySelector(".theme-toggle-label").textContent = isLight ? "Dark" : "Light";
};

updateThemeToggle();
themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    saveTheme(applyTheme(nextTheme));
    updateThemeToggle();
});

document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("a[target='_blank']").forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
});

document.querySelectorAll("img").forEach((image) => {
    if (!image.hasAttribute("decoding")) image.setAttribute("decoding", "async");
});

document.body.classList.add("is-ready");
