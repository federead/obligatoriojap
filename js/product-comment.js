const commentCont = document.getElementById("commentContainer");
let comments = [];

function loadComment() {
    let htmlContentToAppend = "";
    commentCont.innerHTML += `<div class="p-4"><h2>Comentrios</h2></div>`;
    
    for (const comentarios of comments) {
        htmlContentToAppend = `        
        <div class="p-4 card">
            <div>
                <h4 class="mb-1"><b>${comentarios.user}</b> - <small class="text-muted">${comentarios.dateTime}</small></h4>                
                <p class="mb-1">${comentarios.description}</p>  
            </div>              
        </div>        
    `
        commentCont.innerHTML += htmlContentToAppend;
    }
}


async function cargarDatos(url) {
    let response = await fetch(url);
    if (response.ok) {
        comments = await response.json();
        loadComment();
        console.log(comments)
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(PRODUCT_INFO_COMMENTS_URL + productID + ".json");