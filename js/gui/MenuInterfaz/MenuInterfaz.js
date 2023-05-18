class MenuInterfaz {

    /*
    <link rel="stylesheet" href="js/gui/MenuInterfaz/MenuInterfaz.css">
    <script src="js/gui/MenuInterfaz/BotonInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/MenuInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/SubmenuInterfaz.js"></script>
        <script>
        let menu = new MenuInterfaz(
            [
                new BotonInterfaz("Nombre", MenuInterfaz.saludar),
                new SubmenuInterfaz("Desplegable",
                    [
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                        new BotonInterfaz("Nombre2", MenuInterfaz.saludar),
                    ])
            ]);
        document.body.appendChild(menu.nodo);
    </script>
    */
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

}