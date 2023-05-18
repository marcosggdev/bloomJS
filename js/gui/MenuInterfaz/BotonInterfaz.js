class BotonInterfaz {

    constructor (nombre, callback) {
        this.nombre = nombre;
        this.callback = callback;
        this.nodo = this.crearNodo(nombre, callback);
    }

    crearNodo (nombre, callback) {
        let nodo = document.createElement("li");
        nodo.className = "BotonInterfaz";

        let p = document.createElement("p");
        p.textContent = nombre;
        nodo.appendChild(p);
        
        nodo.addEventListener("click", callback);
        return nodo;
    }

}