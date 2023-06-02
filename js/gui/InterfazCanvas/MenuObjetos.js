class MenuObjetos extends MenuGeneral {

    constructor (titulo, objetos) {
        super(titulo);
        this.objetos = objetos;
        this.seleccionado = null;
        this.ampliarNodo(objetos);
    }

    ampliarNodo (objetos) {

        this.nodo.classList.add("MenuObjetos");

        let contenedorObjetos = document.createElement("div");
        contenedorObjetos.className = "ContenedorObjetos";

        if (objetos != null) {

            for (let i = 0; i < objetos.length; i++) {
                let objeto = document.createElement("div");
                objeto.className = "Objeto";

                if (objetos[i].seleccionable) {
                    objeto.classList.add("seleccionable");
                }

                objeto.textContent = objetos[i].constructor.name;
                contenedorObjetos.appendChild(objeto);
            }

        } else {
            let p = document.createElement("p");
            p.textContent = "No hay ningún objeto que mostrar...";
            contenedorObjetos.appendChild(p);
        }

        this.nodo.appendChild(contenedorObjetos);
    }

}