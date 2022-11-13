const profileName = document.getElementById("profileName");
const profileName2 = document.getElementById("profileName2");
const profileLastname = document.getElementById("profileLastname");
const profileLastname2 = document.getElementById("profileLastname2");
const profileMail = document.getElementById("profileMail");
const profilePhone = document.getElementById("profilePhone");

// Si no existen los datos de usuario carga el email del LogIn
if (!localStorage.getItem("userProfile")) {
    profileMail.value = localStorage.getItem("userName");
} else {
    let userData = JSON.parse(localStorage.getItem("userProfile"));
    profileName.value = userData.name;    
    profileName2.value = userData.name2;
    profileLastname.value = userData.lastname;
    profileLastname2.value = userData.lastname2;
    profileMail.value = userData.email;
    profilePhone.value = userData.phone;
}

// Guarda en el Local Storage los datos ingresados por el usuario
function saveUserData (){
    let userData = {
        name : profileName.value,
        name2 : profileName2.value,
        lastname : profileLastname.value,
        lastname2 : profileLastname2.value,
        email: profileMail.value,
        phone: profilePhone.value                        
    };
    localStorage.setItem("userProfile", JSON.stringify(userData));
    localStorage.setItem("userName", profileMail.value);
}

// Esconde la alerta "success" cuando se ejecuta el setTimeout (3,5 segundos)
function alertOff(){
    document.getElementById("successUser").hidden = true;
    location.reload();
}

// Función de Bootstrap que chequea los campos obligatorios y si esta todo OK los guarda en el Local Storage
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    saveUserData();
                    event.stopPropagation();
                    event.preventDefault();                    
                    document.getElementById("successUser").hidden = false;
                    setTimeout(alertOff, 3500);
                }

                form.classList.add('was-validated')
            }, false)
        })
})()