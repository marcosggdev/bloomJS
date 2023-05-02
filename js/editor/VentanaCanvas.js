class VentanaCanvas {

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
        VentanaCanvas.botones = [];
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
            VentanaCanvas.mouseX = e.clientX - canvas.getBoundingClientRect().left - centroCanvasX;
            VentanaCanvas.mouseY = -(e.clientY - canvas.getBoundingClientRect().top - centroCanvasY); //barraHeeramientas mide 50px de alto

            if (VentanaCanvas.rotando) {
                Modelo3D.rotarObjetoTecla(VentanaCanvas.objetoSeleccionado);
            } else if (VentanaCanvas.trasladando) {
                Modelo3D.trasladarObjetoTecla(VentanaCanvas.objetoSeleccionado);
            } else if (VentanaCanvas.escalando) {
                Modelo3D.escalarObjetoTecla(VentanaCanvas.objetoSeleccionado);
            }
        });

        canvas.addEventListener('mousedown', () => {
            moviendoCamara = true;
        });
    
        canvas.addEventListener('mouseup', (e) => {
            moviendoCamara = false;
            
            if (camaraMovida) {
                //se ejecuta despues de levantar el click tras una rotacion no nula de la camara

            } else {
                if (VentanaCanvas.objetoSeleccionado != null) {
                    //comprobar aplicacion de rst por teclado y aplicar.Despues no controladorSeleccion porque usamos el click para "guardar"
                    //no queremos deseleccionar otra cosa sin querer
                    if (VentanaCanvas.rotando || VentanaCanvas.trasladando || VentanaCanvas.escalando) {
                        VentanaCanvas.rotando = false;
                        VentanaCanvas.trasladando = false;
                        VentanaCanvas.escalando = false;
                    } else {
                        //otro click implica controlador seleccion
                        VentanaCanvas.controladorSeleccionObjeto(canvas, e);
                    }
                } else {
                    //sin ningun objeto seleccionado, controlador seleccion
                    VentanaCanvas.controladorSeleccionObjeto(canvas, e);
                }
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

        canvas.addEventListener("keydown", (e) => {

            if (VentanaCanvas.objetoSeleccionado != null) {
                let tecla = VentanaCanvas.teclas[e.keyCode];
                switch (tecla) {
                    case "r": VentanaCanvas.rotando = true; break;
                    case "t": VentanaCanvas.trasladando = true; break;
                    case "s": VentanaCanvas.escalando = true; break;
                }
            }

        });
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

        //comprobamos los objetos de tipo Modelo3D que se estan dibujando
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            if (Renderer.dibujables[i] instanceof Modelo3D) {
                if (LineaRecta.comprobarInterseccionLineaModelo(rayoClick, Renderer.dibujables[i])) {
                    GUI.menuSeleccion.mostrar(Renderer.dibujables[i]);
                    VentanaCanvas.globalSeleccionarObjeto(Renderer.dibujables[i]);
                    Renderer.dibujables[i].funcionActualizar = Modelo3D.funcionSeleccion;
                    VentanaCanvas.objetoSeleccionado = Renderer.dibujables[i];
                } else {
                    GUI.menuSeleccion.ocultar();
                    VentanaCanvas.globalOcultarObjeto();
                    Renderer.dibujables[i].funcionActualizar = null;
                    Renderer.dibujables[i].contador = null;
                    Renderer.dibujables[i].resetearFactores();
                    VentanaCanvas.objetoSeleccionado = null;
                }
            }
        }
        rayoClick = null;
    }

    static seleccionarObjeto (objeto, objetoDibujable) {
        VentanaCanvas.globalOcultarObjeto();
        GUI.menuSeleccion.mostrar(objeto);
        objetoDibujable.style.backgroundColor = "#9e369e";
        objeto.funcionActualizar = Modelo3D.funcionSeleccion;
    }

    //se utilizan para seleccionar desde el menu global por click, sin ray casting
    static globalSeleccionarObjeto (objeto) {
        VentanaCanvas.globalOcultarObjeto();
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            if (e.objeto == objeto) {
                e.style.backgroundColor = "#9e369e";
            }
        });
    }

    static globalOcultarObjeto () {
        //desseleccionarlo del menu global
        let objetosDibujables = document.querySelectorAll(".objetoDibujable");
        Array.from(objetosDibujables).forEach((e) => {
            e.style.backgroundColor = "#271427";
        });
    }
}