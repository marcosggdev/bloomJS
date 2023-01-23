class BotonDesplegable extends Boton{
    //boton pero muestra un obj menu que se añade al mismo li que el boton
    constructor (id, texto, opciones, callbacks) {
        //opciones array de string que representa los nombres de los li del menu
        super(id, texto);
        this.opciones = opciones;
        this.iniciarMenu(callbacks);
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
    iniciarListeners () {
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