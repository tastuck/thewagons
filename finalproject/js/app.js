// Reference variables
const loginFormRef = document.querySelector("#login");
const usernameRef = document.querySelector("#logout");
const passwordRef = document.querySelector("a[href=\"favorite.html\"]");
const favoriteButtonsRef = document.querySelector(".favorite-btn");

//logged in state to meet localStorage requirement
function setLoggedInState() {
    loginForm.style.display = "none";
    logoutBtn.style.display = "block";
    myFavoritesLink.style.display = "block";
    favoriteButtons.forEach(btn => btn.style.display = "inline-block");
    localStorage.setItem("loggedIn", "true");
}
//set logged out state, no favorites button, profile drop down only shows log in form.
function setLoggedOutState() {
    loginForm.style.display = "block";
    logoutBtn.style.display = "none";
    myFavoritesLink.style.display = "none";
    favoriteButtons.forEach(btn => btn.style.display = "none");
    localStorage.setItem("loggedIn", "false");
}

// if local storage logged in = true, set state as logged
//in. if not, set as logged out state.
if (localStorage.getItem("loggedIn") === "true") {
    setLoggedInState();
} else {
    setLoggedOutState();

    console.log(localStorage.getItem("loggedIn"));
}

// log in on submit form, log out on click log out. sets the states
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setLoggedInState();
});

// Handle logout
logoutBtn.addEventListener("click", function () {
    setLoggedOutState();
});


