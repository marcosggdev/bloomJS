class MenuGeneral {

    constructor (titulo) {
        this.titulo = titulo;
        this.nodo = this.crearNodo(titulo);
    }

    crearNodo (titulo) {
        let nodo = document.createElement("div");
        nodo.className = "MenuGeneral";

        let h1 = document.createElement("h1");
        h1.textContent = titulo;
        nodo.appendChild(h1);

        return nodo;
    }

}