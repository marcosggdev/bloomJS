/**
 * Contenedor de barra ventana, menu interfaz, gui y canvas. Ventana principal de la aplicación
 */
class VentanaCanvas {

    constructor (barraVentana, menuInterfaz, interfazCanvas, renderer, canvas) {
        this.renderer = renderer;
        this.barraVentana = barraVentana;
        this.menuInterfaz = menuInterfaz;
        VentanaCanvas.interfazCanvas = interfazCanvas;
        //canvas es un nodo
        this.canvas = new Canvas(this, canvas);

        this.nodo = this.crearNodo();
    }

    crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "VentanaCanvas";

        nodo.appendChild(this.barraVentana.nodo);
        nodo.appendChild(this.menuInterfaz.nodo);
        VentanaCanvas.interfazCanvas.nodo.appendChild(this.canvas.nodo);
        nodo.appendChild(VentanaCanvas.interfazCanvas.nodo);

        return nodo;
    }

}