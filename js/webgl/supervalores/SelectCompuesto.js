//select para varios valores. Por ejemplo: resolucion x e y
class SelectCompuesto {

    //se pasan 2 supervalores de select ya creados (y asignados a sus variables)
    constructor (select1, select2, variable, funcionSetter, nombre, separador, editable) {

        this.select1 = select1;
        this.select2 = select2;
        this.variable = variable;
        this.funcionSetter = funcionSetter;
        this.nombre = nombre;
        this.separador = separador;
        this.editable = editable;
        this.tipo = "SelectCompuesto";
        this.valor = select1.valor + this.separador + select2.valor;
        this.crearOpciones();
        this.crearNodo();
        this.ampliarNodo();

    }

    crearOpciones () {
        let opciones = [];
        for (let i = 0; i < this.select1.opciones.length; i++) {
            opciones.push(this.select1.opciones[i] + this.separador + this.select2.opciones[i]);
        }
        this.opciones = opciones;
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

    //creacion del select con los valores compuestos de los 2 supervalores, que son selects también. Asociacion 1:1 en orden
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
            let valor1 = this.valor.split(this.separador)[0];
            let valor2 = this.valor.split(this.separador)[1];
            this.select1.valor = valor1;
            this.select2.valor = valor2;
            if (this.funcionSetter != null) {
                this.funcionSetter(this);
            }
        });

        let contenedorValorInput = this.nodo.querySelector(".InputPersonalizado");
        contenedorValorInput.appendChild(valorInput);

    }

    setValor (valor) {
        this.valor = valor;

        //reconstruir nodo
        this.nodo.querySelector(".InputPersonalizado").innerHTML = "";
        this.ampliarNodo();
    }

}