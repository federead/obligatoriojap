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

function existOnCart(id){
    let cartArray = JSON.parse(localStorage.getItem("productCart"));  
    return cartArray.includes(id);
}

// Cargando los datos de la API en el Local Storage
function loadCartContentFromAPI(){
    console.log(cartInfoAPI.articles[0].id);
    let cartArray = JSON.parse(localStorage.getItem("productCart"));  
    console.log(cartArray);

    if (!localStorage.getItem("productCart")) {
        let jsonData = [];
        jsonData.push({
            id: cartInfoAPI.articles[0].id,
            name: cartInfoAPI.articles[0].name,            
            unitCost: cartInfoAPI.articles[0].unitCost,
            currency: cartInfoAPI.articles[0].currency,
            image: cartInfoAPI.articles[0].image
          });        
        localStorage.setItem("productCart", JSON.stringify(jsonData));
    }
        else if(existOnCart(cartInfoAPI.articles[0].id)){ 
        console.log("ya esta en el coso");
        
        /*let cartArray = JSON.parse(localStorage.getItem("productCart"));        

        cartArray.push({
            id: productInfo.id,
            name: productInfo.name,            
            unitCost: productInfo.unitCost,
            currency: productInfo.currency,
            image: productInfo.image
          });
        console.log(cartArray);
        localStorage.setItem("productCart", JSON.stringify(cartArray));*/
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