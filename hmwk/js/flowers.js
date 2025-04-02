const flowersUlRef = document.getElementById("flowers");
const cartUlRef = document.getElementById("cart");
const removeBtnRef = document.getElementById("remove-flower")
const emptyCartRef = document.getElementById("no-flowers")

const flowers = [
    "Rose",
    "Tulip",
    "Daisy",
    "Lily",
];

const cart = [];

function removeFlowerFromCart() {
  cart.shift();
  showCart();
}

removeBtnRef.onclick = removeFlowerFromCart;

function showCart() {
  cartUlRef.innerHTML = "";

  if (cart.length === 0) {
    emptyCartRef.style.display = "block";
  } else {
    emptyCartRef.style.display = "none";
  }

  for (let i = 0; i < cart.length; i++) {
    cartUlRef.innerHTML += "<li>" + cart[i] + "</li>";
  }
}

function addItemToCart(e) {
  cart.push(e.target.dataset.name);
  showCart();
}

for (let i = 0; i < flowers.length; i++) {
  const newLi = document.createElement("li");
  newLi.innerText = flowers[i];

  const newBtn = document.createElement("button");
  newBtn.innerText = "+";
  newBtn.dataset.name = flowers[i];
  newLi.appendChild(newBtn);
  newBtn.onclick = addItemToCart;
  flowersUlRef.appendChild(newLi);
}