let productArray = [];




async function cargarDatos(url) {   //Declaro la funcion para traer los datos 
    let response = await fetch(url);
    if (response.ok) {
      productArray = await response.json(); //asigno los datos deljson al array definido al principio "vacio"
      console.log (productArray.products);
      
    } else {
      alert("HTTP error: " + response.status);
    }
};
cargarDatos(PRODUCTS_URL+"101.json");    //llamo a la función para cargar los datos
