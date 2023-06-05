class Select extends Supervalor {

    constructor (variable, nombre, valor, editable, opciones) {
        super("Select", variable, nombre, valor, editable);
        this.opciones = opciones;
        this.ampliarNodo();
    }

    ampliarNodo () {

        let valorInput = document.createElement("select");

        for (let i = 0; i < this.opciones.length; i++) {
            let opcion = document.createElement("option");
            opcion.value = this.opciones[i];
            opcion.textContent = this.opciones[i];
            valorInput.appendChild(opcion);

            if (this.valor = this.opciones[i]) {
                opcion.selected = true;
            }
        }

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("change", (e) => {
            this.valor = e.target.value;
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

    }

}