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
        this.nodo = this.crearNodo(variable, nombre, valor);
    }

    crearNodo (variable, nombre, valor) {

        let nodo = document.createElement("div");
        nodo.className = "Supervalor";

        let nombreDOM = document.createElement("p");
        nombreDOM.textContent = nombre;
        nodo.appendChild(nombreDOM);

        let contenedorValor = document.createElement("div");
        contenedorValor.className = "contenedorValor";

        let valorDOM = document.createElement("input");

        switch (typeof valor) {
            case "number":
                valorDOM.type = "range";
                valorDOM.min = -50;
                valorDOM.max = 50;
                valorDOM.step = 0.1;
                valorDOM.value = valor;
                valorDOM.addEventListener("input", () => {
                    this.objeto.actualizarValor(variable, valorDOM.value);  
                });
                break;
            case "Color":
                valorDOM.type="color";
                valorDOM.value = valor.toString();
                break;
            default: 
                valorDOM.addEventListener("input", (e) => {
                    this.objeto.actualizarValor(variable, e.target.value);
                });
                if (valor == null) {
                    valorDOM.value = "null";
                } else {
                    valorDOM.value = valor;
                }
                break;
        }


        nodo.appendChild(valorDOM);

        return nodo;
    }

}