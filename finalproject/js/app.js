console.log("is app running?")

// Reference variables
const loginFormRef = document.querySelector("#login");
const logoutBtnRef = document.querySelector("#logout");
const favoriteLinkRef = document.querySelector("a[href=\"favorite.html\"]");
const favoriteBtnRef = document.querySelectorAll(".favorite-btn, .favoriteButton");

//set logged in state to meet localStorage requirement
function setLoggedInState() {
    //no log in form if already logged in
    loginFormRef.style.display = "none";
    logoutBtnRef.style.display = "block";
    favoriteLinkRef.style.display = "block";
    favoriteBtnRef.forEach(btn => btn.style.display = "inline-block");
    //localStorage.setItem("loggedIn", "true");

    document.querySelectorAll("button").forEach(btn =>
    {
        if (btn.textContent.trim().toLowerCase() === "favorite") {
        btn.style.display = "inline-block";
    }
});

        localStorage.setItem("loggedIn", "true");

}

const flashMessage = localStorage.getItem("flashMessage");
if (flashMessage) {
    alert(flashMessage);
    localStorage.removeItem("flashMessage");
}

//set logged out state, no favorites button, profile drop down only shows log in form.
function setLoggedOutState() {
    //log in form since not logged in
    loginFormRef.style.display = "block";
    logoutBtnRef.style.display = "none";
    favoriteLinkRef.style.display = "none";
    favoriteBtnRef.forEach(btn => btn.style.display = "none");
    //localStorage.setItem("loggedIn", "false");
    //hide any button with text matching favorite when logged out. cant
    //have favorites if you're not logged in logically
    document.querySelectorAll("button").forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === "favorite") {
            btn.style.display = "none";

        }
    });
    localStorage.setItem("loggedIn", "false");
}

// if local storage logged in = true, set state as logged
//in. if not, set as logged out state.
if (localStorage.getItem("loggedIn") === "true") {
    //e.preventDefault();
    setLoggedInState();
} else {
    setLoggedOutState();
}

// log in on submit form, log out on click log out. sets the states
loginFormRef.addEventListener("submit", function (e) {
    e.preventDefault();
    setLoggedInState();
    localStorage.setItem("flashMessage", "Successfully logged in!");
    //resets, if logged out but no reset logout will be in the login form
    location.reload();
});

// Handle logout
logoutBtnRef.addEventListener("click", function () {
    setLoggedOutState();
    window.location.href = "index.html"; // send user back to index
});




function showFavorites() {
  let favoritesBox = document.getElementById("favoritesDisplay");
  if(!favoritesBox) return null;
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
