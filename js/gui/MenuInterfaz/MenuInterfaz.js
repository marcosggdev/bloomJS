class MenuInterfaz {

    //itemsInterfaz: array de objetos de tipo ItemsInterfaz, que incluye botones, menus desplegables, etc.
    constructor (itemsInterfaz) {

        this.itemsInterfaz = itemsInterfaz;
        this.nodo = this.crearNodo(itemsInterfaz);
    
    }

    crearNodo (itemsInterfaz) {
    
        let nodo = document.createElement("ul");
        nodo.className = "MenuInterfaz";

        for (let i = 0; i < itemsInterfaz.length; i++) {
            nodo.appendChild(itemsInterfaz[i].nodo);
        }
        return nodo;

    }

    static saludar () {
        console.log("saludar");
    }

    static controles () {
        let menuControles = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Controles");
        if (menuControles == null) {
            menuControles = new MenuDisplay("Controles", ControlesCanvas);
            VentanaCanvas.interfazCanvas.anadirMenu(menuControles);
        }
    }

    static ajustes () {
        let menuAjustes = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Ajustes");
        if (menuAjustes == null) {
            menuAjustes = new MenuEdicion("Ajustes", RendererRefactor);
            VentanaCanvas.interfazCanvas.anadirMenu(menuAjustes);
        }
    }

    /**
     * Genera una imagen en png de la imagen actual del canvas
     */
    static exportarImagen () {
        RendererRefactor.guardarConfiguracionPrevia();
        RendererRefactor.configuracionExportarImagen();
        setTimeout(function () {
            let enlaceAuxiliar = document.createElement('a');
            enlaceAuxiliar.download = 'BloomJS.png';
            //png, segundo parametro indica calidad. 1 maxima, 0 minima, 0.92 por defecto ( sin parametro )
            //toDataURL puede no funcionar bien si no se usan atributos con el contexto del canvas. En este caso se tuvo que utilizar
            //el atributo: { preserveDrawingBuffer: true }; Sino, la imagen obtenida, era vacia (transparente totalmente)
            enlaceAuxiliar.href = canvas.toDataURL("image/png", 1);
            enlaceAuxiliar.click();
            enlaceAuxiliar = null;
            setTimeout(RendererRefactor.cargarConfiguracionPrevia, 1000);
        }, 1000);
    }

    /**
     * Genera un archivo .js con los datos necesarios para que la escena pueda importarse de nuevo y verse desde el cliente de
     * bloomJS. Sería el archivo Main de la aplicación del cliente.
     */
    static exportarEscena() {
        if (RendererRefactor.escena != null) {
            let dialog = document.createElement("dialog");

            let titulo = document.createElement("h2");
            titulo.textContent = "Exportación";
            dialog.appendChild(titulo);

            let progreso = document.createElement("progress");
            progreso.value = 0;
            progreso.min = 0;
            progreso.max = 100;
            dialog.appendChild(progreso);

            let botonera = document.createElement("div");
            botonera.className = ".Botonera";

            let exportar = document.createElement("button");
            exportar.textContent = "Exportar";
            exportar.addEventListener("click", () => {
                //dibujables, iluminacion y camara. Se serializan todos los datos y se escriben en un archivo con una extension .json.
                //Despues, se exporta tambien el archivo Main.js, pensado para ser ejecutado con el cliente de BloomJS, dando ordenes
                //a la libreria de bloom para generar la escena con los datos del .json
                let serializacion = RendererRefactor.escena.serializar();
                let datos = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(serializacion));
                let a = document.createElement("a");
                a.href = datos;
                a.download = "Escena.json";
                setTimeout(function () {
                    a.click();
                    progreso.avanzarPaso("Descargando escena", 10);
                    setTimeout(function () { 
                        a = null; 
                        progreso.value = 100;
                        setTimeout(function () {
                            dialog.close();
                            dialog.remove();
                        }, 1000);
                    }, 1000);
                }, 1000);
            });
            botonera.appendChild(exportar);

            let cancelar = document.createElement("button");
            cancelar.textContent = "Cancelar";
            cancelar.addEventListener("click", () => {
                dialog.close();
                dialog.remove();
            });
            botonera.appendChild(cancelar);

            dialog.appendChild(botonera);
            document.body.appendChild(dialog);
            dialog.showModal();

            //Para funcionar correctamente el modelo necesitara el archivo de la textura y del material, además de la serialización,
            //por lo tanto, vamos a incluirlos en este paso.
        } else {
            alert("¡Ups!¡Primero debes crear una escena!");
        }
    }

    /*
    static exportarGraficos3D () {
        //necesitamos la informacion de los modelos, la camara y el renderer.
        let objetos = [];
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            if (Renderer.dibujables[i] instanceof Modelo3D) {
                objetos.push(Renderer.dibujables[i].serializar());
            }
        }

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let a = document.createElement("a");
                let archivo = new Blob([this.responseText], {type: 'text/plain'});
                a.href = URL.createObjectURL(archivo);
                a.download = "bloomjs_main.js";
                a.click();
                URL.revokeObjectURL(a.href);
            }
        };
        let formData = new FormData();
        formData.append("objetos", objetos);
        formData.append("camara", Renderer.camara.serializar());
        let rendererParametros = {
            "ancho": Renderer.ancho,
            "alto": Renderer.alto,
            "fondo": Renderer.fondo,
            "dibujarGrid": Renderer.dibujarGrid
        };
        formData.append("rendererParametros", JSON.stringify(rendererParametros));
        req.open("POST", "/bloomJS/php/backend/scripts/generarExportacionCanvas.php");
        req.send(formData);
    }
    */ 

    //--------------------------------------------GENERADOR-------------------------------------------------------------
    /**
     * Crea un menu de tipo malla y lo añade a la interfaz de la ventana canvas. Esta malla contendra los diferentes tipos
     * de preforma. El usuario podrá hacer click en alguna preforma y añadirla a la escena para editarla en base a sus parametros
     */
    static crearImagen () {
        if (!VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Preformas")) {
            let menu = new MenuMalla("Preformas", "/bloomJS/vistas/generador/presets/malla/MallaPresets.php", null, 0, null, 2);
            VentanaCanvas.interfazCanvas.anadirMenu(menu);
        }
    }

}