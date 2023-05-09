//controla el menu de inicio de sesion del header de las paginas en general
window.addEventListener("load", () => {
    let iniciarSesion = document.getElementById("iniciarSesion");
    iniciarSesion.addEventListener("click", () => {
        window.location.assign("/bloomJS/php/Login.php");
    });
});