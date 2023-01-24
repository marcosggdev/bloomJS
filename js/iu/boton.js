class Boton {
    //crea un boton y lo añade a la barra de menus
    constructor (id, texto, callback) {
        this.id = id;
        this.texto = texto;
        this.iniciarNodoButton();
        this.iniciarListenersEstilo();
        this.iniciarListenerBoton(callback);
    }
    iniciarNodoButton () {
        this.nodoBoton = document.createElement("button");
        this.nodoBoton.id = this.id;
        this.nodoBoton.textContent = this.texto;
        this.nodoBoton.style.backgroundColor = "#5a5a5a";
    }

    iniciarListenersEstilo () {
        this.nodoBoton.addEventListener('mouseenter', () => {
            this.nodoBoton.style.backgroundColor= "#929292";
            this.nodoBoton.style.color = "white";
        });
        this.nodoBoton.addEventListener('mouseleave', () => {
            this.nodoBoton.style.backgroundColor = "#5a5a5a";
            this.nodoBoton.style.color = "black";
        });
    }

    iniciarListenerBoton (callback) {
        this.nodoBoton.addEventListener('click', callback);
    }
}