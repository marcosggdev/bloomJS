class BotonDesplegable {
    //boton pero muestra un obj menu que se añade al mismo li que el boton
    constructor (id, texto, opciones, callbacks) {
        //opciones array de string que representa los nombres de los li del menu
        this.id = id;
        this.texto = texto;
        this.iniciarNodoButton();
        this.iniciarListenersEstilo();
        this.iniciarListenerBoton();
        this.opciones = opciones;
        this.iniciarMenu(callbacks);
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

    iniciarMenu (callbacks) {
        this.nodoMenu = document.createElement("div");
        this.nodoMenu.id = "menu_" + this.id;
        this.nodoMenu.style.display = "none";
        let ul = document.createElement("ul");
        for (let i = 0; i < this.opciones.length; i++) {
            let li = document.createElement("li");
            li.id = this.opciones[i];
            li.textContent = this.opciones[i];
            li.addEventListener('click', callbacks[i]);
            ul.appendChild(li);
        }
        this.nodoMenu.appendChild(ul);
        this.nodoBoton.appendChild(this.nodoMenu);
    }
    //override iniciarListeners Boton: ahora el click muestra/oculta el menu
    iniciarListenerBoton () {
        this.nodoBoton.addEventListener('click', () => {
            if (this.nodoMenu.style.display == "none") {
                this.nodoMenu.style.display = "inline-block";
            } else {
                this.nodoMenu.style.display = "none";
            }
        }); 
        this.nodoBoton.addEventListener('blur', () => {
            this.nodoMenu.style.display = "none";
        });
    }
}