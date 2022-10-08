let cartInfo = [];
const cartContainer = document.getElementById("cartInfo");



async function cargarDatos(url) {
    let response = await fetch(url);
    if (response.ok) {
        cartInfo = await response.json();
        console.log(cartInfo)
        
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(CART_INFO_URL + 25801 + ".json");