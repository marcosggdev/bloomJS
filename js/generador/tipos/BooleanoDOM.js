class BooleanoDOM {

    constructor (booleano) {
        this.booleano = Boolean(booleano);
        this.crearNodo();
    }

    crearNodo () {
        let input = document.createElement("input");
        input.type = "checkbox";
        this.nodo = input;
        input.addEventListener("click", () => {
            if (input.checked) {
                this.booleano = true;
                this.nodo.value = "true";
            } else {
                this.booleano = false;
                this.nodo.value = "false";
            }
        });

        if (this.booleano) {
            this.nodo.value = "true";
            this.nodo.checked = true;
        } else {
            this.nodo.value = "false";
            this.nodo.checked = false;
        }
    }

}