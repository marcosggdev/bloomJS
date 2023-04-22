class BarraHerramientas {

    constructor (botones) {
        this.botones = botones;
        this.nodo = this.crearNodo(this.botones);
    }

    crearNodo (botones) {
        let div = document.createElement("div");
        div.id = "barraHerramientas";

        for (let i = 0; i < botones.length; i++) {
            div.appendChild(botones[i].nodo);
        }
        return div;
    }

}