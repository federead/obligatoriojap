const cartTable = document.getElementById("cartProductsInfo");
const envioPremium15 = document.getElementById("premiumEnvio");
const envioExpress7 = document.getElementById("expressEnvio");
const envioStandard5 = document.getElementById("standardEnvio");

// Función que comprueba la cantidad de articulos y devuelve el subtotal
function precio(unidad, i) {
    let cartInfo = JSON.parse(localStorage.getItem("productCart"));
    let moneda = cartInfo[i].currency;
    let unitCost = cartInfo[i].unitCost;
    
    console.log("el tipo de moneda es: " + moneda, typeof moneda);
    console.log((moneda === "UYU") ? unitCost/40 : unitCost, moneda);

    let costoEnUsd = (moneda === "UYU") ? unitCost/40 : unitCost;    
    let resultado = unidad * costoEnUsd;     

    if (resultado < 0) {        
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
            <td><input type="number" id="cantProduct${i}" value="1" min="1" required class="form-control" style="width:63px;" oninput="precio(this.value, ${i})"></td>
            <td> USD <span id="subtotal${i}"></span></td>
            <td></td>
        </tr>`
        cartTable.innerHTML += htmlContentToAppend;
        precio(1, i);
    }    
}

function calculateGeneralSubtotal() {
    let cartInfo = JSON.parse(localStorage.getItem("productCart"));
    let finalPrice = 0;
    for(let i=0; i<cartInfo.length; i++){
        let subtotalProd = parseInt(document.getElementById("subtotal"+i).textContent);
        finalPrice = finalPrice + subtotalProd;      
    }
    console.log("total de toda la compra: " + finalPrice);
    return finalPrice;
}

loadCartContent();
calculateGeneralSubtotal();
/*envioPremium15.addEventListener("click", ()=> {
    suma total x 15%
});*/