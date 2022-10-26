const cartTable = document.getElementById("cartProductsInfo");

// Función que comprueba la cantidad de articulos y devuelve el subtotal
function precio(unidad, costUnitario, i) {
    let resultado = unidad * costUnitario;
    if (resultado < 1) {
        document.getElementById("cantProduct" + i).classList.add("invalidInput");

    } else {
        document.getElementById("cantProduct" + i).classList.remove("invalidInput");
        document.getElementById("subtotal" + i).innerHTML = resultado;
    }
}


// Carga y muestra los datos desde el Local Storage
function loadCartContent() {
    let cartInfo = JSON.parse(localStorage.getItem("productCart"));
    let htmlContentToAppend = "";
    for (let i = 0; i < cartInfo.length; i++) {
        let cart = cartInfo[i];
        htmlContentToAppend = `
        <tr class="bordeBottom" align="center">
            <td><img src="${cart.image}" class="tdSize" alt="${cart.name}"></td>
            <td>${cart.name}</td>
            <td>${cart.currency} ${cart.unitCost}</td>
            <td><input id="cantProduct${i}" min="0" class="form-control" style="width:50px;" oninput="precio(this.value,${cart.unitCost},${i})"></td>
            <td>${cart.currency} <span id="subtotal${i}"></span></td>
            <td></td>
        </tr>`
        cartTable.innerHTML += htmlContentToAppend;
    }
}

loadCartContent();