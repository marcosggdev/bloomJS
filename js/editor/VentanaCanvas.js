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
            new Boton("Escena", "desplegar", [
                ["Añadir Modelo3D"],
                ["anadirModelo3D"]
            ]),
            new Boton("Desplegable", "desplegar", [
                ["boton1", "boton2"],
                ["c1", "c2"]
            ])
        ]);

        let canvas = document.createElement("canvas");
        canvas.tabindex = 0;
        canvas.id = "canvas";

        this.iniciarControlesCanvas(canvas);

        controlesVentana.appendChild(iconos);
        ventanaEdicion.appendChild(controlesVentana);
        ventanaEdicion.appendChild(barraHerramientas.nodo);
        ventanaEdicion.appendChild(canvas);

        return ventanaEdicion;
    }

    iniciarControlesCanvas (canvas) {
        this.iniciarControlesCamara(canvas);
    }

    iniciarControlesCamara (canvas) {
        this.controladorRotacionCamara(canvas);
        this.controladorZoomCamara(canvas);
        this.controladorSeleccionObjeto(canvas);
    }

    controladorRotacionCamara (canvas) {
        var moviendoCamara = false;

        canvas.addEventListener('mousemove', (e) => {
            if (moviendoCamara) {   
                Renderer.camara.anguloY += e.movementX;
                Renderer.camara.anguloXPropio += e.movementY;
            }
        });

        canvas.addEventListener('mousedown', () => {
            moviendoCamara = true;
        });
    
        canvas.addEventListener('mouseup', () => {
            moviendoCamara = false;
        });
    }

    controladorZoomCamara (canvas) {
        canvas.addEventListener("mousewheel", (e) => {
            if (e.ctrlKey) {
                //evitar hacer zoom en la pagina
                e.preventDefault();
                //zoom de la camara
                if (e.deltaY < 0) {
                    Renderer.camara.radio-=0.5;
                    //zoom out de la camara
                } else if (e.deltaY > 0) {
                    Renderer.camara.radio+=0.5;
                }
            }
        });
    }

    //comprobar posicion del click y buscar objeto que interseque
    controladorSeleccionObjeto (canvas) {
        canvas.addEventListener("click", (e) => {

            //comprobamos los objetos de tipo Modelo3D que se estan dibujando
            for (let i = 0; i < Renderer.dibujables.length; i++) {
                if (Renderer.dibujables[i] instanceof Modelo3D) {
                    
                }
            }
        });
    }
}