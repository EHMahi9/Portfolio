const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

const validators = {
    name: (value) => value.trim().length >= 2 ? "" : "Please enter your name.",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
    subject: (value) => value.trim().length >= 3 ? "" : "Please add a short subject.",
    message: (value) => value.trim().length >= 15 ? "" : "Please write at least 15 characters."
};

const setFieldError = (input, message) => {
    const row = input.closest(".form-row");
    row?.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    const error = row?.querySelector(".form-error");
    if (error) error.textContent = message;
};

const validateInput = (input) => {
    const message = validators[input.name]?.(input.value) || "";
    setFieldError(input, message);
    return !message;
};

if (contactForm && formStatus) {
    const inputs = [...contactForm.querySelectorAll("input, textarea")];
    const submitButton = contactForm.querySelector("button[type='submit']");

    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateInput(input));
        input.addEventListener("input", () => {
            if (input.getAttribute("aria-invalid") === "true") validateInput(input);
        });
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!inputs.map(validateInput).every(Boolean)) {
            formStatus.classList.add("is-error");
            formStatus.textContent = "Please fix the highlighted fields.";
            return;
        }

        const payload = Object.fromEntries(new FormData(contactForm).entries());
        submitButton.disabled = true;
        formStatus.classList.remove("is-error");
        formStatus.textContent = "Sending your message...";

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || "Unable to send your message right now.");

            formStatus.textContent = result.message || "Thanks - your message has been received.";
            contactForm.reset();
            inputs.forEach((input) => setFieldError(input, ""));
        } catch (error) {
            formStatus.classList.add("is-error");
            formStatus.textContent = error.message || "Unable to send your message right now.";
        } finally {
            submitButton.disabled = false;
        }
    });
}
