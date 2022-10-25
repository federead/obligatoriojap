const productDetails = document.getElementById("productDetails");
const relatedProducts = document.getElementById("relatedProducts");
const productName = document.getElementById("productName");
const buyBtn = document.getElementById("buyProduct");
let productInfo = [];
let productID = localStorage.getItem("prodID");

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductInfo() {
    let htmlContentToAppend = "";
    let htmlRelatedProducts = "";
    let relProd = productInfo.relatedProducts;

    productName.innerHTML = productInfo.name;

    htmlContentToAppend += `       
        <b>Precio </b><br>
        ${productInfo.currency} ${productInfo.cost} <br><br>
        <b>Descripción </b><br>
        ${productInfo.description} <br><br>
        <b>Categoria </b><br>
        ${productInfo.category} <br><br>
        <b>Cantidad vendidos </b><br>
        ${productInfo.soldCount} <br><br>
        <b>Imágenes ilustrativas </b><br>
    `
    productDetails.innerHTML += htmlContentToAppend;

    for (const imgs of productInfo.images) {    //Agrega imagenes del producto al div
        document.getElementById("contImg").innerHTML += `<img src="${imgs}" alt="${productInfo.name}" class="imgDesc border"></img>`;
    }

    //Para el carousel agrego el primer producto relacionado de forma "manual" por la class="active" que tiene que estar solo en el ptimer producto
    if (relProd[0].image) {
        htmlRelatedProducts = `
        <div class="carousel-item active cursor-active" onclick="setProdID(${relProd[0].id})">
            <img src="${relProd[0].image}" class="d-block w-100" alt="${relProd[0].name}">
            <p class="text-center h4">${relProd[0].name}</p>
        </div>`
        relatedProducts.innerHTML += htmlRelatedProducts;

        for (let i = 1; i < relProd.length; i++) {
            htmlRelatedProducts = `
            <div class="carousel-item cursor-active" onclick="setProdID(${relProd[i].id})">
                <img src="${relProd[i].image}" class="d-block w-100" alt="${relProd[i].name}">
                <p class="text-center h4">${relProd[i].name}</p>
            </div>`
            relatedProducts.innerHTML += htmlRelatedProducts;
        }
    }
}


//Agregar producto al local storage para el carrito

buyBtn.addEventListener("click", function () {    
    if (!localStorage.getItem("productCart")) {
        let jsonData = [];
        jsonData.push({
            id: productInfo.id,
            name: productInfo.name,            
            unitCost: productInfo.cost,
            currency: productInfo.currency,
            image: productInfo.images[0]
          });
        console.log(jsonData);
        localStorage.setItem("productCart", JSON.stringify(jsonData));
    } else {
        let cartArray = JSON.parse(localStorage.getItem("productCart"));
        cartArray.push({
            id: productInfo.id,
            name: productInfo.name,            
            unitCost: productInfo.cost,
            currency: productInfo.currency,
            image: productInfo.images[0]
          });
        console.log(cartArray);
        localStorage.setItem("productCart", JSON.stringify(cartArray));
    }   
}
)

async function cargarDatos(url) {
    let response = await fetch(url);
    if (response.ok) {
        productInfo = await response.json();
        showProductInfo();
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(PRODUCT_INFO_URL + productID + ".json");