class MenuSeleccion {

    constructor (lienzo) {
        this.crearNodo();
        lienzo.appendChild(this.nodo);
    }

    crearNodo () {
        let div = document.createElement("div");
        div.id = "menuSeleccion";

        let barraVentana = document.createElement("div");
        barraVentana.id = "menuSeleccionBarraVentana";

        div.appendChild(barraVentana);

        let h1 = document.createElement("h1");
        h1.textContent = "Menú de selección"

        div.appendChild(h1);

        let idModelo = document.createElement("p");
        idModelo.textContent = "Id: Modelo";

        div.appendChild(idModelo);

        this.nodo = div;
    }

    mostrar () {
        this.nodo.style.opacity = "1";
        console.log("1");
    }

    ocultar () {
        console.log("0");
        this.nodo.style.opacity = "0";
    }

}