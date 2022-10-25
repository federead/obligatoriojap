let cartInfo = [];
let cartInfoAPI = [];
const cartTable = document.getElementById("cartProductsInfo");

function precio(unidad, costUnitario, i){
    let resultado = unidad*costUnitario;  
    if(resultado<1){
        document.getElementById("cantProduct"+i).classList.add("invalidInput");        

    } else {
        document.getElementById("cantProduct"+i).classList.remove("invalidInput");
        document.getElementById("subtotal"+i).innerHTML = resultado;
    }
}

// -- CARGANDO LOS DATOS DEL CART DESDE LA API --
function loadCartContentFromAPI(){
    
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
            <td>${cart.currency} <span id="subtotal${i}"></span></td>
            <td></td>
        </tr>`
        cartTable.innerHTML += htmlContentToAppend;        
    }
}


async function cargarDatosFromAPI(url) {
    let response = await fetch(url);
    if (response.ok) {
        cartInfoAPI = await response.json();
        loadCartContentFromAPI();        
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatosFromAPI(CART_INFO_URL + 25801 + ".json");