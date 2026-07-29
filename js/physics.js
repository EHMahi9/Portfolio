document.addEventListener("DOMContentLoaded", () => {
    // 1. Generate Floating Code Particles (Kept for the backend vibe)
    const shell = document.querySelector(".page-shell");
    if (shell) {
        const particleContainer = document.createElement("div");
        particleContainer.className = "code-particles";
        particleContainer.setAttribute("aria-hidden", "true");
        shell.appendChild(particleContainer);

        const symbols = ["{ }", "</>", "=>", "[]", "++", "===", "01", "if()", "&&", "||", ";", "/>"];
        
        for (let i = 0; i < 30; i++) {
            const span = document.createElement("span");
            span.className = "code-particle";
            span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            span.style.left = `${Math.random() * 100}%`;
            span.style.animationDuration = `${12 + Math.random() * 20}s`;
            span.style.animationDelay = `${Math.random() * -10}s`; 
            span.style.fontSize = `${0.8 + Math.random() * 1.5}rem`;
            particleContainer.appendChild(span);
        }
    }

    // 2. Cyber-Security Decryption Effect
    const heroTitle = document.querySelector("#hero-title");
    if (heroTitle) {
        // Characters used for the glitch scrambling
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
        const finalName = heroTitle.textContent.trim();
        let interval = null;
        
        // Change cursor to crosshair for a pentester aesthetic
        heroTitle.style.cursor = "crosshair";
        
        const triggerDecryption = () => {
            let iteration = 0;
            clearInterval(interval);
            
            // Add a CSS class to shift colors during the glitch
            heroTitle.classList.add("is-glitching");
            
            interval = setInterval(() => {
                heroTitle.textContent = finalName
                    .split("")
                    .map((char, index) => {
                        // Don't scramble spaces
                        if(char === " ") return " ";
                        // Reveal correct letter if iteration has passed it
                        if(index < iteration) return finalName[index];
                        // Otherwise, show a random hacker symbol
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                // Stop when fully decrypted
                if(iteration >= finalName.length) {
                    clearInterval(interval);
                    heroTitle.classList.remove("is-glitching");
                }
                
                // Speed of decryption (higher number = faster reveal)
                iteration += 1 / 3;
            }, 30);
        };

        // Run once automatically on page load
        triggerDecryption();

        // Re-run whenever the mouse hovers over your name
        heroTitle.addEventListener("mouseenter", triggerDecryption);
    }
});