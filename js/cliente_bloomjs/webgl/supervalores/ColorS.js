class ColorS extends Supervalor {

    constructor (variable, nombre, valor, editable) {

        super("ColorS", variable, nombre, valor, editable);

        this.ampliarNodo();
    }

    ampliarNodo () {

        let valorInput = document.createElement("input");
        valorInput.type = "color";

        //si es null, no aplicamos value
        if (this.valor != null) {
            valorInput.value = this.valor.hexadecimal.substring(0, this.valor.hexadecimal.length - 2);
        }

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("input", (e) => {
            //#123456
            let colorHexa = e.target.value;
            this.valor = Color.leerHexa6(colorHexa);
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

    }

}