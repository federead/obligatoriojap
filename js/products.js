let productArray = [];
let catID = localStorage.getItem("catID");

function showProductList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < productArray.products.length; i++) {
        let products = productArray.products[i];
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - U$S ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vedidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("list-product-container").innerHTML = htmlContentToAppend;        
    }
    document.getElementById("title-of-category").innerHTML += productArray.catName; //Añade el titulo de la categoria actual
}


async function cargarDatos(url) {   //Declaro la funcion para traer los datos 
    let response = await fetch(url);
    if (response.ok) {
        productArray = await response.json(); //asigno los datos del json al array definido al principio
        showProductList();

    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(PRODUCTS_URL + catID +".json");    //llamo a la función para cargar los datos
