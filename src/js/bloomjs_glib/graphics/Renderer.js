import Utility from '@/js/bloomjs_glib/Utility'
import Color from '@/js/bloomjs_glib/graphics/Color'

export default class Renderer {

    constructor (canvas, gl, camera, background = Color.BLACK, scene = null) {

        this.canvas = canvas;
        this.gl = gl;
        this.width = canvas.width;
        this.height = canvas.height;
        this.camera = camera;
        this.background = background;
        this.scene = scene;

        this.config();
    }

    config () {

        this.gl.viewport(0, 0, this.width, this.height);   //redimensionar canvas
        this.clearBackground();
        this.setProperties();
        this.initMatrices();
    }

    clearBackground () {
        this.gl.clearColor(this.background.R, this.background.G, this.background.B, this.background.A);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    setProperties () {
        this.gl.enable(this.gl.CULL_FACE);    //cull face
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas
    }

    initMatrices () {
        this.aspectRatio = this.gl.canvas.width / this.gl.canvas.height;
        this.pMat = Utility.createPerspectiveMatrix(60.0, this.aspectRatio, 0.1, 1000.0);
        this.vMat = this.camera.vMat;
    }

    cycle () {
        this.update();
        this.draw();
        window.requestAnimationFrame(this.cycle);
    }

    update () {
        this.camera.update();

        if (this.scene !== null) {
            this.scene.update();
        }
    }

    draw () {
        this.clearBackground();
        if (this.scene !== null) {
            this.scene.draw();
        }
    }

}