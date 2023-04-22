class Boton {

    constructor (nombre, accion, arraySubmenu = null) {
        this.nombre = nombre;
        this.accion = accion;

        if (accion == "desplegar" && arraySubmenu != null) {
            this.submenu = new Submenu(arraySubmenu);
        }

        this.arraySubmenu = arraySubmenu;
        this.nodo = this.crearNodo(this.nombre, this.accion);
    }

    crearNodo (nombre, accion) {
        let div = document.createElement("div");
        div.className = "boton";
        let p = document.createElement("p");
        p.textContent = nombre;
            
        if (this.submenu != null) {
            p.appendChild(this.submenu.nodo);
            p.classList.add("contenedor");
            div.addEventListener("mouseenter", () => {
                this.desplegar();
            });
            div.addEventListener("mouseleave", () => {
                this.ocultar();
            });
        } else {
            p.addEventListener("click", this[accion]);
        }

        div.appendChild(p);

        return div;
    }

    desplegar () {
        this.submenu.desplegar();
    }   

    ocultar () {
        this.submenu.ocultar();
    }

    //ACCIONES de boton
    saludar () {
        console.log("saludar");
    }

}