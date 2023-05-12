class Renderer {

    static fondo = new Color(0.3, 0.3, 0.3, 1.0);

    static camara = null;
    static ancho = 640;
    static alto = 480;
    static dibujables = [];

    static dibujarHitbox = false;
    static dibujarLineasSeleccion = false;
    static dibujarGrid = true;

    static controlesNombres = [
        "Rotar cámara",
        "Zoom in",
        "Zoom out",
        "Seleccionar"
    ];

    static controlesAcciones = [
        "Click derecho",
        "Ctrl +  scroll arriba",
        "Ctrl + scroll abajo",
        "Click izquierdo"
    ];

    static nombresPropiedades = [
        "Fondo",
        "Resolución_x",
        "Resolución_y",
        "Dibujar Hitbox",
        "Dibujar rayos",
        "Dibujar Grid"
    ];

    static valoresPropiedades = [
        Renderer.fondo.toString(),
        Renderer.ancho,
        Renderer.alto,
        (Renderer.dibujarHitbox == true) ? "true": "false",
        (Renderer.dibujarLineasSeleccion == true) ? "true": "false",
        (Renderer.dibujarGrid == true) ? "true": "false"
    ];

    static asignacionCallbacks = {
        "Fondo": "cambiarFondo",
        "Resolución_x": "cambiarAncho",
        "Resolución_y": "cambiarAlto",
        "Dibujar Hitbox": "cambiarDibujarHitbox",
        "Dibujar rayos": "cambiarDibujarLineasSeleccion",
        "Dibujar Grid": "cambiarDibujarGrid"
    };

    //se llama al editar algun input del menu de ajustes y hacer click en guardar
    static actualizarAjustes (nombres, inputs) {
        //nombres array parrafos, inputs array inputs
        for (let i = 0; i < nombres.length; i++) {
            //es el nombre que se muestra de la propiedad, no el identificador. Para obtenerlo usamos el array definido asignacionAjustes
            let nombreAjuste = nombres[i].textContent;
            let valor = inputs[i].value;
            Renderer[Renderer.asignacionCallbacks[nombreAjuste]](valor);
        }
        Renderer.actualizarValoresPropiedades();
    }

    static cambiarFondo (colorString) {
        //tenemos que parsear el color
        let colores = Color.parsearString(colorString);
        let color = new Color(colores[0], colores[1], colores[2], colores[3]);
        Renderer.fondo = color; 
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

    static cambiarDibujarHitbox (boolString) {
        if (boolString == "true") {
            Renderer.dibujarHitbox = true;
        } else if (boolString == "false") {
            Renderer.dibujarHitbox = false;
        } else {    
            Renderer.dibujarHitbox = false;
        }
    }

    static cambiarDibujarLineasSeleccion (boolString) {
        if (boolString == "true") {
            Renderer.dibujarLineasSeleccion = true;
        } else if (boolString == "false") {
            Renderer.dibujarLineasSeleccion = false;
        } else {    
            Renderer.dibujarLineasSeleccion = false;
        }
    }

    static cambiarDibujarGrid (boolString) {
        if (boolString == "true") {
            Renderer.dibujarGrid = true;
        } else if (boolString == "false") {
            Renderer.dibujarGrid = false;
        } else {    
            Renderer.dibujarGrid = false;
        }
    }

    //se llama cuando se cambian para k al abrir el menu de nuevo aparezcan los nuevos valores
    static actualizarValoresPropiedades () {
        Renderer.valoresPropiedades = [
            this.fondo.toString(),
            this.ancho,
            this.alto,
            (this.dibujarHitbox == true) ? "true": "false",
            (this.dibujarLineasSeleccion == true) ? "true": "false",
            (this.dibujarGrid == true) ? "true": "false"
        ];
    }

    static cargarControles (menu) {
        let hijos = menu.querySelectorAll("#menuControlesEditor > :not(.barraCierre)");
        for (let i = 0; i < hijos.length; i++) {
            hijos[i].parentNode.removeChild(hijos[i]);
        }

        let contenido = document.createElement("div");
        contenido.id = "menuControlesContenido";
        for (let i = 0; i < Renderer.controlesNombres.length; i++) {
            GUI.agregarCampoNoEditable(contenido, Renderer.controlesNombres[i], Renderer.controlesAcciones[i]);
        }
        menu.appendChild(contenido);
    }

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

    static cargarPropiedades (menuAjustes) {
        let campos = menuAjustes.querySelectorAll("div.campo");
        for (let i = 0; i < campos.length; i++) {
            switch (campos[i].querySelector("p").textContent) {
                case "Renderer ancho": campos[i].querySelector("input").value = Renderer.ancho; break;
                case "Renderer alto": campos[i].querySelector("input").value = Renderer.alto; break;
            }
        }
    }

    static limpiarFondo () {
        gl.clearColor(Renderer.fondo.R, Renderer.fondo.G, Renderer.fondo.B, Renderer.fondo.A);
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
    }

    static guardarConfiguracion () {
        Renderer.dibujarGridPrevio = Renderer.dibujarGrid;
        Renderer.dibujarHitboxPrevio = Renderer.dibujarHitbox;
        Renderer.dibujarLineasSeleccionPrevio = Renderer.dibujarLineasSeleccion;
        Renderer.anchoPrevio = Renderer.ancho;
        Renderer.altoPrevio = Renderer.alto;
    }

    //configurar render para obtener imagen con calidad buena
    static maximizarAjustesParaExportacion () {
        Renderer.guardarConfiguracion();
        Renderer.dibujarGrid = false;
        Renderer.dibujarHitbox = false;
        Renderer.dibujarLineasSeleccion = false;
        Renderer.cambiarAncho(1920);
        Renderer.cambiarAlto(1080);
    }

    //revertir cambios para obtener de nuevo las configuraciones que se tenian en el editor
    static resetearAjustes () {
        Renderer.dibujarGrid = Renderer.dibujarGridPrevio;
        Renderer.dibujarHitbox = Renderer.dibujarHitboxPrevio;
        Renderer.dibujarLineasSeleccion = Renderer.dibujarLineasSeleccionPrevio;
        Renderer.cambiarAncho(Renderer.anchoPrevio);
        Renderer.cambiarAlto(Renderer.altoPrevio);
    }
}