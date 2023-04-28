class Renderer {

    static clearColorR = 0.3;
    static clearColorG = 0.3;
    static clearColorB = 0.3;
    static clearColorA = 1.0;

    static camara = null;
    static ancho = 640;
    static alto = 480;
    static dibujables = [];

    static dibujarHitbox = false;
    static dibujarLineasSeleccion = false;

    static iniciar (camara = null, ancho, alto) {

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

    static aplicarConfiguracion (configuraciones) {
        for (let i = 0; i < configuraciones[0].length; i++) {
            switch (configuraciones[0][i]) {
                case "Renderer ancho": this.cambiarAncho(configuraciones[1][i]); break;
                case "Renderer alto": this.cambiarAlto(configuraciones[1][i]); break;
            }
        }
    }

    static cargarConfiguracion (menuAjustes) {
        let campos = menuAjustes.querySelectorAll("div.campo");
        for (let i = 0; i < campos.length; i++) {
            switch (campos[i].querySelector("p").textContent) {
                case "Renderer ancho": campos[i].querySelector("input").value = Renderer.ancho; break;
                case "Renderer alto": campos[i].querySelector("input").value = Renderer.alto; break;
            }
        }
    }

    static cambiarAncho (ancho) {
        Renderer.ancho = ancho;

        gl.canvas.width = Renderer.ancho;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);   //redimensionar canvas
    }

    static cambiarAlto (alto) {
        Renderer.alto = alto;

        gl.canvas.height = Renderer.alto;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);   //redimensionar canvas
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
        GUI.actualizarMenuGlobal();
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

    static recalcularPerspectiva () {
        this.aspecto = document.querySelector("canvas").width / document.querySelector("canvas").height;
        Renderer.matrizP = Utilidades.crearMatrizPerspectiva(60.0, this.aspecto, 0.1, 1000.0);
        console.log("recalc");
    }
}