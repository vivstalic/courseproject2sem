function loadCD() {
    const req = new XMLHttpRequest;
    req.open("GET", "data/dataCD.xml", false);
    try {
        req.send();
        if(req.status == 200){
            const xmlDoc = req.responseXML;
            const products = xmlDoc.getElementsByTagName("product");
            let htmlContent = "";
        for (let product of products) {
            const name = product.getElementsByTagName("name")[0].textContent;
            const album = product.getElementsByTagName("album")[0].textContent;
            const price = product.getElementsByTagName("price")[0].textContent;
            const photo = product.getElementsByTagName("artist")[0].getAttribute("photo");
            const safeName = name.replace(/'/g, "\\'");
            const safeAlbum = album.replace(/'/g, "\\'");
            htmlContent += `
                <div class="product">
                    <img src="${photo}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${album}</p>
                    <h3>${price} BYN</h3>
                <div class="button" onclick="addToCart('${photo}', '${safeName}', '${safeAlbum}', ${price})"><p>В корзину</p></div>
                </div>
            `;
        }
        document.getElementById("catalog").innerHTML = htmlContent;
    }
    } catch (error) {
        console.error("Ошибка загрузки XML:", error);
    }
}
loadCD();