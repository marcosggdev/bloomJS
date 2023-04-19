class ControladorLienzo {

    static iniciar () {
        let lienzo = document.getElementById("lienzo");
        lienzo.addEventListener('click', ControladorLienzo.comprobarFoco, true);
        //lienzo.addEventListener('dbclick', ControladorLienzo.traspasarEvento);
    }

    //se llama cuando se hace click y comprueba si se pulsa sobre un elemento para seleccionarlo
    static comprobarFoco (mouseEvent) {
        let lienzo = document.getElementById("lienzo");
        let hijos = lienzo.querySelectorAll(".contenedor");
        let focuseados = document.querySelectorAll(".focus");
        console.log("focus");
        Array.from(focuseados).forEach((elemento) => {
            elemento.classList.remove("focus");
        });
    }

}