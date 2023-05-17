class BotonImagen {

    constructor (ruta, callback) {
        this.ruta = ruta;
        this.callback = callback;
        this.nodo = this.crearNodo(ruta, callback);
    }

    crearNodo (ruta, callback) {
        let nodo = document.createElement("img");
        nodo.className = "BotonImagen";
        nodo.src = ruta;
        nodo.addEventListener("click", callback);
        return nodo;
    }

}