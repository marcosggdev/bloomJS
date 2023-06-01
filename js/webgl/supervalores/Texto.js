class Texto extends Supervalor {

    constructor (variable, nombre, valor, editable) {

        super("Texto", variable, nombre, valor, editable);

        this.ampliarNodo();
    }

    ampliarNodo () {

        let valorInput = document.createElement("input");
        valorInput.value = this.valor;
        valorInput.type = "text";

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("input", (e) => {
            this.valor = e.target.value;
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

    }

}