class BotonBooleano {

    //boton con dos estados (true, false), 2 callbacks (activar, desactivar) y 2 iconos (encendido, apagado)
    constructor (estado, callbackActivar, argumentosActivar, callbackDesactivar, argumentosDesactivar, imgApagado, imgEncendido) {
        this.estado = estado;
        this.callbackActivar = callbackActivar;
        this.argumentosActivar = argumentosActivar;
        this.callbackDesactivar = callbackDesactivar;
        this.argumentosDesactivar = argumentosDesactivar;
        this.imgApagado = imgApagado;
        this.imgEncendido = imgEncendido;

        this.crearNodo();
    }

    //nodo DOM
    crearNodo () {

        //imagen
        let img = document.createElement("img");
        img.className = "iconoBooleano";

        //icono en funcion de estado
        if (this.estado) {
            img.src = this.imgEncendido;
        } else {
            img.src = this.imgApagado;
        }

        //controlador en funcion de estado
        img.addEventListener("click", () => {
            //accion + inversion de estado
            if (this.estado) {
                this.callbackDesactivar(this.argumentosDesactivar);
            } else {
                this.callbackActivar(this.argumentosActivar);
            }
            this.estado = !this.estado;
            this.actualizarImagen();
        });

        this.nodo = img;
    }

    actualizarImagen () {
        //actualizar imagen
        if (this.estado) {
            this.nodo.src = this.imgEncendido;
        } else {
            this.nodo.src = this.imgApagado;
        }
    }

}