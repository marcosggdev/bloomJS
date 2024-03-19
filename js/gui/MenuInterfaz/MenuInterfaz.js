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
     * bloomJS. Sería el archivo Main de la aplicación del cliente. Exporta también los archivos necesarios para el dibujo de los
     * modelos contenidos en la escena: la textura, el archivo .dae, etc.
     */
    static exportarEscena() {

        if (RendererRefactor.escena != null) {

            let dialog = document.createElement("dialog");

            let titulo = document.createElement("h2");
            titulo.textContent = "Exportando...";
            dialog.appendChild(titulo);

            let iconoCargando = document.createElement("img");
            iconoCargando.src = "/img/gif/cargando.gif";
            iconoCargando.className = "gif";
            dialog.appendChild(iconoCargando);

            document.body.appendChild(dialog);
            dialog.showModal();

            try {
                //datos de la escena en json
                let serializacion = RendererRefactor.escena.serializar();
                let datos = JSON.stringify(serializacion);

                //dibujables necesitan textura y .dae
                let rutasTexturas = [];
                let rutasDae = [];

                for (let i = 0; i < RendererRefactor.escena.dibujables.length; i++) {
                    let dibujable = RendererRefactor.escena.dibujables[i];

                    let rutaTextura = dibujable.rutaTextura;
                    let rutaDae = dibujable.rutaArchivoDae;

                    if (rutaTextura != null) {
                        rutasTexturas.push(rutaTextura);
                    }

                    if (rutaDae != null) {
                        rutasDae.push(rutaDae);
                    }
                }

                let nombresTexturas = [];
                let nombresDae = [];

                for (let i = 0; i < rutasTexturas.length; i++) {
                    let subpartes = rutasTexturas[i].split("/");
                    let ultimaParte = subpartes[subpartes.length - 1];
                    nombresTexturas.push(ultimaParte);
                }

                for (let i = 0; i < rutasDae.length; i++) {
                    let subpartes = rutasDae[i].split("/");
                    let ultimaParte = subpartes[subpartes.length - 1];
                    nombresDae.push(ultimaParte);
                }

                let archivosTexturas = [];
                for (let i = 0; i < rutasTexturas.length; i++) {
                    archivosTexturas.push(Utilidades.descargarDesdeUrl(rutasTexturas[i]));
                }

                let archivosDae = [];
                for (let i = 0; i < rutasDae.length; i++) {
                    archivosDae.push(Utilidades.descargarDesdeUrl(rutasDae[i]));
                }

                Promise.all(archivosTexturas.concat(archivosDae)).then(
                    function () {
                        let zip = new JSZip();
                        let escena = zip.folder("Escena");
                        escena.file("Escena.json", datos);

                        let texturas = escena.folder("Texturas");
                        let dae = escena.folder("Dae");

                        for (let i = 0; i < archivosTexturas.length; i++) {
                            texturas.file(nombresTexturas[i], archivosTexturas[i]);
                        }

                        for (let i = 0; i < archivosDae.length; i++) {
                            dae.file(nombresDae[i], archivosDae[i]);
                        }

                        zip.generateAsync({ "type": "blob" }).then(
                            function (contenido) {
                                saveAs(contenido, "Escena.zip");
                                dialog.close();
                                dialog.remove();
                            }
                        );
                    }
                );

            } catch (error) {

                alert("Hubo un error al exportar la escena: " + error);
                dialog.close();
                dialog.remove();

            }

        } else {

            alert("¡Ups!¡Primero debes crear una escena!");

        }
    }

    //--------------------------------------------GENERADOR-------------------------------------------------------------
    /**
     * Crea un menu de tipo malla y lo añade a la interfaz de la ventana canvas. Esta malla contendra los diferentes tipos
     * de preforma. El usuario podrá hacer click en alguna preforma y añadirla a la escena para editarla en base a sus parametros
     */
    static crearImagen () {
        if (!VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Preformas")) {
            let menu = new MenuMalla("Preformas", "/vistas/generador/presets/malla/MallaPresets.php", null, 0, null, 2);
            VentanaCanvas.interfazCanvas.anadirMenu(menu);
        }
    }

    static ajustesGenerador () {
        let menuAjustes = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Ajustes");
        if (menuAjustes == null) {
            menuAjustes = new MenuEdicion("Ajustes", RendererRefactor);
            VentanaCanvas.interfazCanvas.anadirMenu(menuAjustes);
        }
    }

}