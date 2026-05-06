let cart = JSON.parse(localStorage.getItem('theCart')) || [];

window.updateCartBadge = function(){
    const cartBadge = document.getElementById("cartBadge");
    const countField = document.getElementById("productCount");
    if (cartBadge && countField){
        const totalProducts = cart.length;
        countField.textContent = totalProducts;
    }
}

window.addToCart = function(photo, safeName, safeAlbum, price){
    cart.push({photo: photo, name: safeName, album: safeAlbum, price: Number(price)});
    localStorage.setItem('theCart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

window.deleteFromCart = function(id){
    cart.splice(id, 1);
    localStorage.setItem('theCart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function renderCart(){
    const cartList = document.getElementById("cart");
    const totalField = document.getElementById("total");
    const productCounter = document.getElementById("cartProductCounter");
    updateCartBadge();
    if (!cartList || !totalField) return;
    cartList.innerHTML = "";
    let total = 0;
    productCounter.innerHTML = `<h2>Позиций в корзине: ${cart.length}</h2>`;
    if(cart.length === 0){
        cartList.innerHTML = "<p>Корзина пуста!</p>";
    }
    else{
        cart.forEach((product, id) => {
        total += product.price;
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="cart">
    <div class="product">
        <div class="pic">
            <img src="${product.photo}">
        </div>
        <div class="info">
            <h2>${product.name}</h2>
            <p>${product.album}</p>
            <h2>${product.price} BYN</h2>
        <div class="button" onclick="deleteFromCart(${id})" style="float:right;"><p>Удалить</p></div>
        </div>
    </div>
</div>
            `;
            cartList.appendChild(li);
        });
    }
    totalField.innerText = `Итого: ${total} BYN`;
}


        function confirmOffer(item){
            document.getElementById("confirmOffer").innerHTML=""
            item.preventDefault();
            let name = document.getElementById("name").value
            let phone = document.getElementById("phone").value
            let delivery = document.getElementById("deliveryType").value
            name = document.createElement("p")
            document.getElementById("confirmOffer").append(name)
            phone = document.createElement("p")
            document.getElementById("confirmOffer").append(phone)
            delivery = document.createElement("p")
            document.getElementById("confirmOffer").append(delivery)
        }
        document.getElementById("confirmOrder").addEventListener("click",confirmOffer)

window.addEventListener('DOMContentLoaded', renderCart);