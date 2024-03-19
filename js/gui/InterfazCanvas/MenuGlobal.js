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
                let nombre = this.objetos[i].nombre;
                if (typeof(nombre) === "undefined") {
                    nombre = "Sin definir";
                }
                objeto.textContent = this.objetos[i].constructor.name + " - " + nombre;
                contenedorObjetos.appendChild(objeto);

                if (this.objetos[i].seleccionable) {
                    objeto.classList.add("seleccionable");
                }

                if (this.objetos[i] == this.seleccionado) {
                    objeto.classList.add("seleccionado");

                    //Boton para borrar objeto
                    let botonBorrar = document.createElement("img");
                    botonBorrar.src = "/img/iconos/borrar.png";
                    botonBorrar.className = "BotonIcono";
                    botonBorrar.addEventListener("click", () => {
                        let dialog = document.createElement("dialog");
                        let mensaje = document.createElement("p");
                        mensaje.textContent = "¿Está seguro de que desea eliminar el modelo: " + this.objetos[i].nombre + "?";
                        dialog.appendChild(mensaje);
                        
                        let botonera = document.createElement("div");
                        botonera.className = "botonera";
                        dialog.appendChild(botonera);

                        let aceptar = document.createElement("button");
                        aceptar.className = "boton-aceptar";
                        aceptar.textContent = "Aceptar";
                        aceptar.addEventListener("click", () => {
                            RendererRefactor.escena.eliminarDibujable(ControlesCanvas.objetoSeleccionado);
                            //la llamada anterior va a actualizar el nodo del menu global
                            dialog.close();
                            dialog.remove();
                        });
                        botonera.appendChild(aceptar);

                        let cancelar = document.createElement("button");
                        cancelar.className = "boton-cancelar";
                        cancelar.textContent = "Cancelar";
                        cancelar.addEventListener("click", () => {
                            dialog.close();
                            dialog.remove();
                        });
                        botonera.appendChild(cancelar);

                        document.body.appendChild(dialog);
                        dialog.showModal();
                    });

                    objeto.appendChild(botonBorrar);

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