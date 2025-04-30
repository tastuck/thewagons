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




