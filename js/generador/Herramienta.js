class Herramienta {

    constructor (ruta, callback, tieneSubmenu = false, id = null, nombres = [], callbacks = []) {
        this.ruta = ruta;
        this.callback = callback;
        this.tieneSubmenu = tieneSubmenu;
        this.nodo = this.crearNodo(ruta, callback, tieneSubmenu, id, nombres, callbacks);
    }

    crearNodo (ruta, callback, tieneSubmenu, id, nombres, callbacks) {
        let nodo = document.createElement("div");
        nodo.className = "celda";
        let img = document.createElement("img");
        img.src = ruta;
        img.alt = "Herramienta";
        img.className = "icono";
        img.addEventListener('click', callback);
        nodo.appendChild(img);

        if (tieneSubmenu) {
            let submenu = new Submenu(id, nombres, callbacks);
            nodo.appendChild(submenu.nodo);
        }

        return nodo;
    }

}