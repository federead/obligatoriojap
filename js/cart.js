let cartInfo = [];
const cartTable = document.getElementById("cartProductsInfo");

function precio(unidad, costUnitario, i){
    let resultado = unidad*costUnitario;  
    if(resultado<0){
        document.getElementById("cantProduct"+i).classList.add("is-invalid");     

    } else {
        document.getElementById("subtotal").innerHTML = resultado;
    }
}

function loadCartContent() {
    let htmlContentToAppend = "";    

    for (let i = 0; i < cartInfo.articles.length; i++) {        

        let cart = cartInfo.articles[i];
        htmlContentToAppend = `
        <tr class="bordeBottom" align="center">
            <td><img src="${cart.image}" style="width:75%;" alt="${cart.name}"></td>
            <td>${cart.name}</td>
            <td>${cart.currency} ${cart.unitCost}</td>
            <td><input id="cantProduct${i}" min="0" class="form-control" style="width:50px;" oninput="precio(this.value,${cart.unitCost},${i})"></td>
            <td>${cart.currency} <span id="subtotal"></span></td>
            <td></td>
        </tr>`
        cartTable.innerHTML += htmlContentToAppend;        
    }
}


async function cargarDatos(url) {
    let response = await fetch(url);
    if (response.ok) {
        cartInfo = await response.json();
        loadCartContent();        
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(CART_INFO_URL + 25801 + ".json");