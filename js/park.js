const ticketUlRef = document.getElementById("tickets");
const cartUlRef = document.getElementById("cart");
const noTicketsRef = document.getElementById("no-ticket");
const removeBtnRef = document.getElementById("remove-ticket");


const ticketTypes = [
    "Senior",
    "Adult",
    "Child",
    "Student"
];
const cart = [];

console.log("cart", cart);
console.log("cart length", cart.length);

function showCart() {
    cartUlRef.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        cartUlRef.innerHTML += "<li>" + cart[i] + "</li>";
    }
}

function addTicketToCart(e) {
    cart.push(e.target.dataset.name);
    showCart();


}

for (let i = 0; i < ticketTypes.length; i++) {
    const newLi = document.createElement("li");
    newLi.innerText = ticketTypes[i];

    const newBtn = document.createElement("button");
    newBtn.innerText = "+";
    newBtn.dataset.name = ticketTypes[i];
    newBtn.onclick = addTicketToCart;
    newLi.appendChild(newBtn);

    

    ticketUlRef.appendChild(newLi);
}

function removeItemFromCart() {
    cart.pop();

    showCart();
}

removeBtnRef.onclick = removeItemFromCart;



console.log(ticketUlRef.length, cartUlRef.length, cart.length)

    // logic for no tickets paragraph
if (cart.length = 0) {
    document.getElementById("no-ticket").style.display = "none";
    
    } else {
    document.getElementById("no-ticket").style.display = "block";
}