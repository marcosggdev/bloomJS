class MenuGlobal extends MenuObjetos {

    constructor (titulo, objetos) {
        super(titulo, objetos);
        this.seleccionado = null;
        this.crearControles();
    }

    //actualizar objetos con los que haya en la escena como dibujables
    actualizarObjetos () {
        if (RendererRefactor.escena != null) {
            this.objetos = RendererRefactor.escena.dibujables;
        } else {
            this.objetos = [];
        }
        this.actualizarNodo();
    }

    //selecciona el objeto pasado por parametro y actualiza el nodo
    actualizarSeleccionado (objeto) {
        this.seleccionado = objeto;
        this.actualizarNodo();
    }

    //actualiza el nodo: recrea objetos y actualiza el seleccionado
    actualizarNodo () {
        let contenedorObjetos = this.nodo.querySelector(".ContenedorObjetos");
        contenedorObjetos.innerHTML = "";

        if (this.objetos != null) {

            for (let i = 0; i < this.objetos.length; i++) {
                let objeto = document.createElement("div");
                objeto.className = "Objeto";
                objeto.textContent = this.objetos[i].constructor.name;
                contenedorObjetos.appendChild(objeto);

                if (this.objetos[i].seleccionable) {
                    objeto.classList.add("seleccionable");
                }

                if (this.objetos[i] == this.seleccionado) {
                    objeto.classList.add("seleccionado");
                }
            }

            this.crearControles();

        } else {
            let p = document.createElement("p");
            p.textContent = "No hay ningún objeto que mostrar...";
            contenedorObjetos.appendChild(p);
        }

    }

    //añade listeners a los nodos de cada objeto, para poder seleccionar objetos desde el menu
    crearControles () {
        let nodosObjeto = this.nodo.querySelectorAll(".Objeto");

        for (let i = 0; i < nodosObjeto.length; i++) {

            //listener en objetos no seleccionados
            if (!nodosObjeto[i].classList.contains("seleccionado")) {
                //si es seleccionable añadimos listener, sino no
                if (this.objetos[i].seleccionable) {
                    nodosObjeto[i].addEventListener("click", () => {
                        ControlesCanvas.seleccionarObjeto(this.objetos[i]);
                        canvas.focus();
                    });
                }
            }
        }

    }

}