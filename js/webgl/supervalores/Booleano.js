class Booleano extends Supervalor {

    constructor (variable, nombre, valor, editable) {

        super("Booleano", variable, nombre, valor, editable);
        this.ampliarNodo();

    }

    ampliarNodo () {

        let valorInput = document.createElement("input");
        valorInput.type = "checkbox";
        if (this.valor) {
            valorInput.checked = true;
        }

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("change", (e) => {
            if (e.target.checked) {
                this.valor = true;
            } else {
                this.valor = false;
            }
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

    }

}