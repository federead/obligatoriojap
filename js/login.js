const userLogin = document.getElementById("user-login");

//Funci{on de Bootstrap que valida el login y redirige a index si todo esta ok
(function () {
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {                
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.stopPropagation();
                    event.preventDefault();
                    localStorage.setItem("userName", userLogin.value);
                    location.assign("index.html");
                }
                form.classList.add('was-validated')
            }, false)
        })
})()