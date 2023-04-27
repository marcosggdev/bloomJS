class VentanaCanvas {

    static botones = [];
    static menuSeleccion = null;

    constructor () {
        //botones de la ventana del canvas
        VentanaCanvas.botones = [];
        this.nodo = this.crearNodo();
    }

    crearNodo () {

        //contenedor general
        let lienzo = document.createElement("div");
        lienzo.id = "lienzo";

        //contenedor de barras de opciones
        let barraVentana = document.createElement("div");
        barraVentana.id = "barraVentana";

        //barra con controles para maximizar/minimizar
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
        controlesVentana.appendChild(iconos);

        //barra de herramientas
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

        //canvas
        let canvas = document.createElement("canvas");
        canvas.tabindex = 0;
        canvas.id = "canvas";
        this.iniciarControlesCanvas(canvas);

        barraVentana.appendChild(controlesVentana);
        barraVentana.appendChild(barraHerramientas.nodo);

        GUI.crearInterfaz(lienzo);
        
        lienzo.appendChild(barraVentana);
        lienzo.appendChild(canvas);



        return lienzo;
    }

    iniciarControlesCanvas (canvas) {
        var moviendoCamara = false;
        var camaraMovida = false;

        canvas.addEventListener('mousemove', (e) => {
            if (moviendoCamara) {   
                Renderer.camara.anguloY += e.movementX;
                Renderer.camara.anguloXPropio += e.movementY;
                camaraMovida = true;
            }
        });

        canvas.addEventListener('mousedown', () => {
            moviendoCamara = true;
        });
    
        canvas.addEventListener('mouseup', (e) => {
            moviendoCamara = false;
            
            if (camaraMovida) {
                console.log("fin rotacion");
            } else {
                this.controladorSeleccionObjeto(canvas, e);
            }

            camaraMovida = false;
        });

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
    controladorSeleccionObjeto (canvas, e) {
        //construimos linea recta paralela al eje camara - centro, que pase por donde se hace click
        let xCanvas = canvas.getBoundingClientRect().left;
        let yCanvas = canvas.getBoundingClientRect().top;
        let anchoCanvas = canvas.getBoundingClientRect().width;
        let altoCanvas = canvas.getBoundingClientRect().height;
        let centroX = xCanvas + anchoCanvas / 2;
        let centroY = yCanvas + altoCanvas / 2;

        let coordXPixeles = e.clientX - centroX;
        let coordYPixeles = - (e.clientY - centroY);

        //convertir coordenadas del click a coords de opengl: minimo = -1, maximo = 1;
        //ancho = 2, xPixeles = xGL => xGL = (xPixeles * 2) / ancho
        let coordXGL = coordXPixeles * 2 / anchoCanvas;
        let coordYGL = coordYPixeles * 2 / altoCanvas;

        let rayoClick = new LineaRecta(coordXGL, coordYGL);

        //comprobamos los objetos de tipo Modelo3D que se estan dibujando
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            if (Renderer.dibujables[i] instanceof Modelo3D) {
                if (LineaRecta.comprobarInterseccionLineaModelo(rayoClick, Renderer.dibujables[i])) {
                    GUI.menuSeleccion.mostrar(Renderer.dibujables[i]);
                } else {
                    GUI.menuSeleccion.ocultar();
                }
                rayoClick = null;
            }
        }
    }
}