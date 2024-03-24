import Renderer from '@/js/bloomjs_glib/graphics/Renderer'

export default class Mouse {

    constructor(controlledNode) {

        this.controlledNode = controlledNode;
        const { mouseBindings } = import('@/js/bloomjs_glib/controllers/ControllerBindings');
        this.mouseBindings = mouseBindings;

        this.state = {
            selectedObject: null,

            rotatingCamera: false,

            mouseCoords: {
                mouseX: null,
                mouseY: null,
                xFactor: null,
                yFactor: null,
                zFactor: null
            }
        }

        this.loadListeners();
    }

    addListenerMove() {
        this.controlledNode.addEventListener('mousemove', (e) => {

            //rotate camera and save state
            if (this.state.rotatingCamera) {
                Renderer.camera.yAngle += e.movementX;
                Renderer.camera.xAngle += e.movementY;
            }

            //mouse coords relative to the center of the node
            let centerX = this.controlledNode.getBoundingClientRect().width / 2;
            let centerY = this.controlledNode.getBoundingClientRect().height / 2;
            this.state.mouseCoords.mouseX = e.clientX - this.controlledNode.getBoundingClientRect().left - centerX;
            this.state.mouseCoords.mouseY = - (e.clientY - this.controlledNode.getBoundingClientRect().top - centerY);

        });
    }

    
    addListenerMousedown() {
        this.controlledNode.addEventListener('mousedown', (e) => {
            switch (e.button) {
                case 2: this.state.rotatingCamera = true; break;
            }
        });
    }

    addListenerMouseup() {
        this.controlledNode.addEventListener('mouseup', (e) => {
            switch (e.button) {
                case 2: this.state.rotatingCamera = false; break;
            }
/*
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
                        } else {
                            //otro click implica controlador seleccion
                            ControlesCanvas.controladorSeleccionObjeto(this.controlledNode, e);
                        }
                    } else {
                        //sin ningun objeto seleccionado, controlador seleccion
                        ControlesCanvas.controladorSeleccionObjeto(this.controlledNode, e);
                    }
                }
                ControlesCanvas.camaraMovida = false;
            }
            */
        });
    }

    addListenerContextmenu() {
        this.controlledNode.addEventListener("contextmenu", (e) => {
            //util mas adelante, pero por ahora impedir que se habra
            e.preventDefault();
        });
    }
/*
    addListenerMousewheel() {

        this.controlledNode.addEventListener("mousewheel", (e) => {
            if (e.ctrlKey) {
                //evitar hacer zoom en la pagina
                e.preventDefault();
                //zoom de la camara
                if (e.deltaY < 0) {
                    RendererRefactor.camara.radio -= 0.5;
                    //zoom out de la camara
                } else if (e.deltaY > 0) {
                    RendererRefactor.camara.radio += 0.5;
                }
            }
        });
    }

    */

    loadListeners() {
        this.addListenerMove();
        this.addListenerMousedown();
        this.addListenerContextmenu();
        this.addListenerMouseup();
        /*
        this.addListenerMousewheel();
        */
    }

}