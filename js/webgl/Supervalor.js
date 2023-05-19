/**
 * supertipo que contenga: nombre de una variable de un objeto, el valor de la variable, y un nodo con la representacion
 * adecuada del dato.
 */
class Supervalor {

    constructor (objeto, variable, nombre, valor) {
        this.objeto = objeto;
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
        }

        //cambiar input = cambiar objeto
        valorDOM.addEventListener("input", (e) => {
            this.objeto[variable] = e.target.value;
        });

        nodo.appendChild(valorDOM);

        return nodo;
    }

}