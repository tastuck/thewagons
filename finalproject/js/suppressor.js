document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    // if not logged in or explicitly false, hide all favorite buttons
    if (isLoggedIn !== "true") {
        const observer = new MutationObserver(() => {
            document.querySelectorAll("button").forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === "favorite") {
                    btn.style.display = "none";
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
});


