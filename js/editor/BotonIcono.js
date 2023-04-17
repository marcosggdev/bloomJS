class BotonIcono {

    constructor (rutaIcono, callback, estado = true, id) {
        this.rutaIcono = rutaIcono;
        this.callback = callback;
        this.id = id;
        this.estado = estado;    //controla si esta enabled o disabled
        this.nodo = this.crearNodo(rutaIcono, callback, id);
    }

    crearNodo (rutaIcono, callback, id) {
        let img = document.createElement("img");
        img.src = rutaIcono;
        img.alt = "Botón de la barra de controles del canvas";
        (this.estado == true) ? img.className = "iconoHabilitado" : img.className = "iconoDeshabilitado";
        img.id = id;
        img.addEventListener('click', (e) => {callback(this)});
        return img;
    }

    static buscarBotonPorId (id) {
        for (let i = 0; i < VentanaCanvas.botones.length; i++) {
            if (VentanaCanvas.botones[i].id == id) {
                return VentanaCanvas.botones[i];
            }
        }
        return null;
    }

    setEstado (estado) {
        if (estado) {

        } else {
            
        }
    }

}   