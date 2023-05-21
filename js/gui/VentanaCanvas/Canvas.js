/**
 * Caja donde dibujamos con webgl. Comprobamos creacion con exito. Tiene asignado un Renderer que se encargue de dibujar sobre el
 */
class Canvas {

    constructor (nodo) {
        this.nodo = nodo;
        this.controles = new ControlesCanvas(nodo);
    }

}