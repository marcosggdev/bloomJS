class RendererRefactor {

    constructor (camara, ancho, alto, escena, fondo) {
        this.camara = camara;
        this.ancho = ancho;
        this.alto = alto;
        this.escena = escena;
        this.fondo = fondo;

        this.iniciar();
    }

    iniciar () {
        gl.canvas.width = this.ancho;   //dimensionar canvas
        gl.canvas.height = this.alto;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);   //redimensionar canvas

        //limpiar fondo a negro
        this.limpiarFondo();

        //habilita cull face, depth test y inversion eje y de texturas
        this.habilitarPropiedades();

        //matrices vista y perspectiva
        this.iniciarMatrices();
    }

    limpiarFondo () {
        gl.clearColor(this.fondo.R, this.fondo.G, this.fondo.B, this.fondo.A);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    habilitarPropiedades () {
        gl.enable(gl.CULL_FACE);    //cull face
        gl.enable(gl.DEPTH_TEST);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas
    }

    iniciarMatrices () {
        //crear matriz perspectiva
        this.aspecto = gl.canvas.width / gl.canvas.height;
        this.matrizP = Utilidades.crearMatrizPerspectiva(60.0, this.aspecto, 0.1, 1000.0);
        this.matrizV = this.camara.matrizV;
    }

    ciclo () {
        this.actualizar();
        this.dibujar();
    }

    actualizar () {
        //actualizar matrizV
        this.camara.actualizar();
        if (this.escena != null) {
            this.escena.actualizar();
        }
    }

    dibujar () {
        this.limpiarFondo();
        if (this.escena != null) {
            this.escena.dibujar(this);
        }
    }
}