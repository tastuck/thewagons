document.addEventListener("DOMContentLoaded", getFestival);

function getFestival() {
    let allStages = [];
    let currentIndex = 0;

    fetch("festivals.json")
        .then(resp => {
            if (!resp.ok) throw new Error("Network error");
            return resp.json();
        })
        .then(data => {
            const fest = data.find(f => f.festival === "Camp Flog Gnaw 2014");
            if (!fest) {
                document.getElementById("stageContainer").innerHTML =
                    "<p>Festival not found</p>";
                return;
            }
            allStages = fest.stages;
            showStage(0);

            if (localStorage.getItem("loggedIn") === "true") {
                setLoggedInState();
            } else {
                setLoggedOutState();
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("stageContainer").innerHTML =
                "<p>Error loading data</p>";
        });

    function showStage(idx) {
        currentIndex = idx;
        const s = allStages[idx];
        const container = document.getElementById("stageContainer");
        container.innerHTML = `<h2 id="stageName">${s.name}</h2>`;

        // single-string caption—let CSS handle the wrapping exactly like Desert Daze
        const desc = document.createElement("p");
        desc.className = "stage-description";
        desc.textContent = "Pictured: " + getCaption(s.name);
        container.appendChild(desc);

        const row = document.createElement("div");
        row.className = "media-row";
        s.img.slice(0, 2).forEach(src => {
            const box = document.createElement("div");
            box.className = "media-box";

            const img = document.createElement("img");
            img.src = src;
            img.alt = s.name;
            box.appendChild(img);

            const btn = document.createElement("button");
            btn.className = "add-fav-btn";
            btn.textContent = "Add to Favorites";
            btn.addEventListener("click", () => toggleFavorite(s.name, src, btn));
            box.appendChild(btn);

            row.appendChild(box);
        });
        container.appendChild(row);

        updateFavButtons();
    }

    function getCaption(stageName) {
        return {
            "Main Stage": "Earl Sweatshirt & Tyler, The Creator",
            "Odd Future Stage": "Trash Talk & Mac Miller"
        }[stageName] || "";
    }

    function updateFavButtons() {
        const show = localStorage.getItem("loggedIn") === "true";
        document.querySelectorAll(".add-fav-btn")
            .forEach(b => b.style.display = show ? "inline-block" : "none");
    }

    function toggleFavorite(stage, src, btn) {
        let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        const item = { stageImg: src, stageName: stage, festivalName: "Camp Flog Gnaw 2014" };
        const exists = favs.some(f => f.stageImg === src);
        if (!exists) {
            favs.push(item);
            btn.textContent = "Remove from Favorites";
        } else {
            favs = favs.filter(f => f.stageImg !== src);
            btn.textContent = "Add to Favorites";
        }
        localStorage.setItem("favorites", JSON.stringify(favs));
    }

    function setLoggedInState() {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("login").style.display = "none";
        document.getElementById("favLink").style.display = "block";
        document.getElementById("logout").style.display = "inline-block";
        updateFavButtons();
    }

    function setLoggedOutState() {
        localStorage.removeItem("loggedIn");
        document.getElementById("login").style.display = "block";
        document.getElementById("favLink").style.display = "none";
        document.getElementById("logout").style.display = "none";
        updateFavButtons();
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) showStage(currentIndex - 1);
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex < allStages.length - 1) showStage(currentIndex + 1);
    });
    document.getElementById("login").addEventListener("submit", e => {
        e.preventDefault();
        setLoggedInState();
    });
    document.getElementById("logout").addEventListener("click", () => {
        setLoggedOutState();
    });
}


