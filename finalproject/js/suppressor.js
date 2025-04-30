// wait for file
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    // if not logged in no favorites buttons
    if (!isLoggedIn) {
        // this watches for new elements
        const observer = new MutationObserver(() => {
            // find favorite buttons
            document.querySelectorAll(".favorite-btn, .favoriteButton").forEach(btn => {
                // make them not show up
                btn.style.display = "none";
            });
        });

        // look at whole page
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
});

