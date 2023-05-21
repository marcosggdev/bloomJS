/**
 * Contenedor ESTATICO de barra ventana, menu interfaz, gui y canvas. Ventana principal de la aplicación
 */
class VentanaCanvas {

    //canvas es un nodo en argumento, pero dentro se convierte en objeto para envolverlo
    static iniciar (barraVentana, menuInterfaz, interfazCanvas, canvas) {

        VentanaCanvas.barraVentana = barraVentana;
        VentanaCanvas.menuInterfaz = menuInterfaz;
        VentanaCanvas.interfazCanvas = interfazCanvas;
        VentanaCanvas.canvas = new Canvas(canvas);
        VentanaCanvas.crearNodo();

    }

    static crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "VentanaCanvas";

        nodo.appendChild(VentanaCanvas.barraVentana.nodo);
        nodo.appendChild(VentanaCanvas.menuInterfaz.nodo);
        nodo.appendChild(VentanaCanvas.interfazCanvas.nodo);
        VentanaCanvas.interfazCanvas.nodo.appendChild(VentanaCanvas.canvas.nodo);

        VentanaCanvas.nodo = nodo;
    }

}