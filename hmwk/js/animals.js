const petTypesUlRef = document.getElementById("pets");
const cartUlRef = document.getElementById("cart");
const noPetsUlRef = document.getElementById("no-pets");
const removeBtnRef = document.getElementById("remove-pet");

const petTypes = [
    "Dog",
    "Cat",
    "Rabbit",
    "Fox"
];

const cart = [];

for(let i = 0; i < petTypes.length; i++) {const newLi = document.createElement("li");
    newLi.innerText = petTypes[i];

    const newBtn = document.createElement("button");
    newBtn.innerText = "+";
    newBtn.dataset.name = petTypes[i];
    newLi.appendChild(newBtn);
    newBtn.onclick = addPetsToCart;
    
    petTypesUlRef.appendChild(newLi);
}


 function showCart() {cartUlRef.innerHTML ="";
    if (cart.length=== 0) {
        document.getElementById("no-pets").style.display = "block";} else {
            document.getElementById("no-pets").style.display = "none";
        }
        for(let i = 0; i < cart.length; i++) {cartUlRef.innerHTML += "<li>" + cart[i] + "</li>"};
    }

    
 

 function addPetsToCart(e) {cart.push(e.target.dataset.name);
    showCart();
}

function removeitemFromCart() {
    cart.pop()
    showCart();
}
removeBtnRef.onclick = removeitemFromCart;

