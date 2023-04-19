class Lienzo {

    static contenedores = [];
    static nodo;

    static iniciar () {
        Lienzo.nodo = Lienzo.crearNodo();
        document.querySelector("#frame").appendChild(Lienzo.nodo);
        Lienzo.nodo.addEventListener('click', Lienzo.eliminarFoco, true);
    }

    static crearNodo () {
        let nodo = document.createElement("div");
        nodo.id = "lienzo";
        return nodo;
    }

    static anadirContenedor (contenedor) {
        Lienzo.contenedores.push(contenedor);
        Lienzo.nodo.appendChild(contenedor.nodo);
    }

    //se llama cuando se hace click y comprueba si se pulsa sobre un elemento para seleccionarlo
    static eliminarFoco() {
        let focuseados = document.querySelectorAll(".focus");

        Array.from(focuseados).forEach((elemento) => {
            elemento.classList.remove("focus");
        });
    }

}