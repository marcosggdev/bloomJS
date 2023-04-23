class Renderer {

    static clearColorR = 0.289;
    static clearColorG = 0.289;
    static clearColorB = 0.289;
    static clearColorA = 1.0;

    static camara = null;
    static ancho = 640;
    static alto = 480;
    static dibujables = [];

    static dibujarHitbox = true;

    static iniciar (camara = null, ancho = 640, alto = 480) {

        Renderer.camara = camara;
        Renderer.ancho = ancho;
        Renderer.alto = alto;

        gl.canvas.width = Renderer.ancho;   //dimensionar canvas
        gl.canvas.height = Renderer.alto;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);   //redimensionar canvas

        //limpiar fondo a negro
        Renderer.limpiarFondo();

        //habilita cull face, depth test y inversion eje y de texturas
        Renderer.habilitarPropiedades();

        //matrices vista y perspectiva
        Renderer.iniciarMatrices();
    }

    static limpiarFondo () {
        gl.clearColor(Renderer.clearColorR, Renderer.clearColorG, Renderer.clearColorB, Renderer.clearColorA);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    static habilitarPropiedades () {
        gl.enable(gl.CULL_FACE);    //cull face
        gl.enable(gl.DEPTH_TEST);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas
    }

    static iniciarMatrices () {
        //crear matriz perspectiva
        Renderer.aspecto = gl.canvas.width / gl.canvas.height;
        Renderer.matrizP = Utilidades.crearMatrizPerspectiva(60.0, this.aspecto, 0.1, 1000.0);
        Renderer.matrizV = Renderer.camara.matrizV;
/* 
        //matriz vista
        Renderer.matrizV = new Matriz4X4();
        Renderer.matrizV.identidad();
        //this.crearMatrizVista();
        //this.matrizV.rotar(45, 0, 0);
        Renderer.matrizV.trasladar(-Renderer.camaraX, -Renderer.camaraY, -Renderer.camaraZ);*/ 
    }

    static crearMatrizVista () {
        let d = new Vector4X1([-Renderer.camaraX, -Renderer.camaraY, -Renderer.camaraZ, 1.0]);   //camara en pos camara, mirando al (0,0,0)
        d.normalizar();
        let x2 = d.productoVectorial(new Vector4X1([0, 1, 0]));
        x2.normalizar();
        let y2 = d.productoVectorial(x2);
        y2.normalizar();
        this.matrizV = new Matriz4X4();
        this.matrizV.identidad();
        this.matrizV.cambiarColumna(0, x2.datos);
        this.matrizV.cambiarColumna(1, y2.datos);
        this.matrizV.cambiarColumna(2, d.datos);
    }

    static ciclo () {
        Renderer.actualizar();
        Renderer.dibujar();
    }

    static actualizar () {
        //actualizar matrizV
        Renderer.camara.actualizar();
        Renderer.matrizV = Renderer.camara.matrizV;
        /* Renderer.matrizV = new Matriz4X4();
        Renderer.matrizV.identidad();
        //this.matrizV.rotar(45, 0, 0);
        Renderer.matrizV.trasladar(-Renderer.camaraX, -Renderer.camaraY, -Renderer.camaraZ);*/

        //no hay controles en esta implementacion -- Renderer.controles.actualizar();

        for (let i = 0; i < Renderer.dibujables.length; i++) {
            Renderer.dibujables[i].actualizar();
        }
    }

    static dibujar () {
        Renderer.limpiarFondo();

        //dibujar objetos dibujables
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            Renderer.dibujables[i].dibujar();
        }
    }

    static anadirGraficoDibujable (grafico) {
        this.dibujables.push(grafico);
        Renderer.dibujar();
    }

    static eliminarGraficoDibujable (id) {
        for (let i = 0; i < this.dibujables.length; i++) {
            if (this.dibujables[i].id == id) {
                //elimina ese y solo ese grafico del array
                this.dibujables[i].splice(i, 1);
                return true;
            }
        }
        return false;
    }
}