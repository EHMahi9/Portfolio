"use strict";

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
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