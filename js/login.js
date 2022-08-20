const userLogin = document.getElementById("user-login");
const passwordLogin = document.getElementById("password-login");
const singInBtn = document.getElementById("sing-in-btn");

function checkLogIn() {
    if (userLogin.value.trim().length > 1 && passwordLogin.value.trim().length > 1){
        window.location = "index.html";
    } else {
        alert ("Los campos no pueden estar vacios");
    }
}

singInBtn.addEventListener("click", () => {
    checkLogIn();
  });