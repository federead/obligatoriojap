const container = document.getElementById("container");
const relatedProducts = document.getElementById("relatedProducts");
let productInfo = [];
let productID = localStorage.getItem("prodID");

function showProductInfo() {
    let htmlContentToAppend = "";
    let htmlRelatedProducts = "";
    let relProd = productInfo.relatedProducts;

    htmlContentToAppend += `
        <div class="p-4">
            <h2> ${productInfo.name} </h2>
            <hr>            
            <p>
                <b>Precio </b><br>
                ${productInfo.currency} ${productInfo.cost} <br><br>
                <b>Descripción </b><br>
                ${productInfo.description} <br><br>
                <b>Categoria </b><br>
                ${productInfo.category} <br><br>
                <b>Cantidad vendidos </b><br>
                ${productInfo.soldCount} <br><br>
                <b>Imágenes ilustrativas </b><br>
            </p>
            <div id="contImg">            
            </div><hr>
        </div>        
    `
    container.innerHTML += htmlContentToAppend;
    for (const imgs of productInfo.images) {    //Agrega imagenes al div
        document.getElementById("contImg").innerHTML += `<img src="${imgs}" alt="${productInfo.name}" class="imgDesc border"></img>`;
    }

    //Para el carousel agrego el primer producto relacionado de forma "manual" por la class="active" que tiene que estar solo en el ptimer producto
    if (relProd[0].image) {
        htmlRelatedProducts = `
        <div class="carousel-item active">
            <img src="${relProd[0].image}" class="d-block w-100" alt="${relProd[0].name}">
        </div>`
        relatedProducts.innerHTML += htmlRelatedProducts;

        for (let i = 1; i < relProd.length; i++) {
            htmlRelatedProducts = `
            <div class="carousel-item">
                <img src="${relProd[i].image}" class="d-block w-100" alt="${relProd[1].name}">
            </div>`
            relatedProducts.innerHTML += htmlRelatedProducts;
        }
    }
}

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