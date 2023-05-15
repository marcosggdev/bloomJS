class BooleanoDOM {

    constructor (booleano) {
        this.booleano = booleano;
        this.crearNodo();
    }

    crearNodo () {
        let input = document.createElement("input");
        input.type = "checkbox";
        this.nodo = input;
    }

}