/**
 * Interfaz que se dibuja sobre el canvas. Actuara de contenedor de otros elementos de interfaz y controlara dichos elementos
 * */
class InterfazCanvas {

    constructor () {
        this.nodo = this.crearNodo();
    }

    crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "InterfazCanvas";
        return nodo;
    }

}