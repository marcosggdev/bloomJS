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

        let valorDOM = document.createElement("input");
        switch (typeof valor) {
            case "number":
                valorDOM.type = "number";
                valorDOM.step = 1;
                valorDOM.value = valor;
                break;
            case "Color":
                valorDOM.type="text";
                valorDOM.value = valor.toString();
                break;
            default: 
                if (valor == null) {
                    valorDOM.value = "null";
                } else {
                    valorDOM.value = valor;
                }
                break;
        }

        //cambiar input = cambiar objeto
        valorDOM.addEventListener("input", (e) => {
            this.objeto.actualizarValor(variable, e.target.value);
        });

        nodo.appendChild(valorDOM);

        return nodo;
    }

}