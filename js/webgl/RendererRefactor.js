class RendererRefactor {

    static iniciar (ancho, alto, fondo, camara, escena) {

        RendererRefactor.ancho = ancho;
        RendererRefactor.alto = alto;
        RendererRefactor.fondo = fondo;
        RendererRefactor.camara = camara;
        RendererRefactor.escena = escena;

        RendererRefactor.dibujarHitbox = false;
        RendererRefactor.dibujarGrid = true;

        RendererRefactor.parametros = {
            "objeto":[
                ["Ancho", "ancho", "NumericoTexto", 1920],
                ["Alto", "alto", "NumericoTexto", 1080],
                ["Fondo", "fondo", "Color", new Color(80,80,80,255)],
                ["Dibujar Hitbox", "dibujarHitbox", "Booleano", false],
                ["Dibujar Grid", "dibujarGrid", "Booleano", false]
            ],
            "adicionales":[
                
            ]
        };

        //crea supervaloresObjeto y supervaloresAdicionales. Los objeto son editables, los adicionales no
        RendererRefactor.crearSupervalores();
 
        RendererRefactor.configurar();

        //variables que influyen en exportacion
        RendererRefactor.exportacion = [
            "fondo",
            "ancho",
            "alto",
            "dibujarHitbox",
            "dibujarGrid"
        ];

        //variables temporales
        RendererRefactor.configuracionPrevia = {};
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
        canvas.focus();
        RendererRefactor.actualizar();
        RendererRefactor.dibujar();
        window.requestAnimationFrame(RendererRefactor.ciclo);
    }

    static actualizar () {
        RendererRefactor.camara.actualizar();
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
        RendererRefactor.fondo = new Color(0,0,0,1);
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

}