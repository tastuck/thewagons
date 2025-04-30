document.addEventListener("DOMContentLoaded", getFestival);

function getFestival() {
    let allStages = [];
    let stages = [];
    let currentIndex = 0;

    fetch("festivals.json")
        .then(resp => {
            if (!resp.ok) throw new Error("Network error");
            return resp.json();
        })
        .then(data => {
            const fest = data.find(f => f.festival === "Desert Daze 2022");
            if (!fest) {
                document.getElementById("stageContainer").innerHTML =
                    "<p>Festival not found</p>";
                return;
            }
            allStages = fest.stages;
            setDay("Friday");
            document.querySelector('.dayBtn[data-day="Friday"]').classList.add("active");

            // initial login state
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

    // switch days
    function setDay(day) {
        stages = allStages
            .map(s => {
                const d = s.days?.find(x => x.day === day);
                return d ? {
                    name: s.name,
                    media: d.media || [],
                    pictured: getCaption(s.name, day)
                } : null;
            })
            .filter(Boolean);

        currentIndex = 0;
        if (stages.length) {
            showStage(0);
        } else {
            document.getElementById("stageContainer").innerHTML =
                `<p>No stages for ${day}</p>`;
        }
    }

    // render a stage
    function showStage(idx) {
        currentIndex = idx;
        const st = stages[idx];
        const container = document.getElementById("stageContainer");
        container.innerHTML = `<h2 id="stageName">${st.name}</h2>`;

        if (st.pictured) {
            const p = document.createElement("p");
            p.className = "stage-description";
            p.textContent = `Pictured: ${st.pictured}`;
            container.appendChild(p);
        }

        const mediaSec = document.createElement("div");
        mediaSec.className = "media-section";
        mediaSec.appendChild(makeRow(st.media.filter(m => !m.endsWith(".mp4")), false));
        mediaSec.appendChild(makeRow(st.media.filter(m => m.endsWith(".mp4")), true));
        container.appendChild(mediaSec);

        updateFavButtons();
    }

    // helper to build each row
    function makeRow(files, isVid) {
        const row = document.createElement("div");
        row.className = "media-row";

        files.slice(0,2).forEach(src => {
            const box = document.createElement("div");
            box.className = "media-box";

            const el = isVid ? document.createElement("video") : document.createElement("img");
            if (isVid) {
                el.src = src;
                el.controls = true;
                el.loop = true;
                el.muted = true;
            } else {
                el.src = src;
                el.alt = "";
            }
            box.appendChild(el);

            // *** favorite button stores an object ***
            const btn = document.createElement("button");
            btn.className = "add-fav-btn";
            btn.textContent = "Add to Favorites";
            btn.addEventListener("click", () => {
                const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
                const item = {
                    stageImg: src,
                    stageName: stages[currentIndex].name,
                    festivalName: "Desert Daze 2022"
                };
                if (!favs.some(f => f.stageImg === src)) {
                    favs.push(item);
                    localStorage.setItem("favorites", JSON.stringify(favs));
                    alert("Added to favorites");
                } else {
                    alert("Already in your favorites");
                }
            });
            box.appendChild(btn);

            row.appendChild(box);
        });

        return row;
    }

    // show/hide those fav buttons
    function updateFavButtons() {
        const show = localStorage.getItem("loggedIn") === "true";
        document.querySelectorAll(".add-fav-btn")
            .forEach(b => b.style.display = show ? "inline-block" : "none");
    }

    // prev/next stage
    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) showStage(currentIndex - 1);
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex < stages.length - 1) showStage(currentIndex + 1);
    });

    // day buttons
    document.querySelectorAll(".dayBtn").forEach(btn =>
        btn.addEventListener("click", () => {
            document.querySelectorAll(".dayBtn").forEach(x => x.classList.remove("active"));
            btn.classList.add("active");
            setDay(btn.dataset.day);
        })
    );

    // LOGIN form
    document.getElementById("login").addEventListener("submit", e => {
        e.preventDefault();
        setLoggedInState();
        alert("Login successful!");
    });

    // LOGOUT button
    document.getElementById("logout").addEventListener("click", () => {
        setLoggedOutState();
        alert("Logged out");
    });

    // toggle profile UI
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

    // hard-coded “Pictured:” captions
    function getCaption(stageName, day) {
        const C = {
            "The Moon": {
                Friday: "Chicano Batman and King Gizzard",
                Saturday: "Tame Impala and Kikagaku Moyo",
                Sunday: "The Marías and Beach House"
            },
            "The Block": {
                Friday: "Mild High Club and Panther Modern",
                Saturday: "Reggie Watts and Black Country, New Road",
                Sunday: "Pond, Levitation Room, and Fuzz"
            },
            "The Beach": {
                Friday: "LA Witch and Duster",
                Saturday: "Soul Glo",
                Sunday: "DAKHABRAKHA, Working Men's Club, and Vanishing Twin"
            }
        };
        return (C[stageName] && C[stageName][day]) || "";
    }
}
