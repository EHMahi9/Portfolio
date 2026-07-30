const themePreferenceKey = "mahi-portfolio-theme";

export const applyTheme = (theme) => {
    const resolvedTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = resolvedTheme;
    document.querySelector("meta[name='theme-color']")?.setAttribute(
        "content",
        resolvedTheme === "light" ? "#d9efff" : "#071a3d"
    );
    return resolvedTheme;
};

export const getInitialTheme = () => {
    try {
        const savedTheme = localStorage.getItem(themePreferenceKey);
        if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    } catch {
        // Fall back to the system preference when persistent storage is unavailable.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const saveTheme = (theme) => {
    try {
        localStorage.setItem(themePreferenceKey, theme);
    } catch {
        // A blocked storage API must not prevent an in-session theme change.
    }
};
