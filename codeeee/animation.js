document.addEventListener("DOMContentLoaded", function () {
    // Apply fade-in effect when the page loads
    document.body.classList.add("fade-in");

    // Function to animate the logo only if it exists
    function animateLogo() {
        const logo = document.getElementById("logo");
        if (!logo) return;

        function randomChar() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01";
            return chars[Math.floor(Math.random() * chars.length)];
        }

        const text = "CODED".split('');
        const temp = Array(text.length).fill(" ");
        let randomChangeInterval;

        function startShufflingSequentially(i = 0) {
            if (i < text.length) {
                let shuffleInterval = setInterval(() => {
                    temp[i] = randomChar();
                    logo.textContent = temp.join('');
                }, 75);

                setTimeout(() => {
                    clearInterval(shuffleInterval);
                    temp[i] = text[i];
                    logo.textContent = temp.join('');
                    startShufflingSequentially(i + 1);
                }, 500);
            } else {
                setTimeout(() => resetToRandomSequentially(), 1000);
            }
        }

        function resetToRandomSequentially(i = 0) {
            if (i < text.length) {
                let shuffleInterval = setInterval(() => {
                    temp[i] = randomChar();
                    logo.textContent = temp.join('');
                }, 75);

                setTimeout(() => {
                    clearInterval(shuffleInterval);
                    resetToRandomSequentially(i + 1);
                }, 300);
            } else {
                setTimeout(() => startShufflingSequentially(), 300);
            }
        }

        function startRandomChanges() {
            randomChangeInterval = setInterval(() => {
                const index = Math.floor(Math.random() * text.length);
                const originalChar = temp[index];

                if (originalChar !== " ") {
                    let rapidChangeInterval = setInterval(() => {
                        temp[index] = randomChar();
                        logo.textContent = temp.join('');
                    }, 75);

                    setTimeout(() => {
                        clearInterval(rapidChangeInterval);
                        temp[index] = originalChar;
                        logo.textContent = temp.join('');
                    }, 500);
                }
            }, 2000);
        }

        startShufflingSequentially();
        startRandomChanges();
    }

    // Run logo animation only on the home page
    animateLogo();

    // Fade-out effect for all navigation links
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent immediate navigation
            const targetPage = this.href;

            // Apply fade-out effect
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = targetPage; // Redirect after fade-out
            }, 600); // Matches CSS transition duration
        });
    });
});
