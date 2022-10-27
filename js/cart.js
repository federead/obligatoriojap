const cartTable = document.getElementById("cartProductsInfo");
const envioPremium15 = document.getElementById("premiumEnvio");
const envioExpress7 = document.getElementById("expressEnvio");
const envioStandard5 = document.getElementById("standardEnvio");
const costOfAllProducts = document.getElementById("costOfAllProducts");
const costEnvio = document.getElementById("costEnvio");
const finalPrice = document.getElementById("finalPrice");

// Función que comprueba la cantidad de articulos y devuelve el subtotal
function precio(unidad, i) {
    let cartInfo = JSON.parse(localStorage.getItem("productCart"));
    let moneda = cartInfo[i].currency;
    let unitCost = cartInfo[i].unitCost;

    let costoEnUsd = (moneda === "UYU") ? unitCost/40 : unitCost;    
    let resultado = (unidad * costoEnUsd).toFixed(2);

    if (unidad<1) {        
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

function calculateCosts() {
    
    //Suma de todos los productos
    let cartInfo = JSON.parse(localStorage.getItem("productCart"));
    let sumaProducts = 0;
    for(let i=0; i<cartInfo.length; i++){
        let subtotalProd = parseFloat(document.getElementById("subtotal"+i).textContent);
        sumaProducts = sumaProducts + subtotalProd;      
    }    
    costOfAllProducts.innerHTML = "USD " + sumaProducts;

    //Calcula costo de envio
    let sendCost = 0;
    if(envioPremium15.checked) {
        sendCost = (sumaProducts*0.15);        
    } else if (envioExpress7.checked) {
        sendCost = (sumaProducts*0.07);
    } else {        
        sendCost = (sumaProducts*0.05);
    }
    costEnvio.innerHTML = "USD " + sendCost.toFixed(2);
    
    //Suma total
    let total = sumaProducts + sendCost;    
    finalPrice.innerHTML = "USD " + total.toFixed(2);
}

document.addEventListener("change", ()=> {
    calculateCosts();    
})

loadCartContent();
calculateCosts();