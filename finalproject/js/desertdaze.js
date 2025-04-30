function getFestival() {
    let allStages = []; // holds all stages for all days
    let stages = [];    // just the ones for the selected day
    let currentIndex = 0; // this cycles through whichever stages you're currently viewing

    // pull the data from the JSON file (basically our fake API)
    fetch("festivals.json")
        .then(response => {
            // if the file doesn't load or doesn't exist, this catches it
            if (!response.ok) throw new Error("Network error");
            // convert the response to usable JSON data
            return response.json();
        })
        .then(data => {
            // find the specific festival by name (Desert Daze 2022 in this case)
            const festival = data.find(f => f.festival === "Desert Daze 2022");
            if (!festival) {
                document.getElementById("stageName").textContent = "Festival not found";
                return;
            }

            allStages = festival.stages; // store all the stages, regardless of day
            setDay("Friday"); // default to Friday view on page load
            document.querySelector('.dayBtn[data-day="Friday"]').classList.add("active"); // visually highlight Friday tab
            updateFavoriteButtonVisibility(); // show/hide fav btn on load
        });

    // function to show stages just for a specific day
    function setDay(day) {
        stages = allStages
            .map(stage => {
                const dayData = stage.days?.find(d => d.day === day);
                if (!dayData) return null;
                return {
                    name: stage.name,
                    img: dayData.img,
                    day: dayData.day
                };
            })
            .filter(Boolean);

        currentIndex = 0; // reset to the beginning of that day's stages

        // if we got results, show the first one. otherwise show an error msg + placeholder img
        if (stages.length > 0) {
            showStage(currentIndex);
        } else {
            document.getElementById("stageName").textContent = "No stages for " + day;
            document.getElementById("stageImg").src = "img/placeholder.jpg";
        }
    }

    // display the stage name + image at the current index
    function showStage(i) {
        const stage = stages[i];
        document.getElementById("stageName").textContent = stage.name;
        document.getElementById("stageImg").src = stage.img || "img/placeholder.jpg";
    }

    // cycle backward through the list of stages for the current day
    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showStage(currentIndex);
        }
    });

    // cycle forward through the list of stages for the current day
    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex < stages.length - 1) {
            currentIndex++;
            showStage(currentIndex);
        }
    });

    // hook up the Friday/Saturday/Sunday buttons to change the data
    document.querySelectorAll(".dayBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            setDay(btn.getAttribute("data-day"));
        });
    });

    // when the favorite button is clicked
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

    // show or hide the favorite button depending on login status
    function updateFavoriteButtonVisibility() {
        const favoriteBtn = document.getElementById("favoriteBtn");
        if (localStorage.getItem("loggedIn") === "true") {
            favoriteBtn.style.display = "inline-block";
        } else {
            favoriteBtn.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", getFestival);
