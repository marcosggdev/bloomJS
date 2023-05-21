class ControlesCanvas {

    static teclas = {
        82: "r",
        84: "t",
        83: "s"
    }

    static iniciar (canvas) {
        ControlesCanvas.rotando = false;
        ControlesCanvas.trasladando = false;
        ControlesCanvas.escalando = false;
        ControlesCanvas.mouseX = 0;
        ControlesCanvas.mouseY = 0;
        ControlesCanvas.moviendoCamara = false;
        ControlesCanvas.camaraMovida = false;
        ControlesCanvas.objetoSeleccionado = null;

        ControlesCanvas.crearControles(canvas);
    }

    static crearControles (canvas) {

        canvas.addEventListener('mousemove', (e) => {

            if (ControlesCanvas.moviendoCamara) {   
                
                RendererRefactor.camara.anguloY += e.movementX;
                RendererRefactor.camara.anguloXPropio += e.movementY;
                ControlesCanvas.camaraMovida = true;

            }

            //coords del mouse en pixeles con respecto al centro visible del canvas
            let centroCanvasX = canvas.getBoundingClientRect().width / 2;
            let centroCanvasY = canvas.getBoundingClientRect().height / 2
            ControlesCanvas.mouseX = e.clientX - canvas.getBoundingClientRect().left - centroCanvasX;
            ControlesCanvas.mouseY = -(e.clientY - canvas.getBoundingClientRect().top - centroCanvasY); //barraHeeramientas mide 50px de alto

            if (ControlesCanvas.rotando) {
                Modelo3D.rotarObjetoTecla(ControlesCanvas.objetoSeleccionado);
            } else if (ControlesCanvas.trasladando) {
                Modelo3D.trasladarObjetoTecla(ControlesCanvas.objetoSeleccionado);
            } else if (ControlesCanvas.escalando) {
                Modelo3D.escalarObjetoTecla(ControlesCanvas.objetoSeleccionado);
            }
        });

        canvas.addEventListener('mousedown', (e) => {
            if (e.button == 2) {
                ControlesCanvas.moviendoCamara = true;
            }
        });
    
        canvas.addEventListener('mouseup', (e) => {

            if (e.button == 2) {
                ControlesCanvas.moviendoCamara = false;
            } else if (e.button == 0) {
                if (!ControlesCanvas.camaraMovida) {
                    if (ControlesCanvas.objetoSeleccionado != null) {
                        //comprobar aplicacion de rst por teclado y aplicar.Despues no controladorSeleccion porque usamos el click para "guardar"
                        //no queremos deseleccionar otra cosa sin querer
                        if (ControlesCanvas.rotando || ControlesCanvas.trasladando || ControlesCanvas.escalando) {
                            ControlesCanvas.rotando = false;
                            ControlesCanvas.trasladando = false;
                            ControlesCanvas.escalando = false;
                            ControlesCanvas.interfazCanvas.menuSeleccion.actualizarDatos(ControlesCanvas.objetoSeleccionado);
                        } else {
                            //otro click implica controlador seleccion
                            ControlesCanvas.controladorSeleccionObjeto(canvas, e);
                        }
                    } else {
                        //sin ningun objeto seleccionado, controlador seleccion
                        ControlesCanvas.controladorSeleccionObjeto(canvas, e);
                    }
                }
                ControlesCanvas.camaraMovida = false;
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

            if (ControlesCanvas.objetoSeleccionado != null) {

                let tecla = ControlesCanvas.teclas[e.keyCode];

                //MODELOS RST
                if (ControlesCanvas.objetoSeleccionado.constructor.name == "Modelo3D") {
                    switch (tecla) {
                        case "r": ControlesCanvas.estadoRotar(); break;
                        case "t": ControlesCanvas.estadoTrasladar(); break;
                        case "s": ControlesCanvas.estadoEscalar(); break;
                    }
                //PUNTOS DE LUZ T
                } else if (ControlesCanvas.objetoSeleccionado.constructor.name == "PuntoLuz") {
                    switch (tecla) {
                        case "t": ControlesCanvas.estadoTrasladar(); break;
                    } 
                }

            }

        });

    }

    static estadoEscalar () {
        ControlesCanvas.escalando = true; 
        //coords en el momento de pulsar la tecla; util para escala
        ControlesCanvas.mouseXTecla = ControlesCanvas.mouseX; 
        ControlesCanvas.mouseYTecla = ControlesCanvas.mouseY;
        ControlesCanvas.factorXInicial = ControlesCanvas.objetoSeleccionado.factorX;
        ControlesCanvas.factorYInicial = ControlesCanvas.objetoSeleccionado.factorY;
        ControlesCanvas.factorZInicial = ControlesCanvas.objetoSeleccionado.factorZ;
    }
    
    static estadoRotar () {
        ControlesCanvas.rotando = true;
    }

    static estadoTrasladar () {
        ControlesCanvas.trasladando = true;
    }

    //comprobar posicion del click y buscar objeto que interseque
    static controladorSeleccionObjeto (canvas, e) {
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
                ControlesCanvas.deseleccionarObjeto();
            } else {
                //se ha hecho click en un objeto. Comprobamos que no es el seleccionado actualmente
                if (acierto != ControlesCanvas.objetoSeleccionado) {
                    ControlesCanvas.seleccionarObjeto(acierto);
                } else {
                    //es distinto
                    
                }
            }

            rayoClick = null;
        }
    }

    //se ha seleccionado un objeto
    static seleccionarObjeto (objeto) {
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
        ControlesCanvas.objetoSeleccionado = objeto;
    }

    //se deselecciona un objeto
    static deseleccionarObjeto () {
            //reset + deseleccion en menu global
            let menuSeleccion = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Selección");
            if (menuSeleccion != null) {
                VentanaCanvas.interfazCanvas.eliminarMenu(menuSeleccion.nodo);
            }
            ControlesCanvas.objetoSeleccionado = null;
    }

    //se selecciona desde canvas por click, y se gestiona la seleccion en el menu global
    static globalSeleccionarObjeto (objeto) {
        ControlesCanvas.globalOcultarObjeto();
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            if (e.objeto == objeto) {
                e.style.backgroundColor = "#9e369e";
            }
        });
    }

    //gestiona la deseleccion de un objeto en el menu global
    static globalOcultarObjeto () {
        //desseleccionarlo del menu global
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            e.style.backgroundColor = "#271427";
        });
    }

    static eliminarSeleccionado () {
        ControlesCanvas.objetoSeleccionado.eliminar();
        ControlesCanvas.deseleccionarObjeto();
        GUI.actualizarMenuGlobal();
    }

    //por ejemplo, objeto creado o eliminado
    static actualizarVentanaCanvas () {
        GUI.actualizarMenuGlobal();
    }

    static anadirModelo (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial) {
        let modelo = new Modelo(posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial);        
    }

    static setEscena (escena) {
        ControlesCanvas.escena = escena;
        RendererRefactor.dibujables = escena.dibujables;
    }

}