class BotonInterfaz {

    constructor (nombre, funcion) {
        this.nombre = nombre;
        this.funcion = funcion;
        this.nodo = this.crearNodo(nombre, funcion);
    }

    crearNodo (nombre, funcion) {
        let nodo = document.createElement("li");
        nodo.className = "BotonInterfaz";

        let p = document.createElement("p");
        p.textContent = nombre;
        nodo.appendChild(p);
        
        nodo.addEventListener("click", () => {
            //cerrar submenu con click
            if (this.nodo.parentNode.classList.contains("desplegable")) {
                this.nodo.parentNode.classList.remove("activo");
            }
            //accion
            funcion();
        });
        return nodo;
    }

}