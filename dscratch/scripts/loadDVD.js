function loadDVD() {
    const req = new XMLHttpRequest;
    req.open("GET", "data/dataDVD.xml", false);
    try {
        req.send();
        if(req.status == 200){
            const xmlDoc = req.responseXML;

        const products = xmlDoc.getElementsByTagName("product");
        let htmlContent = "";
        for (let product of products) {
            const genre = product.getElementsByTagName("genre")[0].textContent;
            const name = product.getElementsByTagName("name")[0].textContent;
            const price = product.getElementsByTagName("price")[0].textContent;
            const photo = product.getElementsByTagName("poster")[0].getAttribute("photo");
            const safeName = name.replace(/'/g, "\\'");
 htmlContent += `
                <div class="product">
                    <img src="${photo}" alt="${name}">
                    <h3>${safeName}</h3>
                    <p>Жанр: ${genre}</p>
                    <h3>${price} BYN</h3>
                <div class="button" onclick="addToCart('${photo}', '${safeName}', '${genre}', ${price})"><p>В корзину</p></div>
                </div>
            `;
        }
        document.getElementById("catalog").innerHTML = htmlContent;
    } 
}
catch (error) {
        console.error("Ошибка загрузки XML:", error);
    }
}
loadDVD();