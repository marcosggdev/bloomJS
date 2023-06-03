class Numerico extends Supervalor {

    constructor (variable, nombre, valor, editable, min, max, step) {

        super("Numerico", variable, nombre, valor, editable);

        this.min = min;
        this.max = max;
        this.step = step;

        this.ampliarNodo();
    }

    ampliarNodo () {

        let valorInput = document.createElement("input");
        valorInput.type = "range";
        valorInput.min = this.min;
        valorInput.max = this.max;
        valorInput.step = this.step;
        valorInput.value = this.valor;

        if (!this.editable) {
            valorInput.disabled = true;
        }

        valorInput.addEventListener("input", (e) => {
            this.valor = e.target.value;
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

        /*
        switch (this.tipo) {

            case "NumericoPositivo":
                valorInput.type = "range";
                valorInput.min = 0;
                valorInput.max = 2;
                valorInput.step = 0.01;
                valorInput.value = this.valor;
                valorInput.addEventListener("input", () => {
                    this.objeto.actualizarValor(this.tipo, this.variable, valorInput.value);  
                });
                break;

            case "Smallint":
                valorInput.type = "number";
                valorInput.min = -8;
                valorInput.max = 8;
                valorInput.step = 1;
                valorInput.value = this.valor;
                valorInput.addEventListener("input", () => {
                    this.objeto.actualizarValor(this.tipo, this.variable, valorInput.value);  
                });
                break;

            case "Periodo":
                valorInput.type = "range";
                valorInput.min = 0;
                valorInput.max = 10;
                valorInput.step = 0.01;
                valorInput.value = this.valor;
                valorInput.addEventListener("input", () => {
                    this.objeto.actualizarValor(this.tipo, this.variable, valorInput.value);  
                });
                break;

            case "Shader": 
                let img = document.createElement("img");
                img.src = "/bloomJS/img/iconos/shader.png";
                contenedorValorInput.appendChild(img);
                valorInput.type = "text";
                valorInput.value = this.valor;
                break;

            case "Textura": 
                let img2 = document.createElement("img");
                img2.src = "/bloomJS/img/iconos/textura.png";
                contenedorValorInput.appendChild(img2);
                valorInput.type = "text";
                valorInput.value = this.valor;
                if (this.valor == null) {
                    valorInput.value = "null";
                }
                break;

            case "Material": 
                let img3 = document.createElement("img");
                img3.src = "/bloomJS/img/iconos/material.png";
                contenedorValorInput.appendChild(img3);
                valorInput.type = "text";
                valorInput.value = this.valor;
                if (this.valor == null) {
                    valorInput.value = "null";
                }
                break;

            case "boton":
                valorInput.type = "text";
                valorInput.value = this.valor;
                if (this.valor == null) {
                    valorInput.value = "null";
                }
                break;

            default: 
                valorInput.addEventListener("input", (e) => {
                    this.objeto.actualizarValor(this.variable, e.target.value);
                });
                if (this.valor == null) {
                    valorInput.value = "null";
                } else {
                    valorInput.value = this.valor;
                }
                break;
        }

        if (this.editable) {
            valorInput.disabled = false;
        } else {
            valorInput.disabled = true;
        }
        */ 
    }

}