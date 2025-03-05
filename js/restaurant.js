const menuUlRef = document.getElementById("menu");
const cartUlRef = document.getElementById("cart");
const noItemsUlRef = document.getElementById("no-items");
const removeButtonUlRef = document.getElementById("remove-item");

const menuItems = ["Hamburger", "Cheeseburger", "Fries", "Onion Rings"];
let cartItems = [];

function updateCartUI() {
    cartUlRef.innerHTML = "";
    for (let i = 0; i < cartItems.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = cartItems[i];
        cartUlRef.appendChild(listItem);
    }
    if (cartItems.length === 0) {
        noItemsUlRef.style.display = "block";
    } else {
        noItemsUlRef.style.display = "none";
    }
}

for (let i = 0; i < menuItems.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = menuItems[i];

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.setAttribute("data-item", menuItems[i]);

    addButton.addEventListener("click", function () {
        cartItems[cartItems.length] = menuItems[i];
        updateCartUI();
    });

    listItem.appendChild(addButton);
    menuUlRef.appendChild(listItem);
}

removeButtonUlRef.addEventListener("click", function () {
    if (cartItems.length > 0) {
        cartItems.length = cartItems.length - 1;
        updateCartUI();
    }
});

updateCartUI();


