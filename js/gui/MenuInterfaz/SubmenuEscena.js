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

    static guardarEscena () {
        let serializacion = RendererRefactor.escena.serializar();
        let datos = "data:text/json;charset=utf-8," + encodeURIComponent(serializacion);
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
        let formData = new FormData();
        formData.append("escenaSerializada", datos);
        req.open("POST", "/bloomJS/php/backend/scripts/procesarEscenaGuardada.php");
        req.send(formData);
    }

    static cargarEscena () {
        console.log("cargar escena");
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

            interfazCanvas.anadirMenu(menuAnadirModelo);

        }

    }

}