class SubmenuInterfaz {

    constructor (nombre, itemsInterfaz) {
        this.nombre = nombre;
        this.itemsInterfaz = itemsInterfaz;
        this.nodo = this.crearNodo(nombre, itemsInterfaz);
    }

    crearNodo (nombre, itemsInterfaz) {
        let nodo = document.createElement("li");
        nodo.className = "SubmenuInterfaz";

        let p = document.createElement("p");
        p.textContent = nombre;
        nodo.appendChild(p);

        let ul = document.createElement("ul");
        ul.className = "desplegable";
        for (let i = 0; i < itemsInterfaz.length; i++) {
            ul.appendChild(itemsInterfaz[i].nodo);
        }
        nodo.appendChild(ul);

        nodo.addEventListener("mouseenter", () => {
            ul.classList.add("activo");
        });

        nodo.addEventListener("mouseleave", () => {
            ul.classList.remove("activo");
        });

        return nodo;
    }

}