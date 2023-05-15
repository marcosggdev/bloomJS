class VentanaGenerador {

    static botones = [];
    static menuSeleccion = null;
    static objetoSeleccionado = null;

    static teclas = {
        82: "r",
        84: "t",
        83: "s"
    }

    static rotando = false;
    static trasladando = false;
    static escalando = false;
    static mouseX = 0;
    static mouseY = 0;

    constructor () {
        //botones de la ventana del canvas
        VentanaGenerador.botones = [];
        this.nodo = this.crearNodo();
    }

    crearNodo () {

        //contenedor general
        let lienzo = document.createElement("div");
        lienzo.id = "lienzo";

        let principal = document.createElement("div");
        principal.id = "principal";
        lienzo.appendChild(principal);

        let secundario = document.createElement("div");
        secundario.id = "secundario";
        lienzo.appendChild(secundario);

        //canvas
        let canvas = document.createElement("canvas");
        canvas.tabindex = 0;
        canvas.id = "canvas";
        canvas.tabIndex = 1;
        this.iniciarControlesCanvas(canvas);

        //DOM
        GUI.crearInterfaz(principal, secundario);
        principal.appendChild(canvas);

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

            //coords del mouse en pixeles con respecto al centro visible del canvas
            let centroCanvasX = canvas.getBoundingClientRect().width / 2;
            let centroCanvasY = canvas.getBoundingClientRect().height / 2
            VentanaGenerador.mouseX = e.clientX - canvas.getBoundingClientRect().left - centroCanvasX;
            VentanaGenerador.mouseY = -(e.clientY - canvas.getBoundingClientRect().top - centroCanvasY); //barraHeeramientas mide 50px de alto

            if (VentanaGenerador.rotando) {
                Modelo3D.rotarObjetoTecla(VentanaGenerador.objetoSeleccionado);
            } else if (VentanaGenerador.trasladando) {
                Modelo3D.trasladarObjetoTecla(VentanaGenerador.objetoSeleccionado);
            } else if (VentanaGenerador.escalando) {
                Modelo3D.escalarObjetoTecla(VentanaGenerador.objetoSeleccionado);
            }
        });

        canvas.addEventListener('mousedown', (e) => {
            if (e.button == 2) {
                moviendoCamara = true;
            }
        });
    
        canvas.addEventListener('mouseup', (e) => {

            if (e.button == 2) {
                moviendoCamara = false;
            } else if (e.button == 0) {
                if (!camaraMovida) {
                    if (VentanaGenerador.objetoSeleccionado != null) {
                        //comprobar aplicacion de rst por teclado y aplicar.Despues no controladorSeleccion porque usamos el click para "guardar"
                        //no queremos deseleccionar otra cosa sin querer
                        if (VentanaGenerador.rotando || VentanaGenerador.trasladando || VentanaGenerador.escalando) {
                            VentanaGenerador.rotando = false;
                            VentanaGenerador.trasladando = false;
                            VentanaGenerador.escalando = false;
                            GUI.menuSeleccion.actualizarDatos(VentanaGenerador.objetoSeleccionado);
                        } else {
                            //otro click implica controlador seleccion
                            VentanaGenerador.controladorSeleccionObjeto(canvas, e);
                        }
                    } else {
                        //sin ningun objeto seleccionado, controlador seleccion
                        VentanaGenerador.controladorSeleccionObjeto(canvas, e);
                    }
                }
                camaraMovida = false;
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
                    Renderer.camara.radio-=0.5;
                    //zoom out de la camara
                } else if (e.deltaY > 0) {
                    Renderer.camara.radio+=0.5;
                }
            }
        });

        canvas.addEventListener("keydown", (e) => {

            if (VentanaGenerador.objetoSeleccionado != null) {

                let tecla = VentanaGenerador.teclas[e.keyCode];

                //MODELOS RST
                if (VentanaGenerador.objetoSeleccionado.constructor.name == "Modelo3D") {
                    switch (tecla) {
                        case "r": VentanaGenerador.estadoRotar(); break;
                        case "t": VentanaGenerador.estadoTrasladar(); break;
                        case "s": 
                            VentanaGenerador.estadoEscalar();
                            break;
                    }
                //PUNTOS DE LUZ T
                } else if (VentanaGenerador.objetoSeleccionado.constructor.name == "PuntoLuz") {
                    switch (tecla) {
                        case "t": VentanaGenerador.estadoTrasladar(); break;
                    } 
                }

            }

        });
    }

    static estadoRotar () {
        VentanaGenerador.rotando = true;
    }

    static estadoTrasladar () {
        VentanaGenerador.trasladando = true;
    }

    static estadoEscalar () {
        VentanaGenerador.escalando = true; 
        //coords en el momento de pulsar la tecla; util para escala
        VentanaGenerador.mouseXTecla = VentanaGenerador.mouseX; 
        VentanaGenerador.mouseYTecla = VentanaGenerador.mouseY;
        VentanaGenerador.factorXInicial = VentanaGenerador.objetoSeleccionado.factorX;
        VentanaGenerador.factorYInicial = VentanaGenerador.objetoSeleccionado.factorY;
        VentanaGenerador.factorZInicial = VentanaGenerador.objetoSeleccionado.factorZ;
    }

    //comprobar posicion del click y buscar objeto que interseque
    static controladorSeleccionObjeto (canvas, e) {
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

        let click = false;
        //comprobamos los objetos de tipo Modelo3D que se estan dibujando
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            //si se ha hecho click en algun modelo
            if (Renderer.dibujables[i] instanceof Modelo3D) {
                if (LineaRecta.comprobarInterseccionLineaModelo(rayoClick, Renderer.dibujables[i])) {
                    //si hubiese uno seleccionado ya
                    if (VentanaGenerador.objetoSeleccionado != null) {
                        VentanaGenerador.deseleccionarObjeto();
                        VentanaGenerador.seleccionarObjeto(Renderer.dibujables[i]);
                    } else {
                        VentanaGenerador.seleccionarObjeto(Renderer.dibujables[i]);
                    }
                    click = true;
                }
            }
        }

        if (!click) {
            if (VentanaGenerador.objetoSeleccionado != null) {
                VentanaGenerador.deseleccionarObjeto();
            }
        }
        rayoClick = null;
    }

    //se ha seleccionado un objeto
    static seleccionarObjeto (objeto) {
        //canvas: mostrar menu, funcionactualizar, seleccionar y llamar a la funcion de global
        GUI.menuSeleccion.mostrar(objeto);
        VentanaGenerador.objetoSeleccionado = objeto;
        VentanaGenerador.globalSeleccionarObjeto(objeto);
        canvas.focus();
    }

    //se deselecciona un objeto
    static deseleccionarObjeto () {
        if (VentanaGenerador.objetoSeleccionado != null) {
            //reset + deseleccion en menu global
            GUI.menuSeleccion.ocultar();
            VentanaGenerador.objetoSeleccionado = null;
            VentanaGenerador.globalOcultarObjeto();
        }
    }

    //se selecciona desde canvas por click, y se gestiona la seleccion en el menu global
    static globalSeleccionarObjeto (objeto) {
        VentanaGenerador.globalOcultarObjeto();
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
        VentanaGenerador.objetoSeleccionado.eliminar();
        VentanaGenerador.deseleccionarObjeto();
        GUI.actualizarMenuGlobal();
    }

}