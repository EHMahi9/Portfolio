const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const html = read("index.html");
const css = read("assets/styles/style.css");
const config = JSON.parse(read("vercel.json"));
const globalHeaders = config.headers.find((entry) => entry.source === "/(.*)")?.headers || [];
const headerMap = new Map(globalHeaders.map((header) => [header.key, header.value]));

assert(!read("assets/scripts/contact.js").includes("mailto:"), "Contact JavaScript must not use mailto.");
assert(css.includes("--nav-bg-dark") && css.includes("--card-bg-dark"), "Dark navbar and card tokens are missing.");
assert(css.split("{").length === css.split("}").length, "CSS braces are unbalanced.");
assert(headerMap.has("Content-Security-Policy"), "Content Security Policy is missing.");
assert(headerMap.has("Permissions-Policy"), "Permissions Policy is missing.");
assert(fs.existsSync(path.join(root, "404.html")), "404 page is missing.");
assert(fs.existsSync(path.join(root, "api", "contact.js")), "Contact API is missing.");

console.log("Portfolio verification checks passed.");
