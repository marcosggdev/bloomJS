/**
 * Contenedor ESTATICO de barra ventana, menu interfaz, gui y canvas. Ventana principal de la aplicación
 */
class VentanaCanvas {

    static rotarCamara = "Click der.";
    static zoomIn = "Ctrl. + rueda arriba";
    static zoomOut = "Ctrl. rueda abajo";
    static seleccionar = "Click izq."

    //canvas es un nodo en argumento, pero dentro se convierte en objeto para envolverlo
    static iniciar (barraVentana, menuInterfaz, interfazCanvas, canvas) {

        VentanaCanvas.barraVentana = barraVentana;
        VentanaCanvas.menuInterfaz = menuInterfaz;
        VentanaCanvas.interfazCanvas = interfazCanvas;
        VentanaCanvas.canvas = new Canvas(canvas);
        VentanaCanvas.crearNodo();
        VentanaCanvas.iniciarGrupos();
    }

    static iniciarGrupos () {
        VentanaCanvas.grupos = [];
        VentanaCanvas.grupos.push(new Grupo("controles", VentanaCanvas, [
            "rotarCamara", "zoomIn", "zoomOut", "seleccionar"
        ], [
            "Rotar cámara", "Zoom-in", "Zoom-out", "Seleccionar" 
        ], [
            "boton","boton","boton","boton"
        ]));
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