class SubmenuEscena extends SubmenuInterfaz {

    constructor (renderer, interfazCanvas) {
        super("Escena", [
                new BotonInterfaz("Crear escena", () => {SubmenuEscena.crearEscena(renderer)}),
                new BotonInterfaz("Cargar escena", () => {SubmenuEscena.cargarEscena()}),
                new BotonInterfaz("Añadir modelo", () => {SubmenuEscena.anadirModelo(renderer, interfazCanvas)})
        ]);
    }

    /**
     * Se crea una escena vacia. Esto por defecto añade el dibujable del Grid. La escena se guarda en renderer. La escena de renderer
     * se considera la escena actual (la que se esta dibujando, actualizando, etc)
     */
    static crearEscena () {
        if (RendererRefactor.escena == null) {
            let escena = new Escena();
            RendererRefactor.escena = escena;
        } else {
            alert("pisando escena actual de render. ¿Está seguro? Escena.js");
        }
    }

    static cargarEscena () {
        console.log("cargar escena");
    }

    static anadirModelo (renderer, interfazCanvas) {

        let antiguoMenu = interfazCanvas.buscarMenuPorTitulo("Añadir modelo");

        if (antiguoMenu == null) {

            let menuAnadirModelo = new MenuMalla("Añadir modelo", "/bloomJS/vistas/MenuMalla/Modelos.php", 
            "defecto", 0, null, 3);
            interfazCanvas.anadirMenu(menuAnadirModelo);

        } else {
            
            interfazCanvas.mostrarMenu(antiguoMenu);
            
        }

    }

}