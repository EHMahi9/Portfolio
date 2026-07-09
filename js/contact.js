"use strict";

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const contactEmail = "vaibongo20@gmail.com";

const validators = {
    name(value) {
        return value.trim().length >= 2 ? "" : "Please enter your name.";
    },
    email(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.";
    },
    subject(value) {
        return value.trim().length >= 3 ? "" : "Please add a short subject.";
    },
    message(value) {
        return value.trim().length >= 15 ? "" : "Please write at least 15 characters.";
    }
};

function setFieldError(input, message) {
    const row = input.closest(".form-row");
    const error = row?.querySelector(".form-error");

    row?.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));

    if (error) {
        error.textContent = message;
    }
}

function validateInput(input) {
    const validate = validators[input.name];
    const message = validate ? validate(input.value) : "";

    setFieldError(input, message);
    return !message;
}

function buildMailto(formData) {
    const subject = encodeURIComponent(formData.get("subject").trim());
    const body = encodeURIComponent(
        `Name: ${formData.get("name").trim()}\n` +
        `Email: ${formData.get("email").trim()}\n\n` +
        formData.get("message").trim()
    );

    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

if (contactForm) {
    const inputs = Array.from(contactForm.querySelectorAll("input, textarea"));

    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateInput(input));
        input.addEventListener("input", () => {
            if (input.getAttribute("aria-invalid") === "true") {
                validateInput(input);
            }
        });
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = inputs.map(validateInput).every(Boolean);

        if (!isValid) {
            formStatus.textContent = "Please fix the highlighted fields.";
            return;
        }

        const formData = new FormData(contactForm);
        window.location.href = buildMailto(formData);
        formStatus.textContent = "Opening your email app with the message prepared.";
        contactForm.reset();
        inputs.forEach((input) => setFieldError(input, ""));
    });
}
