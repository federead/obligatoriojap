const userLogin = document.getElementById("user-login");
const passwordLogin = document.getElementById("password-login");
const singInBtn = document.getElementById("sing-in-btn");

/*function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
}*/

function checkLogIn() {
    if (userLogin.value.trim().length > 0 && passwordLogin.value.trim().length > 0){
        localStorage.setItem("userName", userLogin.value);
        window.location = "index.html";        
    } else {
        alert ("Los campos no pueden estar vacios");
    }
}

singInBtn.addEventListener("click", () => {
    checkLogIn();
  });