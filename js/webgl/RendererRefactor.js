class RendererRefactor {

    static iniciar (ancho, alto, fondo, camara, escena) {

        RendererRefactor.ancho = ancho;
        RendererRefactor.alto = alto;
        RendererRefactor.fondo = fondo;
        RendererRefactor.camara = camara;
        RendererRefactor.escena = escena;

        RendererRefactor.dibujarFondo = true;
        RendererRefactor.dibujarHitbox = false;
        RendererRefactor.dibujarGrid = true;
        RendererRefactor.resolucionX = 1920;
        RendererRefactor.resolucionY = 1080;
        RendererRefactor.resolucion = "1024x768";

        RendererRefactor.supervalores = [
            new SelectCompuesto(
                new Select("resolucionX", "Resolución x", RendererRefactor.resolucionX, true, [640, 854, 1280, 1920]),
                new Select("resolucionY", "Resolución y", RendererRefactor.resolucionY, true, [360, 480, 720, 1080]),
                "resolucion", RendererRefactor.setResolucion, "Resolución", "x", true
            ),
            new ColorS("fondo", "Color de Fondo", RendererRefactor.fondo, true),
            new Booleano("dibujarFondo", "Dibujar Fondo", RendererRefactor.dibujarFondo, true),
            new Booleano("dibujarHitbox", "Dibujar Hitbox", RendererRefactor.dibujarHitbox, true),
            new Booleano("dibujarGrid", "Dibujar Grid", RendererRefactor.dibujarGrid, true)
        ];
 
        RendererRefactor.configurar();

        //variables que influyen en exportacion
        RendererRefactor.exportacion = [
            "fondo",
            "ancho",
            "alto",
            "dibujarFondo",
            "dibujarHitbox",
            "dibujarGrid"
        ];

        //variables temporales
        RendererRefactor.configuracionPrevia = {};
    }

    //el valor llega de un SelectCompuesto: String(resx + separador + resy)
    static setResolucion (supervalor) {
        RendererRefactor.resolucionX = supervalor.valor.split(supervalor.separador)[0];
        RendererRefactor.resolucionY = supervalor.valor.split(supervalor.separador)[1];
        gl.canvas.width = RendererRefactor.resolucionX;
        gl.canvas.height = RendererRefactor.resolucionY;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        //actualizar matriz de perspectiva
        RendererRefactor.aspecto = gl.canvas.width / gl.canvas.height;
        RendererRefactor.matrizP = Utilidades.crearMatrizPerspectiva(60.0, RendererRefactor.aspecto, 0.1, 1000.0);
    }

    static crearSupervalores () {

        //OBJETO
        let supervaloresObjeto = [];
        let parametrosObjeto = RendererRefactor.parametros.objeto;
        for (let i = 0; i < parametrosObjeto.length; i++) {
            supervaloresObjeto.push(new Supervalor(this, parametrosObjeto[2], parametrosObjeto[1], parametrosObjeto[0], this[parametrosObjeto[1]]));
        }

        //ADICIONALES
        let supervaloresAdicionales = [];
        let parametrosAdicionales = RendererRefactor.parametros.adicionales;
        for (let i = 0; i < parametrosAdicionales.length; i++) {
            supervaloresAdicionales.push(new Supervalor(this, parametrosAdicionales[2], parametrosAdicionales[1], parametrosAdicionales[0], this[parametrosAdicionales[1]]));
        }
        
        RendererRefactor.supervaloresAdicionales = supervaloresAdicionales;
    }

    static configurar () {
        gl.canvas.width = RendererRefactor.ancho;   //dimensionar canvas
        gl.canvas.height = RendererRefactor.alto;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);   //redimensionar canvas

        //limpiar fondo a negro
        RendererRefactor.limpiarFondo();

        //habilita cull face, depth test y inversion eje y de texturas
        RendererRefactor.habilitarPropiedades();

        //matrices vista y perspectiva
        RendererRefactor.iniciarMatrices();
    }

    static limpiarFondo () {
        gl.clearColor(RendererRefactor.fondo.R, RendererRefactor.fondo.G, RendererRefactor.fondo.B, RendererRefactor.fondo.A);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    static habilitarPropiedades () {
        gl.enable(gl.CULL_FACE);    //cull face
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas
    }

    static iniciarMatrices () {
        //crear matriz perspectiva
        RendererRefactor.aspecto = gl.canvas.width / gl.canvas.height;
        RendererRefactor.matrizP = Utilidades.crearMatrizPerspectiva(60.0, RendererRefactor.aspecto, 0.1, 1000.0);
        RendererRefactor.matrizV = RendererRefactor.camara.matrizV;
    }

    static ciclo () {
        //canvas.focus();
        RendererRefactor.actualizar();
        RendererRefactor.dibujar();
        window.requestAnimationFrame(RendererRefactor.ciclo);
    }

    static actualizar () {

        RendererRefactor.camara.actualizar();
        
        //actualizar parametros con valor actual de supervalores
        for (let i = 0; i < this.supervalores.length; i++) {
            this[this.supervalores[i].variable] = this.supervalores[i].valor;
        }

        //actualizar dibujo de color de fondo
        if (!RendererRefactor.dibujarFondo) {
            RendererRefactor.fondo = Color.TRANSPARENTE;
        }

        if (RendererRefactor.escena != null) {
            RendererRefactor.escena.actualizar();
        }
    }

    static dibujar () {
        RendererRefactor.limpiarFondo();
        if (RendererRefactor.escena != null) {
            RendererRefactor.escena.dibujar();
        }
    }

    static configuracionExportarImagen () {
        RendererRefactor.dibujarHitbox = false;
        RendererRefactor.dibujarGrid = false;

        //dibujar o no el fondo en el render
        if (!RendererRefactor.dibujarFondo) {
            RendererRefactor.color = new Color(0,0,0,0);
        }
    }

    static configuracionPrevia () {
        RendererRefactor.dibujarHitbox = RendererRefactor.dibujarHitboxPrevio;
    }

    static guardarConfiguracionPrevia () {
        for (let i = 0; i < RendererRefactor.exportacion.length; i++) {
            let nombre = RendererRefactor.exportacion[i];
            RendererRefactor.configuracionPrevia[nombre] = RendererRefactor[nombre];
        }
    }

    static cargarConfiguracionPrevia () {

        for (let i = 0; i < RendererRefactor.exportacion.length; i++) {
            let nombre = RendererRefactor.exportacion[i];
            RendererRefactor[nombre] = RendererRefactor.configuracionPrevia[nombre];
        }

    }

    static serializar () {
        let serializacion = [];
        for (let i = 0; i < RendererRefactor.supervalores.length; i++) {
            serializacion.push(RendererRefactor.supervalores[i]);
        }
        return JSON.stringify(serializacion);
    }

    static deserializar (serializacion) {
        let supervalores = JSON.parse(serializacion);

        for (let i = 0; i < supervalores.length; i++) {
            //guarda valor pero tb acutaliza representacion del DOM
            RendererRefactor.supervalores[i].setValor(supervalores[i].valor);
        }
    }

}