class Lienzo {

    static contenedores = [];
    static nodo;

    static iniciar () {
        Lienzo.nodo = Lienzo.crearNodo();
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

}