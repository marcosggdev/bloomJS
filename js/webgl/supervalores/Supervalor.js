/**
 * supertipo que contenga: nombre de una variable de un objeto, el valor de la variable, y un nodo con la representacion
 * adecuada del dato.
 */
class Supervalor {

    constructor (tipo, variable, nombre, valor, editable) {

        this.tipo = tipo;
        this.variable = variable;
        this.nombre = nombre;
        this.valor = valor;
        this.editable = editable;
        
        this.crearNodo();
    }

    crearNodo () {

        let nodo = document.createElement("div");
        nodo.className = "Supervalor";

        let nombreDOM = document.createElement("p");
        nombreDOM.textContent = this.nombre;
        nodo.appendChild(nombreDOM);

        let contenedorValor = document.createElement("div");
        contenedorValor.className = "contenedorValor";

        let contenedorValorInput = document.createElement("div");
        contenedorValorInput.className = "InputPersonalizado " + this.tipo;

        nodo.appendChild(contenedorValorInput);
        this.nodo = nodo;
    }

    setValor (valor) {
        this.valor = valor;

        //reconstruir nodo
        this.nodo.querySelector(".InputPersonalizado").innerHTML = "";
        this.ampliarNodo();
    }

}