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
        let menuControles = new MenuGeneral("Controles");
        VentanaCanvas.interfazCanvas.anadirMenu(menuControles);
    }

    static ajustes () {
        let menuAjustes = new MenuEdicion("Ajustes", Renderer);
        VentanaCanvas.interfazCanvas.anadirMenu(menuAjustes);
    }

}