const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const btnLogOut = document.getElementById("logOut");
let cartInfoAPI = [];

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//UserName en la barra superior
let userName = document.getElementById("userName").innerHTML = localStorage.getItem("userName");

btnLogOut.addEventListener("click", () => {
  localStorage.removeItem("userName");
  window.location="login.html";
});

// Función que comprueba si existe un determinado elemento en el carrito (Local Storage)
function existOnCart(id) {
  let cartArray = JSON.parse(localStorage.getItem("productCart"));
  for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].id === id) {
          return true;
      }
  }
}

// Cargando los datos de la API en el Local Storage
function loadCartContentFromAPI() {
  let cartArray = JSON.parse(localStorage.getItem("productCart"));  
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
  else if (!existOnCart(cartInfoAPI.articles[0].id)) {
      cartArray.push({
          id: cartInfoAPI.articles[0].id,
          name: cartInfoAPI.articles[0].name,
          unitCost: cartInfoAPI.articles[0].unitCost,
          currency: cartInfoAPI.articles[0].currency,
          image: cartInfoAPI.articles[0].image
      });
      localStorage.setItem("productCart", JSON.stringify(cartArray));
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
