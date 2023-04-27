class BotonBooleano {

    constructor (callback_activar, callback_desactivar, estado = false, controlados, ruta = "/bloomJS/img/iconos/enlazar.png") {
        this.estado = estado;
        this.callback_activar = callback_activar;
        this.callback_desactivar = callback_desactivar;
        this.ruta = ruta;
        this.controlados = controlados;
        this.crearNodo(estado, ruta);
    }

    crearNodo () {
        let img = document.createElement("img");
        img.className = "enlazar"
        img.src = this.ruta;
        img.addEventListener("click", () => {
            if (this.estado) {
                this[this.callback_desactivar]();
            } else {
                this[this.callback_activar]();
            }
            this.estado = !this.estado;
        });

        this.nodo = img;

        if (this.estado) {
            this[this.callback_activar]();
        } else {
            this[this.callback_desactivar]();
        }   

    }

    activar () {
        this.nodo.style.backgroundColor = "blue";
        this.nodo.classList.add("activo");
    }

    desactivar () {
        this.nodo.style.backgroundColor = "white";
        this.nodo.classList.remove("activo");
    }

}