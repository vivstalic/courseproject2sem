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

document.addEventListener('DOMContentLoaded', () =>{
    const deliveryTypePost = document.getElementById('deliveryType-post');
    const deliveryTypeCourier = document.getElementById('deliveryType-courier');
    const addressType = document.getElementById('addressType');
    const paymentTypeCash = document.getElementById('paymentType-cash');
    const paymentTypeErip = document.getElementById('paymentType-erip');
    function formUpdates(){
        if(deliveryTypeCourier.checked){
            addressType.innerText = "Домашний адрес: ";
            paymentTypeCash.disabled = true;
            if(paymentTypeCash.checked){
                paymentTypeErip.checked = true;
            }}
            else {
                addressType.innerText = "Адрес ближайшего отделения Европочты: ";
                paymentTypeCash.disabled = false;
            }
        }
        deliveryTypePost.addEventListener('change', formUpdates);
        deliveryTypeCourier.addEventListener('change', formUpdates);
        formUpdates();
    
})

window.addEventListener('DOMContentLoaded', renderCart);