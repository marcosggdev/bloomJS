import Utility from '@/js/bloomjs_glib/Utility'
import Color from '@/js/bloomjs_glib/graphics/Color'

export default class Renderer {

    constructor (canvas, gl, camera, background = Color.GREY_LIGHTER, scene = null) {

        Renderer.canvas = canvas;
        Renderer.gl = gl;
        this.updateDimensions(canvas);
        Renderer.camera = camera;
        this.background = background;
        this.scene = scene;

        this.config();
    }

    config () {

        Renderer.gl.viewport(0, 0, this.width, this.height);   //redimensionar canvas
        this.clearBackground();
        this.setProperties();
        this.initMatrices();
    }

    clearBackground () {
        Renderer.gl.clearColor(this.background.R, this.background.G, this.background.B, this.background.A);
        Renderer.gl.clear(Renderer.gl.COLOR_BUFFER_BIT | Renderer.gl.DEPTH_BUFFER_BIT);
    }

    setProperties () {
        Renderer.gl.enable(Renderer.gl.CULL_FACE);    //cull face
        Renderer.gl.enable(Renderer.gl.DEPTH_TEST);
        Renderer.gl.depthFunc(Renderer.gl.LESS);
        Renderer.gl.pixelStorei(Renderer.gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas
    }

    initMatrices () {
        this.aspectRatio = Renderer.gl.canvas.width / Renderer.gl.canvas.height;
        Renderer.pMat = Utility.createPerspectiveMatrix(60.0, this.aspectRatio, 0.1, 1000.0);
        this.vMat = Renderer.camera.vMat;
    }

    cycle () {
        this.update();
        this.draw();
        requestAnimationFrame(() => {this.cycle()});
    }

    update () {
        Renderer.camera.update();

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

    updateDimensions (canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        Renderer.gl.viewport(0, 0, this.width, this.height);
    }

}