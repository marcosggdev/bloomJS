export default class Keyboard {

    constructor(controlledNode) {

        this.controlledNode = controlledNode;
        //this.mouse = mouse;
        const { keyboardBindings } = import('@/js/bloomjs_glib/controllers/ControllerBindings');
        this.keyboardBindings = keyboardBindings;

        this.state = {
            selectedObject: null,

            rotatingModel: false,
            translatingModel: false,
            scalingModel: false,

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

    loadListeners () {
        this.controlledNode.addEventListener("keydown", (e) => {
            if (this.state.selectedObject !== null) {
                let key = this.keyboardBindings[e.keyCode];
                if (this.state.selectedObject.constructor.name === "Model3D") {

                    switch (key) {
                        case 'r': this.rotateModelState(); break;
                        case 't': this.translateModelState(); break;
                        case 's': this.scaleModelState(); break;
                    }
                }
            }
        });
    }

    //model states
    rotateModelState () {
        this.state.rotatingModel = true;
    }

    translateModelState () {
        this.state.translatingModel = true;
    }

    scaleModelState () {
        this.state.scalingModel = true;
        //save coords of the mouse when the scaling started
        this.state.mouseCoords = {
           /* mouseX: this.mouse.getPosXGL(),
            mouseY: this.mouse.getPosYGL(),*/
            xFactor: this.state.selectedObject.xFactor,
            yFactor: this.state.selectedObject.yFactor,
            zFactor: this.state.selectedObject.zFactor
        };
    }

}