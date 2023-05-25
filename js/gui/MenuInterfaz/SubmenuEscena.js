class SubmenuEscena extends SubmenuInterfaz {

    constructor (interfazCanvas) {
        super("Escena", [
                new BotonInterfaz("Crear escena", () => {SubmenuEscena.crearEscena()}),
                new BotonInterfaz("Guardar escena", () => {SubmenuEscena.guardarEscena()}),
                new BotonInterfaz("Cargar escena", () => {SubmenuEscena.cargarEscena()}),
                new BotonInterfaz("Añadir modelo", () => {SubmenuEscena.anadirModelo(interfazCanvas)})
        ]);
    }

    /**
     * Se crea una escena vacia. Esto por defecto añade el dibujable del Grid. La escena se guarda en renderer. La escena de renderer
     * se considera la escena actual (la que se esta dibujando, actualizando, etc)
     */
    static crearEscena () {
        if (RendererRefactor.escena == null) {
            let escena = new Escena(null);
            RendererRefactor.escena = escena;
        } else {
            alert("pisando escena actual de render. ¿Está seguro? Escena.js");
        }
    }

    /**
     * Guarda la escena en el servidor en una carpeta. Habra un .json con los datos serializados de la escena y habra
     * una imagen de previsualizacion, obtenida como render del canvas
     */
    static guardarEscena () {
        let serializacion = RendererRefactor.escena.serializar();
        let datos = "data:text/json;charset=utf-8," + encodeURIComponent(serializacion);
        let canvas = document.querySelector("canvas");
        let datosImagen = canvas.toDataURL();

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let dialog = document.createElement("dialog");
                dialog.innerHTML += this.responseText;
                let botonera = document.createElement("div");
                let aceptar = document.createElement("button");
                aceptar.textContent = "Aceptar";
                aceptar.className = "aceptar";
                aceptar.addEventListener("click", () => {
                    dialog.close();
                    dialog.remove();
                });
                botonera.appendChild(aceptar);
                dialog.appendChild(botonera);
                VentanaCanvas.interfazCanvas.nodo.appendChild(dialog);
                dialog.showModal();
            }
        };

        let escenaJSON = {
            "serializacion": serializacion,
            "imagen": datosImagen
        };

        let formData = new FormData();
        formData.append("escenaJSON", JSON.stringify(escenaJSON));
        req.open("POST", "/bloomJS/php/backend/scripts/procesarEscenaGuardada.php");
        req.send(formData);
    }

    /**
     * Muestra un menu con las escenas del usuario. Si hace click en alguna, el menu se cerrara y se cargara dicha escena
     */
    static cargarEscena () {
        let menu = new MenuMalla("Escenas", "/bloomJS/vistas/MenuMalla/escenas/Escenas.php", "", 0, null, 3);
        VentanaCanvas.interfazCanvas.anadirMenu(menu);
    }

    static anadirModelo (interfazCanvas) {

        //buscar si ya existe
        let antiguoMenu = interfazCanvas.buscarMenuPorTitulo("Añadir modelo");

        if (antiguoMenu == null) {

            let menuAnadirModelo = new MenuAlternar("Modelos", 
            ["Defecto", "Personal", "Comunidad"], 
            [
                new MenuMalla("Por defecto", "/bloomJS/vistas/MenuMalla/Modelos.php", 
                "defecto", 0, null, 3),
                new MenuMalla("Personal", "/bloomJS/vistas/MenuMalla/Modelos.php", 
                "usuario", 0, null, 3),
                new MenuMalla("Comunidad", "/bloomJS/vistas/MenuMalla/Modelos.php", 
                "comunidad", 0, null, 3)
            ]);

            let subirModelo = document.createElement("button");
            subirModelo.id = "subirModelo";
            subirModelo.textContent = "Subir";

            subirModelo.addEventListener("click", () => {
                let parametros = { "paginaVolver": "/bloomJS/pruebas.php" };
                Utilidades.cargarPlantilla(VentanaCanvas.interfazCanvas.nodo, "/bloomJS/vistas/editor/subirModelo.php", parametros);
            });

            menuAnadirModelo.nodo.querySelector(".submenu#Personal .BarraCierre").appendChild(subirModelo);

            interfazCanvas.anadirMenu(menuAnadirModelo);

        }

    }

}