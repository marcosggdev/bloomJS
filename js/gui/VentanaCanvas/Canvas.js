/**
 * Caja donde dibujamos con webgl. Comprobamos creacion con exito. Tiene asignado un Renderer que se encargue de dibujar sobre el
 */
class Canvas {

    constructor (ventanaCanvas, renderer, nodo) {
        this.nodo = nodo;
        this.controles = new ControlesCanvas(ventanaCanvas, renderer, nodo);
    }

}