class ControlesCanvas {

    static teclas = {
        82: "r",
        84: "t",
        83: "s"
    }

    //gestiona controles de teclas, raton, camara y objeto seleccionado
    constructor (ventanaCanvas, renderer, canvas) {

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

        this.crearControles(ventanaCanvas, renderer, canvas);

    }

    crearControles (ventanaCanvas, renderer, canvas) {

        canvas.addEventListener('mousemove', (e) => {
            if (this.moviendoCamara) {   
                renderer.camara.anguloY += e.movementX;
                renderer.camara.anguloXPropio += e.movementY;
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
                            ventanaCanvas.interfazCanvas.menuSeleccion.actualizarDatos(this.objetoSeleccionado);
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
                    renderer.camara.radio-=0.5;
                    //zoom out de la camara
                } else if (e.deltaY > 0) {
                    renderer.camara.radio+=0.5;
                }
            }
        });

        canvas.addEventListener("keydown", (e) => {

            if (this.objetoSeleccionado != null) {

                let tecla = VentanaCanvas.teclas[e.keyCode];

                //MODELOS RST
                if (this.objetoSeleccionado.constructor.name == "Modelo3D") {
                    switch (tecla) {
                        case "r": VentanaCanvas.estadoRotar(); break;
                        case "t": VentanaCanvas.estadoTrasladar(); break;
                        case "s": 
                            VentanaCanvas.estadoEscalar();
                            break;
                    }
                //PUNTOS DE LUZ T
                } else if (this.objetoSeleccionado.constructor.name == "PuntoLuz") {
                    switch (tecla) {
                        case "t": VentanaCanvas.estadoTrasladar(); break;
                    } 
                }

            }

        });

    }

}