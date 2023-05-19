class MenuSeleccion extends MenuGeneral {

    constructor (titulo, modelo) {
        super(titulo);
        this.modelo = modelo;
        this.ampliarNodo(modelo);
    }

    ampliarNodo (modelo) {

        let contenedor = document.createElement("div");

        GUI.crearListaPestanas(contenedor, ["Objeto", "Adicional"], 0);

        this.nodo.appendChild(contenedor);

        for (let i = 0; i < modelo.supervalores.length; i++) {
            this.nodo.appendChild(modelo.supervalores[i].nodo);
        }
    }

}