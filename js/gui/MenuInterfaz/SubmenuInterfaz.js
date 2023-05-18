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

    sustituirOpciones (itemsInterfaz) {

        let lis = this.nodo.querySelectorAll("li");
        for (let i = 0; i < lis.length; i++) {
            lis[i].parentNode.removeChild(lis[i]);
            lis[i] = null;
        }

        for (let i = 0; i < itemsInterfaz.length; i++) {
            this.nodo.querySelector("ul").appendChild(itemsInterfaz.nodo);
        }

    }

    anadirOpcion (itemInterfaz) {
        this.itemsInterfaz.push(itemInterfaz);
        this.nodo.appendChild(itemInterfaz.nodo);
    }

    eliminarOpcion (itemInterfaz) {
        for (let i = 0; i < this.itemsInterfaz.length; i++) {
            if (this.itemsInterfaz[i] == itemInterfaz) {
                this.itemsInterfaz = this.itemsInterfaz.splice(i, 1);
            }
        }
        this.recalcularDOM();
    }

    recalcularDOM () {
        this.nodo.querySelector("ul").innerHTML = "";
        for (let i = 0; i < this.itemsInterfaz.length; i++) {
            this.nodo.querySelector("ul").appendChild(this.itemsInterfaz[i].nodo);
        }
    }

}