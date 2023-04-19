class MenuHerramientas {

    static maximizar = new Herramienta("/bloomJS/img/iconos/maximizar.png", ControladorHerramientas.maximizar);

    static anadir = new Herramienta(
        "/bloomJS/img/iconos/anadir.png", 
        ControladorHerramientas.desplegarSubmenuAnadir, 
        true, "anadir", 
        ["Plantilla"], 
        [ControladorHerramientas.anadirPlantilla]
    );
    
    static herramientas = [
        MenuHerramientas.maximizar,
        MenuHerramientas.anadir
    ];

    constructor () {
        this.nodo = this.crearNodo(MenuHerramientas.herramientas);
        document.getElementById("frame").appendChild(this.nodo);
    }

    crearNodo (herramientas) {
        let nodo = document.createElement("div");
        nodo.id = "menuHerramientas";
        for (let i = 0; i < herramientas.length; i++) {
            nodo.appendChild(herramientas[i].nodo);
        }
        return nodo;
    }

}