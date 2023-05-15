class NumericoDOM {

    constructor (numero, min, max, step) {
        this.numero = numero;
        this.min = min;
        this.max = max;
        this.step = step;
        this.crearNodo();
    }

    crearNodo () {
        let input = document.createElement("input");
        input.type = "number";
        input.min = this.min;
        input.max = this.max;
        input.step = this.step;
        input.value = this.numero;
        
        this.nodo = input;
    }

}