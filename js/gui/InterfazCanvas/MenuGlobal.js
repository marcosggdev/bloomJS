class MenuGlobal extends MenuObjetos {

    constructor (titulo, objetos) {
        super(titulo, objetos);
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

    //reconstruir nodo en base a los objetos que tenemos en "objetos"
    actualizarNodo () {
        let contenedor = this.nodo.querySelector(".ContenedorObjetos");
        contenedor.innerHTML = "";

        for (let i = 0; i < this.objetos.length; i++) {
            let nombre = document.createElement("p");
            nombre.textContent = this.objetos[i].constructor.name;
            nombre.className = "Clase";
            contenedor.appendChild(nombre);
        }
    }

}