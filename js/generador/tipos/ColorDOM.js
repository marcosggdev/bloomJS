class ColorDOM {

    constructor (color) {
        this.color = color;
        this.crearNodo();
    }

    crearNodo () {
        let input = document.createElement("input");
        input.type = "color";
        input.value = this.color.hexadecimal;
        this.nodo = input;
    }

}