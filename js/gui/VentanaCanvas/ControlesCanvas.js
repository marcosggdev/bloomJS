class ControlesCanvas {

    static teclas = {
        82: "r",
        84: "t",
        83: "s"
    }

    //gestiona controles de teclas, raton, camara y objeto seleccionado
    constructor (ventanaCanvas, canvas) {

        //teclas
        this.rotando = false;
        this.trasladando = false;
        this.escalando = false;

        //raton
        this.mouseX = 0;
        this.mouseY = 0;

        //camara
        this.moviendoCamara = false;
        this.camaraMovida = false;
        this.objetoSeleccionado = null;

        this.crearControles(ventanaCanvas, canvas);

    }

    crearControles (ventanaCanvas, canvas) {

        canvas.addEventListener('mousemove', (e) => {
            if (this.moviendoCamara) {   
                RendererRefactor.camara.anguloY += e.movementX;
                RendererRefactor.camara.anguloXPropio += e.movementY;
                this.camaraMovida = true;
            }

            //coords del mouse en pixeles con respecto al centro visible del canvas
            let centroCanvasX = canvas.getBoundingClientRect().width / 2;
            let centroCanvasY = canvas.getBoundingClientRect().height / 2
            this.mouseX = e.clientX - canvas.getBoundingClientRect().left - centroCanvasX;
            this.mouseY = -(e.clientY - canvas.getBoundingClientRect().top - centroCanvasY); //barraHeeramientas mide 50px de alto

            if (this.rotando) {
                Modelo3D.rotarObjetoTecla(this.objetoSeleccionado);
            } else if (this.trasladando) {
                Modelo3D.trasladarObjetoTecla(this.objetoSeleccionado);
            } else if (this.escalando) {
                Modelo3D.escalarObjetoTecla(this.objetoSeleccionado);
            }
        });

        canvas.addEventListener('mousedown', (e) => {
            if (e.button == 2) {
                this.moviendoCamara = true;
            }
        });
    
        canvas.addEventListener('mouseup', (e) => {

            if (e.button == 2) {
                this.moviendoCamara = false;
            } else if (e.button == 0) {
                if (!this.camaraMovida) {
                    if (this.objetoSeleccionado != null) {
                        //comprobar aplicacion de rst por teclado y aplicar.Despues no controladorSeleccion porque usamos el click para "guardar"
                        //no queremos deseleccionar otra cosa sin querer
                        if (this.rotando || this.trasladando || this.escalando) {
                            this.rotando = false;
                            this.trasladando = false;
                            this.escalando = false;
                            this.interfazCanvas.menuSeleccion.actualizarDatos(this.objetoSeleccionado);
                        } else {
                            //otro click implica controlador seleccion
                            this.controladorSeleccionObjeto(canvas, e);
                        }
                    } else {
                        //sin ningun objeto seleccionado, controlador seleccion
                        this.controladorSeleccionObjeto(canvas, e);
                    }
                }
                this.camaraMovida = false;
            }
        });

        canvas.addEventListener("contextmenu", (e) => {
            //util mas adelante, pero por ahora impedir que se habra
            e.preventDefault();
        });

        canvas.addEventListener("mousewheel", (e) => {
            if (e.ctrlKey) {
                //evitar hacer zoom en la pagina
                e.preventDefault();
                //zoom de la camara
                if (e.deltaY < 0) {
                    RendererRefactor.camara.radio-=0.5;
                    //zoom out de la camara
                } else if (e.deltaY > 0) {
                    RendererRefactor.camara.radio+=0.5;
                }
            }
        });

        canvas.addEventListener("keydown", (e) => {

            if (this.objetoSeleccionado != null) {

                let tecla = this.teclas[e.keyCode];

                //MODELOS RST
                if (this.objetoSeleccionado.constructor.name == "Modelo3D") {
                    switch (tecla) {
                        case "r": this.estadoRotar(); break;
                        case "t": this.estadoTrasladar(); break;
                        case "s": 
                            this.estadoEscalar();
                            break;
                    }
                //PUNTOS DE LUZ T
                } else if (this.objetoSeleccionado.constructor.name == "PuntoLuz") {
                    switch (tecla) {
                        case "t": this.estadoTrasladar(); break;
                    } 
                }

            }

        });

    }

    estadoRotar () {
        this.rotando = true;
    }

    estadoTrasladar () {
        this.trasladando = true;
    }

    estadoEscalar () {
        this.escalando = true; 
        //coords en el momento de pulsar la tecla; util para escala
        this.mouseXTecla = this.mouseX; 
        this.mouseYTecla = this.mouseY;
        this.factorXInicial = this.objetoSeleccionado.factorX;
        this.factorYInicial = this.objetoSeleccionado.factorY;
        this.factorZInicial = this.objetoSeleccionado.factorZ;
    }

    //comprobar posicion del click y buscar objeto que interseque
    controladorSeleccionObjeto (canvas, e) {
        if (RendererRefactor.escena != null) {
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

            let acierto = RendererRefactor.escena.comprobarSeleccionDeModelo(rayoClick);
            if (!acierto) {
                //click en "aire". Deseleccionar objeto = borrar menu seleccion
                this.deseleccionarObjeto();
            } else {
                //se ha hecho click en un objeto. Comprobamos que no es el seleccionado actualmente
                if (acierto != this.objetoSeleccionado) {
                    this.seleccionarObjeto(acierto);
                } else {
                    //es distinto
                    
                }
            }

            rayoClick = null;
        }
    }

    //se ha seleccionado un objeto
    seleccionarObjeto (objeto) {
        let menuSeleccion = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Selección");
        if (menuSeleccion != null) {
            //borramos el que hay y creamos uno nuevo
            VentanaCanvas.interfazCanvas.eliminarMenu(menuSeleccion);
            let nuevoMenu = new MenuSeleccion("Selección", objeto);
            VentanaCanvas.interfazCanvas.anadirMenu(nuevoMenu);

        } else {
            //crear otro
            let menuSeleccion = new MenuSeleccion("Selección", objeto);
            VentanaCanvas.interfazCanvas.anadirMenu(menuSeleccion);
        }
        this.objetoSeleccionado = objeto;
    }

    //se deselecciona un objeto
    deseleccionarObjeto () {
            //reset + deseleccion en menu global
            let menuSeleccion = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Selección");
            if (menuSeleccion != null) {
                VentanaCanvas.interfazCanvas.eliminarMenu(menuSeleccion.nodo);
            }
            this.objetoSeleccionado = null;
    }

    //se selecciona desde canvas por click, y se gestiona la seleccion en el menu global
    globalSeleccionarObjeto (objeto) {
        this.globalOcultarObjeto();
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            if (e.objeto == objeto) {
                e.style.backgroundColor = "#9e369e";
            }
        });
    }

    //gestiona la deseleccion de un objeto en el menu global
    globalOcultarObjeto () {
        //desseleccionarlo del menu global
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            e.style.backgroundColor = "#271427";
        });
    }

    eliminarSeleccionado () {
        this.objetoSeleccionado.eliminar();
        this.deseleccionarObjeto();
        GUI.actualizarMenuGlobal();
    }

    //por ejemplo, objeto creado o eliminado
    actualizarVentanaCanvas () {
        GUI.actualizarMenuGlobal();
    }

    anadirModelo (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial) {
        let modelo = new Modelo(posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial);        
    }

    setEscena (escena) {
        this.escena = escena;
        RendererRefactor.dibujables = escena.dibujables;
    }

}