const container = document.getElementById("container");
let productInfo = [];
let productID = localStorage.getItem("prodID");

function showProductInfo() {
    let htmlContentToAppend = "";

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