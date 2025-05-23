function getFestival() {
  fetch("festivals.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then((data) => {
      const festival = data.find((f) => f.festival === "Coachella 2017");

      if (!festival) {
        document.getElementById("stagesDisplay").textContent =
          "Festival not found";
        return;
      }

const stagesContainer = document.getElementById("stagesDisplay");

for (let i = 0; i < festival.stages.length; i++) {
const stage = festival.stages[i];

const stageCard = document.createElement("div");
  stageCard.className = "stageCards";

    if (stage.img && stage.img !== "image here") {
const stageImg = document.createElement("img");
    stageImg.src = stage.img;
    stageCard.appendChild(stageImg);
    }

const stageName = document.createElement("h3");
  stageName.textContent = stage.name;
  stageCard.appendChild(stageName);

const favoriteBtn = document.createElement("button");
    favoriteBtn.textContent = "Favorite";
    favoriteBtn.className = "favoriteButton";
    favoriteBtn.addEventListener("click", () => {

const favorite = {
    festivalName: "Coachella 2017",
    stageName: stage.name,
    stageImg: stage.img,
      };

let savedFavorites = localStorage.getItem("favorites");

  let favorites = [];

    if (savedFavorites !== null) {
    favorites = JSON.parse(savedFavorites);
    }

    if (favoriteBtn.textContent === "Favorite") {
    favoriteBtn.textContent = "Unfavorite";
    favorites.push(favorite);

      } else {
      favoriteBtn.textContent = "Favorite";
            
    let newFavorites = [];
      for (let j = 0; j < favorites.length; j++) {
        if (favorites[j].stageName !== stage.name) {
          newFavorites.push(favorites[j]);
        }
      }
    favorites = newFavorites;
  }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    });
      stageCard.appendChild(favoriteBtn);

      stagesContainer.appendChild(stageCard);
    }
  })

  .catch((error) => {
      console.error("Error:", error);
    });
}

getFestival();
