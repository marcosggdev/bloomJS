class SubmenuInterfaz {

    constructor (itemsInterfaz) {
        this.itemsInterfaz = itemsInterfaz;
        this.nodo = this.crearNodo(itemsInterfaz);
    }

    crearNodo (itemsInterfaz) {
        let nodo = document.createElement("ul");
        nodo.className = "Submenu";

        for (let i = 0; i < itemsInterfaz.length; i++) {
            nodo.appendChild(itemsInterfaz[i].nodo);
        }
        return nodo;
    }

}