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
        let menuControles = new MenuDisplay("Controles", VentanaCanvas, "controles");
        VentanaCanvas.interfazCanvas.anadirMenu(menuControles);
    }

    static ajustes () {
        let menuAjustes = new MenuEdicion("Ajustes", Renderer);
        VentanaCanvas.interfazCanvas.anadirMenu(menuAjustes);
    }

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

    static exportarEscena () {
        //dibujables, iluminacion y camara. Se serializan todos los datos y se escriben en un archivo con una extension. Por ejemplo
        //extension .bloom. El programa utilizara estos archivos para cargar datos despues
        let serializacion = RendererRefactor.escena.serializar();
        let datos = "data:text/json;charset=utf-8," + encodeURIComponent(serializacion);
        let a = document.createElement("a");
        a.href = datos;
        a.download = "Escena.json";
        setTimeout(function () {
            a.click();
            setTimeout(function () {a = null;}, 1000);
        }, 1000);
        setTimeout(()=>{a.click}, 1000);
        setTimeout(()=>{a=null}, 2000);
    }

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

}