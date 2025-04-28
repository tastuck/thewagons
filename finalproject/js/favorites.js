function showFavorites() {
  let favoritesBox = document.getElementById("favoritesDisplay");
  let savedFavorites = localStorage.getItem("favorites");

  console.log("favoritesBox:", favoritesBox);
  console.log("savedFavorites:", savedFavorites);

  if (!savedFavorites || savedFavorites === '[]') {
    favoritesBox.innerHTML = "<p>You have not added any favorites</p>";
    return;
  }

  let favoritesList = JSON.parse(savedFavorites);
  favoritesBox.innerHTML = "";

  for (let i = 0; i < favoritesList.length; i++) {
    let oneFavorite = favoritesList[i];

    let favoriteCard = document.createElement("div");
    favoriteCard.className = "favoriteCard";

    let favoriteImage = document.createElement("img");
    favoriteImage.src = oneFavorite.stageImg;
    favoriteCard.appendChild(favoriteImage);

    let stageName = document.createElement("h3");
    stageName.textContent = oneFavorite.stageName;
    favoriteCard.appendChild(stageName);

    let festivalName = document.createElement("p");
    festivalName.textContent = oneFavorite.festivalName;
    favoriteCard.appendChild(festivalName);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.onclick = function () {
      let currentFavorites = JSON.parse(localStorage.getItem("favorites"));

      let newFavoritesList = [];

      for (let j = 0; j < currentFavorites.length; j++) {
        if (currentFavorites[j].stageName !== oneFavorite.stageName) {
          newFavoritesList.push(currentFavorites[j]);
        }
      }

      localStorage.setItem("favorites", JSON.stringify(newFavoritesList));
      showFavorites();
    };

    favoriteCard.appendChild(removeButton);
    favoritesBox.appendChild(favoriteCard);
  }
}

window.onload = showFavorites;
