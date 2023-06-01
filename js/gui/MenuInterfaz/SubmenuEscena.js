class SubmenuEscena extends SubmenuInterfaz {

    constructor (interfazCanvas) {
        super("Escena", [
                new BotonInterfaz("Crear escena", () => {SubmenuEscena.crearEscena()}),
                new BotonInterfaz("Guardar escena", () => {
                    if (RendererRefactor.escena != null) {
                        SubmenuEscena.guardarEscena()
                    } else {
                        alert("No hay escena activa");
                    }
                }),
                new BotonInterfaz("Cargar escena", () => {SubmenuEscena.cargarEscena()}),
                new BotonInterfaz("Añadir modelo", () => {SubmenuEscena.anadirModelo(interfazCanvas)})
        ]);
    }

    /**
     * Se crea una escena vacia. Esto por defecto añade el dibujable del Grid. La escena se guarda en renderer. La escena de renderer
     * se considera la escena actual (la que se esta dibujando, actualizando, etc)
     */
    static crearEscena () {

        //crear escena porque no hay
        if (RendererRefactor.escena == null) {
            //formulario para pedir nombre y descripcion para crear la escena
            Utilidades.cargarPlantilla(document.body, "/bloomJS/vistas/editor/crearEscena/crearEscena.php", {"sustituir": false});
        } else {
            //crear otra escena y sustituir la previa. Guardar cambios?
            Utilidades.cargarPlantilla(document.body, "/bloomJS/vistas/editor/crearEscena/crearEscena.php", {"sustituir": true});   
        }
        
    }

    /**
     * Guarda la escena en el servidor en una carpeta. Habra un .json con los datos serializados de la escena y habra
     * una imagen de previsualizacion, obtenida como render del canvas.
     * Si no existe la escena, se crea una nueva y se guarda la serializacion y un render. Si ya existe, entonces
     * actualizamos la serializacion antigua con la nueva y actualizamos el render
     */
    static guardarEscena () {

        //datos
        let serializacionOBJ = RendererRefactor.escena.serializar();
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

        let formData = new FormData();
        formData.append("escena", JSON.stringify(serializacionOBJ));
        formData.append("imagen", JSON.stringify(datosImagen));

        req.open("POST", "/bloomJS/php/backend/scripts/procesarEscenaGuardada.php");
        req.send(formData);

    }

    /**
     * Muestra un menu con las escenas del usuario. Si hace click en alguna, el menu se cerrara y se cargara dicha escena
     */
    static cargarEscena () {
        if (!VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Escenas")) {

            let menu = new MenuMalla("Escenas", "/bloomJS/vistas/MenuMalla/escenas/Escenas.php", "", 0, null, 3);
            let botonCerrar = menu.nodo.querySelector(".BarraCierre img");
    
            //añadir que al cerrar el menu se borren los scripts descargados
            botonCerrar.addEventListener("click", () => {
                let scripts = document.querySelectorAll("script[src='/bloomJS/vistas/MenuMalla/escenas/Escenas.js']");
                Array.from(scripts).forEach((s) => {s.remove()});
            });
            VentanaCanvas.interfazCanvas.anadirMenu(menu);
        }
    }

    static anadirModelo (interfazCanvas) {

        if (RendererRefactor.escena != null) {
            //buscar si ya existe
            let antiguoMenu = interfazCanvas.buscarMenuPorTitulo("Añadir modelo");

            if (antiguoMenu == null) {
                let menuAnadirModelo = new MenuAlternar("Añadir modelo", 
                ["Defecto", "Personal", "Comunidad"], 
                [
                    new MenuMalla("Defecto", "/bloomJS/vistas/MenuMalla/Modelos.php", 
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
        } else {
            alert("Primero crea una escena");
        }

    }

}