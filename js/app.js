"use strict";

const themePreferenceKey = "mahi-portfolio-theme";

const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector("meta[name='theme-color']")?.setAttribute(
        "content",
        theme === "light" ? "#f5f7f3" : "#090907"
    );
};

if (!['light', 'dark'].includes(document.documentElement.dataset.theme)) {
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}
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
            setTheme(nextTheme);
            try {
                localStorage.setItem(themePreferenceKey, nextTheme);
            } catch {
                // Theme changes still work when the browser blocks persistent storage.
            }
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
