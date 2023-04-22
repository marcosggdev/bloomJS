class VentanaCanvas {

    static botones = [];

    constructor () {
        //botones de la ventana del canvas
        VentanaCanvas.botones = [];
        this.nodo = this.crearNodo();
    }

    crearNodo () {
        let ventanaEdicion = document.createElement("div");
        ventanaEdicion.id = "ventanaEdicion";

        let controlesVentana = document.createElement("div");
        controlesVentana.id = "controlesVentana";

        let iconos = document.createElement("div");
        iconos.id = "iconos";

        let botonMinimizar = new BotonIcono("/bloomJS/img/iconos/minimizar.png", minimizar, false, "minimizar");
        let botonMaximizar = new BotonIcono("/bloomJS/img/iconos/maximizar.png", maximizar, true, "maximizar");
    
        VentanaCanvas.botones.push(botonMinimizar);
        VentanaCanvas.botones.push(botonMaximizar);

        for (let i = 0; i < VentanaCanvas.botones.length; i++) {
            let icono = VentanaCanvas.botones[i];
            iconos.appendChild(icono.nodo);
        }

        let barraHerramientas = new BarraHerramientas([
            new Boton("Boton1", "saludar"),
            new Boton("Desplegable", "desplegar", [
                ["boton1", "boton2"],
                ["c1", "c2"]
            ])
        ]);

        let canvas = document.createElement("canvas");
        canvas.tabindex = 0;
        canvas.id = "canvas";

        controlesVentana.appendChild(iconos);
        ventanaEdicion.appendChild(controlesVentana);
        ventanaEdicion.appendChild(barraHerramientas.nodo);
        ventanaEdicion.appendChild(canvas);

        return ventanaEdicion;
    }
}