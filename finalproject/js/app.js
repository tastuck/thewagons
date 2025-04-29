console.log("is app running?")



// Reference variables
const loginFormRef = document.querySelector("#login");
const logoutBtnRef = document.querySelector("#logout");
const favoriteLinkRef = document.querySelector("a[href=\"favorite.html\"]");
const favoriteBtnRef = document.querySelector(".favorite-btn");

//logged in state to meet localStorage requirement
function setLoggedInState() {
    //no log in form if already logged in
    loginFormRef.style.display = "none";
    logoutBtnRef.style.display = "block";
    favoriteLinkRef.style.display = "block";
    favoriteBtnRef.forEach(btn => btn.style.display = "inline-block");
    localStorage.setItem("loggedIn", "true");
}
//set logged out state, no favorites button, profile drop down only shows log in form.
function setLoggedOutState() {
    //log in form since not logged in
    loginFormRef.style.display = "block";
    logoutBtnRef.style.display = "none";
    favoriteLinkRef.style.display = "none";
    favoriteBtnRef.forEach(btn => btn.style.display = "none");
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
loginFormRef.addEventListener("submit", function (e) {
    e.preventDefault();
    setLoggedInState();
});

// Handle logout
logoutBtnRef.addEventListener("click", function () {
    setLoggedOutState();
});


