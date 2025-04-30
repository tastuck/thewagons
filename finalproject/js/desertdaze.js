function getFestival() {
    let allStages = [];
    let stages = [];
    let currentIndex = 0;

    fetch("festivals.json")
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            const festival = data.find(f => f.festival === "Desert Daze 2022");
            if (!festival) {
                document.getElementById("stageName").textContent = "Festival not found";
                return;
            }

            allStages = festival.stages;
            setDay("Friday");
            document.querySelector('.dayBtn[data-day="Friday"]').classList.add("active");
            updateFavoriteButtonVisibility();

            if (localStorage.getItem("loggedIn") === "true") {
                setLoggedInState();
            } else {
                setLoggedOutState();
            }

        });

    function setDay(day) {
        stages = allStages
            .map(stage => {
                const dayData = stage.days?.find(d => d.day === day);
                if (!dayData) return null;
                return {
                    name: stage.name,
                    media: dayData.media || [],
                    day: dayData.day,
                    pictured: getPicturedText(stage.name, dayData.day)
                };
            })
            .filter(Boolean);

        currentIndex = 0;

        if (stages.length > 0) {
            showStage(currentIndex);
        } else {
            document.getElementById("stageName").textContent = "No stages for " + day;
            document.getElementById("stageContainer").innerHTML = "";
        }
    }

    function showStage(i) {
        const stage = stages[i];
        const container = document.getElementById("stageContainer");

        container.innerHTML = `<h2 id="stageName">${stage.name}</h2>`;

        // insert "Pictured: ..." if available
        if (stage.pictured) {
            const desc = document.createElement("p");
            desc.className = "stage-description";
            desc.textContent = `Pictured: ${stage.pictured}`;
            container.appendChild(desc);
        }

        const mediaDiv = document.createElement("div");
        mediaDiv.className = "media-section";

        const images = stage.media.filter(file => !file.endsWith(".mp4"));
        const videos = stage.media.filter(file => file.endsWith(".mp4"));

        const imageRow = document.createElement("div");
        imageRow.className = "media-row";
        images.slice(0, 2).forEach(file => {
            const wrapper = document.createElement("div");
            wrapper.className = "media-box";

            const img = document.createElement("img");
            img.src = file;
            img.alt = stage.name;

            wrapper.appendChild(img);
            imageRow.appendChild(wrapper);
        });
        mediaDiv.appendChild(imageRow);

        const videoRow = document.createElement("div");
        videoRow.className = "media-row";
        videos.slice(0, 2).forEach(file => {
            const wrapper = document.createElement("div");
            wrapper.className = "media-box";

            const video = document.createElement("video");
            video.src = file;
            video.controls = true;
            video.loop = true;
            video.muted = true;

            wrapper.appendChild(video);
            videoRow.appendChild(wrapper);
        });
        mediaDiv.appendChild(videoRow);

        container.appendChild(mediaDiv);
        container.appendChild(document.getElementById("favoriteBtn"));
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showStage(currentIndex);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex < stages.length - 1) {
            currentIndex++;
            showStage(currentIndex);
        }
    });

    document.querySelectorAll(".dayBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            setDay(btn.getAttribute("data-day"));
        });
    });

    document.getElementById("favoriteBtn").addEventListener("click", () => {
        const stageName = document.getElementById("stageName").textContent;

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (!favorites.includes(stageName)) {
            favorites.push(stageName);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(stageName + " added to favorites");
        } else {
            alert(stageName + " is already in your favorites");
        }
    });

    function updateFavoriteButtonVisibility() {
        const favoriteBtn = document.getElementById("favoriteBtn");
        if (localStorage.getItem("loggedIn") === "true") {
            favoriteBtn.style.display = "inline-block";
        } else {
            favoriteBtn.style.display = "none";
        }
    }

    function getPicturedText(stageName, day) {
        const captions = {
            "The Moon": {
                "Friday": "Chicano Batman and King Gizzard",
                "Saturday": "Tame Impala and Kikagaku Moyo",
                "Sunday": "The Marías and Beach House"
            },
            "The Block": {
                "Friday": "Mild High Club and Panther Modern",
                "Saturday": "Reggie Watts and Black Country, New Road",
                "Sunday": "Pond, Levitation Room, and Fuzz"
            },
            "The Beach": {
                "Friday": "LA Witch and Duster",
                "Saturday": "Soul Glo",
                "Sunday": "DAKHABRAKHA, Working Men's Club, and Vanishing Twin"
            }
        };

        return captions[stageName]?.[day] || "";
    }
}

document.addEventListener("DOMContentLoaded", getFestival);

