/**
 * supertipo que contenga: nombre de una variable de un objeto, el valor de la variable, y un nodo con la representacion
 * adecuada del dato.
 */
class Supervalor {

    constructor (objeto, tipo, variable, nombre, valor) {
        this.objeto = objeto;
        this.tipo = tipo;
        this.variable = variable;
        this.nombre = nombre;
        this.valor = valor;
        this.nodo = this.crearNodo(variable, nombre, valor, tipo);
    }

    crearNodo (variable, nombre, valor, tipo) {

        let nodo = document.createElement("div");
        nodo.className = "Supervalor";

        let nombreDOM = document.createElement("p");
        nombreDOM.textContent = nombre;
        nodo.appendChild(nombreDOM);

        let contenedorValor = document.createElement("div");
        contenedorValor.className = "contenedorValor";

        let contenedorValorInput = document.createElement("div");
        contenedorValorInput.className = "InputPersonalizado " + tipo;
        let valorInput = document.createElement("input");

        switch (tipo) {

            case "Numerico":
                valorInput.type = "range";
                valorInput.min = -50;
                valorInput.max = 50;
                valorInput.step = 0.1;
                valorInput.value = valor;
                valorInput.addEventListener("input", () => {
                    this.objeto.actualizarValor(variable, valorInput.value);  
                });
                break;

            case "Shader": 
                let img = document.createElement("img");
                img.src = "/bloomJS/img/iconos/shader.png";
                contenedorValorInput.appendChild(img);
                valorInput.type = "text";
                valorInput.disabled = true;
                valorInput.value = valor;
                break;

            case "Color":
                valorInput.type="color";
                //en el futuro habra que convertir el valor (Color) en un string #123456 para aplicarlo al input
                //el hexa si estuviese en rgb estaria en rango 0-255 cada color
                valorInput.value = valor;
                if (valor == null) {
                    valorInput.value = "#ffffff";
                }
                valorInput.disabled = true;
                break;

            case "Textura": 
                let img2 = document.createElement("img");
                img2.src = "/bloomJS/img/iconos/textura.png";
                contenedorValorInput.appendChild(img2);
                valorInput.type = "text";
                valorInput.disabled = true;
                valorInput.value = valor;
                if (valor == null) {
                    valorInput.value = "null";
                }
                break;

            case "Material": 
                let img3 = document.createElement("img");
                img3.src = "/bloomJS/img/iconos/material.png";
                contenedorValorInput.appendChild(img3);
                valorInput.type = "text";
                valorInput.disabled = true;
                valorInput.value = valor;
                if (valor == null) {
                    valorInput.value = "null";
                }
                break;

            case "boton":
                valorInput.type = "text";
                valorInput.disabled = true;
                valorInput.value = valor;
                if (valor == null) {
                    valorInput.value = "null";
                }
                break;

            default: 
            valorInput.addEventListener("input", (e) => {
                    this.objeto.actualizarValor(variable, e.target.value);
                });
                if (valor == null) {
                    valorInput.value = "null";
                } else {
                    valorInput.value = valor;
                }
                break;
        }

        contenedorValorInput.appendChild(valorInput);
        nodo.appendChild(contenedorValorInput);

        return nodo;
    }

    actualizarValor (valor, tipo) {
        this.valor = valor;
        this.actualizarNodo(valor, tipo);
    }

    actualizarNodo (valor, tipo) {
        let input = this.nodo.querySelector("input");
        switch (tipo) {
            case "Color": 
            
                break;
            default:
                input.value = valor;
                break;
        }
    }

}