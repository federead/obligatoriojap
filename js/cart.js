let cartInfo = [];
const cartTable = document.getElementById("cartProductsInfo");

function loadCartContent() {
    let htmlContentToAppend = "";

    for (const cart of cartInfo) {
        htmlContentToAppend = `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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