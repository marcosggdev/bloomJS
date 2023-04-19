class Submenu {

    constructor (id, nombres, callbacks) {
        this.id = id;
        this.nodo = this.crearNodo(id, nombres, callbacks);
    }

    crearNodo (id, nombres, callbacks) {
        let nodo = document.createElement("ul");
        nodo.id = id;
        nodo.classList.add("submenu");
        for (let i = 0; i < nombres.length; i++) {
            let li = document.createElement("li");
            li.textContent = nombres[i];
            var self = this;
            li.addEventListener('click', function () {
                self.ocultar();
                callbacks[i]();
            });
            nodo.appendChild(li);
        }
        return nodo;
    }

    mostrar () {
        this.nodo.classList.add("visible");
    }

    ocultar () {
        this.nodo.classList.remove("visible");
    }

}