let cartInfo = [];
const cartTable = document.getElementById("cartProductsInfo");

function precio(unidad, costUnitario){
    document.getElementById("subtotal").innerHTML = unidad*costUnitario;
}

function loadCartContent() {
    let htmlContentToAppend = "";    

    for (let i = 0; i < cartInfo.articles.length; i++) {        

        let cart = cartInfo.articles[i];
        htmlContentToAppend = `
        <tr align="center">
            <td><img src="${cart.image}" style="width:75%;" alt="${cart.name}"></td>
            <td>${cart.name}</td>
            <td>${cart.currency} ${cart.unitCost}</td>
            <td><input id="cantProduct${i}" oninput="precio(${this.value},${cart.unitCost})"></td>
            <td id="subtotal"></td>
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