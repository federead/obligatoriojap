const cartTable = document.getElementById("cartProductsInfo");
const envioPremium15 = document.getElementById("premiumEnvio");
const envioExpress7 = document.getElementById("expressEnvio");
const envioStandard5 = document.getElementById("standardEnvio");
const costOfAllProducts = document.getElementById("costOfAllProducts");
const costEnvio = document.getElementById("costEnvio");
const finalPrice = document.getElementById("finalPrice");
const creditCardPay = document.getElementById("creditCardPay");
const transferPay = document.getElementById("transferPay");
const msgPayForm = document.getElementById("msgPayForm");

let cartInfo = JSON.parse(localStorage.getItem("productCart"));

// Función que comprueba la cantidad de articulos y devuelve el subtotal
function precio(unidad, i) {    
    let moneda = cartInfo[i].currency;
    let unitCost = cartInfo[i].unitCost;

    let costoEnUsd = (moneda === "UYU") ? unitCost / 40 : unitCost;
    let resultado = (unidad * costoEnUsd).toFixed(2);

    if (unidad < 1) {
        document.getElementById("subtotal" + i).innerHTML = 0;
    } else {
        document.getElementById("subtotal" + i).innerHTML = resultado;
    }
}

// Carga y muestra los datos desde el Local Storage
function loadCartContent() {    
    let htmlContentToAppend = "";
    cartTable.innerHTML = "";
    for (let i = 0; i < cartInfo.length; i++) {
        let cart = cartInfo[i];        
        htmlContentToAppend = `
        <tr id="row${i}" class="bordeBottom" align="center">
            <td><img src="${cart.image}" class="tdSize" alt="${cart.name}"></td>
            <td>${cart.name}</td>
            <td>${cart.currency} ${cart.unitCost}</td>
            <td>
                <input type="number" id="cantProduct${i}" value="1" min="1" required class="form-control" required style="width:85px;" oninput="precio(this.value, ${i})">
                <div class="invalid-feedback w-auto">
                    La cantidad debe ser al menos 1
                </div>
            </td>
            <td> USD <span id="subtotal${i}"></span></td>
            <td><button onclick="deleteProduct(${i})" type="button" class="fas fa-trash-alt" style="color:red; border:none;"></button></td>
        </tr>`
        cartTable.innerHTML += htmlContentToAppend;
        precio(1, i);
    }
}

// Elimina el producto del carrito
function deleteProduct(i) {    
    cartInfo.splice(i, 1);        
    localStorage.setItem("productCart", JSON.stringify(cartInfo));
    document.getElementById("row"+i).remove();
    loadCartContent();
    calculateCosts();
}

// Modal "Forma de Pago"
document.getElementById("modalPayForm").addEventListener("change", () => {
    const accountNumber = document.getElementById("accountNumber");
    const cardNumber = document.getElementById("cardNumber");
    const secCode = document.getElementById("secCode");
    const expirationDate = document.getElementById("expirationDate");

    if (creditCardPay.checked) {
        msgPayForm.innerHTML = "Tarjeta de crédito";
        accountNumber.disabled = true;
        cardNumber.disabled = false;
        secCode.disabled = false;
        expirationDate.disabled = false;
    } else if (transferPay.checked) {
        msgPayForm.innerHTML = "Transferencia bancaria";
        accountNumber.disabled = false;
        cardNumber.disabled = true;
        secCode.disabled = true;
        expirationDate.disabled = true;
    }
    payFromSelected();
})

function payFromSelected() {
    if (creditCardPay.checked || transferPay.checked) {
        msgPayForm.classList.remove("text-danger");
    } else {
        msgPayForm.classList.add("text-danger");
        msgPayForm.innerHTML = "Selleccione una forma de pago";
    }
}

function calculateCosts() {

    //Suma de todos los productos
    let sumaProducts = 0;
    for (let i = 0; i < cartInfo.length; i++) {
        let subtotalProd = parseFloat(document.getElementById("subtotal" + i).textContent);
        sumaProducts = sumaProducts + subtotalProd;
    }
    costOfAllProducts.innerHTML = "USD " + sumaProducts;

    //Calcula costo de envio
    let sendCost = 0;
    if (envioPremium15.checked) {
        sendCost = (sumaProducts * 0.15);
    } else if (envioExpress7.checked) {
        sendCost = (sumaProducts * 0.07);
    } else {
        sendCost = (sumaProducts * 0.05);
    }
    costEnvio.innerHTML = "USD " + sendCost.toFixed(2);

    //Suma total
    let total = sumaProducts + sendCost;
    finalPrice.innerHTML = "USD " + total.toFixed(2);
}

document.addEventListener("change", () => {
    calculateCosts();
})
loadCartContent();
calculateCosts();

// Esconde la alerta "success" cuando se ejecuta el setTimeout (3,5 segundos)
function alertOff(){
    document.getElementById("soldSuccess").hidden = true;
}

//Función para validación de los campos
(function () {
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                payFromSelected();
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                    document.getElementById("soldSuccess").hidden = false;
                    setTimeout(alertOff, 3500);
                }
                form.classList.add('was-validated')
            }, false)
        })
})()