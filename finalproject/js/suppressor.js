document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    // 1) Hide “Favorite” buttons if not logged in
    if (isLoggedIn !== "true") {
        const hideFavorites = () => {
            document.querySelectorAll("button").forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === "favorite") {
                    btn.style.display = "none";
                }
            });
        };
        hideFavorites(); // initial pass
        new MutationObserver(hideFavorites).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 2) Force “Desert Daze” link to the correct page
    document.querySelectorAll("nav .dropdown-content a").forEach(a => {
        if (a.textContent.trim() === "Desert Daze") {
            a.setAttribute("href", "desertdaze.html");
        }
    });
});



