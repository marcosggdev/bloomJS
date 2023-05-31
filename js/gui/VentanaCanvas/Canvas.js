/**
 * Caja donde dibujamos con webgl. Comprobamos creacion con exito. Tiene asignado un Renderer que se encargue de dibujar sobre el
 */
class Canvas {

    constructor (nodo, controles) {
        this.nodo = nodo;
        this.controles = controles;
        if (controles != null) {
            controles.iniciar(nodo);
        }
    }

}