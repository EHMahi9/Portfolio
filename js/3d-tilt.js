document.addEventListener("DOMContentLoaded", () => {
    const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canTilt) return;

    document.querySelectorAll("[data-tilt]").forEach((element) => {
        let frameId = null;
        let pointerX = 0;
        let pointerY = 0;

        const updateTilt = () => {
            const bounds = element.getBoundingClientRect();
            const x = (pointerX - bounds.left) / bounds.width - 0.5;
            const y = (pointerY - bounds.top) / bounds.height - 0.5;

            element.style.setProperty("--tilt-x", `${(y * -5).toFixed(2)}deg`);
            element.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
            element.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
            element.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
            frameId = null;
        };

        element.addEventListener("pointermove", (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (frameId === null) frameId = requestAnimationFrame(updateTilt);
        });

        element.addEventListener("pointerleave", () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            frameId = null;
            element.style.removeProperty("--tilt-x");
            element.style.removeProperty("--tilt-y");
        });
    });
});
