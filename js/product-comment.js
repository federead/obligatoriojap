const commentCont = document.getElementById("commentContainer");
const btnAddComment = document.getElementById("addComment");
const productRatingComment = document.getElementById("productRating");
const commentText = document.getElementById("commentText");
let comments = [];

function addRating(cantStars) {
    let stars = "";
    for (let i = 0; i < cantStars; i++) {
        stars += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - cantStars; i++) {
        stars += `<span class="fa fa-star"></span>`;
    }
    return stars;
}

function loadComment() {
    let htmlContentToAppend = "";

    for (const comentarios of comments) {
        htmlContentToAppend = `        
        <div class="p-2 card">
            <div>
                <p class="mb-1"><b>${comentarios.user}</b> - <small class="text-muted">${comentarios.dateTime}</small> - ${addRating(comentarios.score)}</p>
                <p class="mb-1">${comentarios.description}</p>  
            </div>              
        </div>        
    `
        commentCont.innerHTML += htmlContentToAppend;
    }
}

function fechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const hora = fecha.getHours();
    const min = fecha.getMinutes();
    const sec = fecha.getSeconds();
    return `${año}-${mes}-${dia} ${hora}:${min}:${sec}`;
}

btnAddComment.addEventListener("click", () => {
    let commentAdd = "";
    if (commentText.value.trim()) {
        commentAdd = `
        <div class="p-2 card">
            <div>
                <p class="mb-1"><b>${sessionStorage.getItem("userName")}</b> - <small class="text-muted">${fechaActual()}</small> - ${addRating(productRatingComment.value)}</p>
                <p class="mb-1">${commentText.value}</p>  
            </div>              
        </div>`
        commentCont.innerHTML += commentAdd;
    } else {
        alert("Ingrese un comentario");
    }
    commentText.value = "";
    productRatingComment.value = "1";
});

async function cargarDatos(url) {
    let response = await fetch(url);
    if (response.ok) {
        comments = await response.json();
        loadComment();        
    } else {
        alert("HTTP error: " + response.status);
    }
};
cargarDatos(PRODUCT_INFO_COMMENTS_URL + productID + ".json");