if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItems = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItems.length; i++) {
    var button = removeCartItems[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var buttonAfterClick = addToCartButtons[i];
    buttonAfterClick.addEventListener("click", addToCartFunction);
  }

  let purchase = document.getElementsByClassName("purchase-btn")[0];

  purchase.addEventListener("click", purchaseAlert);

  
   

  }


 

function purchaseAlert() {
  return alert("Thank you for your purchase.");
}

// function likeFunction (x){
// x.toogle("clicked")
// }

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updatedTotal();
}

function quantityChanged(event) {
  var inputChange = event.target;
  if (inputChange.value <= 0 || isNaN(inputChange.value)) {
    inputChange.value = 1;
  }

  updatedTotal();
}

function addToCartFunction(event) {
  var newButton = event.target;
  var shopItem = newButton.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-img")[0].src;
  addItemToCart(title, price, imageSrc);
  updatedTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItem = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItem.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("you have already added this item to cart.");
      return;
    }
  }

  var cartRowContents = `
       <div class="cart-item cart-column">
            <img  class="cart-item-img" src="${imageSrc}" width="100" height="100" alt="">
            <span class="cart-item-title">${title}</span>
        </div>
            <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class=" cart-input" type = "number" value="1" min="1">
            <button class=" btn btn-danger "   type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItem.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-input")[0]
    .addEventListener("change", quantityChanged);
}

function updatedTotal() {
  var cartContainer = document.getElementsByClassName("cart-items")[0];
  var cartRow = cartContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cartRow.length; i++) {
    var newCartRow = cartRow[i];

    var priceInCart = newCartRow.getElementsByClassName("cart-price")[0];

    var quantityInput = newCartRow.getElementsByClassName("cart-input")[0];
    var price = parseFloat(priceInCart.innerText.replace("$", ""));
    var quantityValue = quantityInput.value;

    total = total + price * quantityValue;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
