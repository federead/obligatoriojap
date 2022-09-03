const ORDER_LOW_PRICE = "MenorPrecio";
const ORDER_HIGH_PRICE = "MayorPrecio";
const ORDER_BY_SOLD = "Relevancia";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let productArray = [];
let catID = localStorage.getItem("catID");

//Ordena las categorias según el criterio de precio seleccionado o relevancia
function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_LOW_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_HIGH_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function showProductList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productArray.products.length; i++) {
        let products = productArray.products[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vedidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById("list-product-container").innerHTML = htmlContentToAppend;
        }
        /* else { 
            alert("No hay articulos que cumplan con los filtros aplicados");
        } */
    }
    document.getElementById("title-of-category").innerHTML = "Viendo la categoría: " + productArray.catName; //Añade el titulo de la categoria actual
}


function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productArray.products = categoriesArray;
    }
    productArray.products = sortCategories(currentSortCriteria, productArray.products);

    showProductList(); //Muestro los productos ordenados según el criterio seleccionado
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
cargarDatos(PRODUCTS_URL + catID + ".json");    //llamo a la función para cargar los datos

//ORDENAR POR PRECIO O RELEVANCIA
document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_LOW_PRICE);    
});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_HIGH_PRICE);
});

document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_SOLD);
});

//FILTRAR POR PRECIO
document.getElementById("clearRangeFilter").addEventListener("click", function () { //Limpia los campos minimo y maximo
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductList();
});
document.getElementById("rangeFilterCount").addEventListener("click", function () { //Minimo y maximo para filtrar
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }

    showProductList();
});