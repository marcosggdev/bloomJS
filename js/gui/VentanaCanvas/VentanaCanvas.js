/**
 * Contenedor de barra ventana, menu interfaz, gui y canvas. Ventana principal de la aplicación
 */
class VentanaCanvas {

    constructor (barraVentana, menuInterfaz, interfazCanvas, renderer, canvas) {
        this.renderer = renderer;
        this.barraVentana = barraVentana;
        this.menu = menuInterfaz;
        this.interfazCanvas = interfazCanvas;
        //canvas es un nodo
        this.canvas = new Canvas(this, renderer, canvas);

        this.nodo = this.crearNodo();
    }

    crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "VentanaCanvas";

        nodo.appendChild(this.barraVentana.nodo);
        nodo.appendChild(this.menu.nodo);
        this.interfazCanvas.nodo.appendChild(this.canvas.nodo);
        nodo.appendChild(this.interfazCanvas.nodo);

        return nodo;
    }

}