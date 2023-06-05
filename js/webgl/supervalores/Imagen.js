class Imagen extends Supervalor {

    constructor (variable, nombre, valor, editable, funcion) {
        super("Imagen", variable, nombre, valor, editable);
        this.funcion = funcion;
        this.ampliarNodo();
    }

    ampliarNodo () {

        //contenedor
        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");

        //queremos: imagen de previsualizacion + input type file con ruta.

        //imagen
        let img = document.createElement("img");
        img.src = this.valor;
        contenedorValorInput.appendChild(img);

        //input
        let rutaInput = document.createElement("input");
        rutaInput.type = "text";
        rutaInput.value = this.valor;
        rutaInput.disabled = true;
        contenedorValorInput.appendChild(rutaInput);

        let valorInput = document.createElement("input");
        valorInput.type = "file";
        valorInput.addEventListener("input", (e) => {
            this.funcion(e.target.files[0]);
        });

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("input", (e) => {
            this.valor = e.target.value;
        });

        contenedorValorInput.appendChild(valorInput);
    }

}