// Reference variables
const loginFormRef = document.querySelector("#login");
const usernameRef = document.querySelector("#username");
const passwordRef = document.querySelector("#password");

const contentRef = document.querySelector("#content");
const logoutRef = document.querySelector("#logout");

let activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");

function loginUser(e) {
    e.preventDefault();
    const usernameValue = usernameRef.value;
    const passwordValue = passwordRef.value;


    const users = JSON.parse(localStorage.getItem("users") || "[]");

    let userFound = false;
    let correctPassword = false;

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (
            currentUser.username === usernameValue) {
            userFound = true;

            if (currentUser.password === passwordValue) {
                correctPassword = true;
            }
        }
    }

    //you are not on the list
    if (userFound === false) {
    //make user
        users.push({username: usernameValue, password: passwordValue});
        localStorage.setItem("users", JSON.stringify(users));
        alert("New User");

        activeUser = { username: usernameValue};
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }
    //you put the wrong password
    else if (correctPassword === false) {
        alert("Incorrect Password");
    }
    //you are logged in
    else {
        alert("You are logged in");

        activeUser = { username: usernameValue};
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }

    toggleLogin();
    
}

function toggleLogin() {
    if (!activeUser.username) {
        loginFormRef.style.display = "block";
        contentRef.style.display = "none";
    } else {
        loginFormRef.style.display = "none";
        contentRef.style.display = "block";
    }
}

function logoutUser() {
    localStorage.removeItem("activeUser");
    activeUser = {};

    toggleLogin();
}
loginFormRef.onsubmit = loginUser;
logoutRef.onclick = logoutUser;
toggleLogin();
