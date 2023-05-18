/**
 * Contenedor de barra ventana, menu interfaz, gui y canvas. Ventana principal de la aplicación
 */
class VentanaCanvas {

    constructor (renderer, canvas) {
        this.renderer = renderer;
        this.barraVentana = new BarraVentana("Titulo", ["/bloomJS/img/iconos/minimizar.png", "/bloomJS/img/iconos/maximizar.png"],
            [BarraVentana.minimizar, BarraVentana.maximizar]);
        this.menu = new MenuInterfaz(
            [
                new BotonInterfaz("Nombre", MenuInterfaz.saludar),
                new SubmenuInterfaz("Desplegable",
                    [
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar)
                    ])
            ]);
        this.interfazCanvas = new InterfazCanvas();
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