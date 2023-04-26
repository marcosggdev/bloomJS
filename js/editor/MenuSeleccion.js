class MenuSeleccion {

    static modelo = null;

    constructor (lienzo) {
        this.crearNodo();
        lienzo.appendChild(this.nodo);
    }

    crearNodo () {
        //menu como tal
        let div = document.createElement("div");
        div.id = "menuSeleccion";

        //menu permanente: barra de minimizar, etc... y titulo
        let estatico = document.createElement("div");
        estatico.id = "estatico";

        //barra para cerrarlo si molesta
        let barraVentana = document.createElement("div");
        barraVentana.id = "menuSeleccionBarraVentana";
        estatico.appendChild(barraVentana);

        //titulo
        let h1 = document.createElement("h1");
        h1.textContent = "Selección"
        estatico.appendChild(h1);

        let dinamico = document.createElement("div");
        dinamico.id = "dinamico";

        div.appendChild(estatico);
        div.appendChild(dinamico);

        this.nodo = div;
    }

    mostrar (modelo) {
        this.nodo.style.opacity = "1";
        this.modelo = modelo;
        this.actualizarDatos(modelo);
        this.nodo.style.pointerEvents = "all";
    }

    ocultar () {
        this.nodo.style.opacity = "0";
        this.modelo = null;
        this.nodo.style.pointerEvents = "none";
    }

    actualizarDatos (modelo) {
        let dinamico = this.nodo.querySelector("#dinamico");
        dinamico.innerHTML = "";

        GUI.anadirLineaNombresValoresEditables(dinamico, modelo, ["x", "y", "z"], [modelo.posX, modelo.posY, modelo.posZ], ["posX", "posY", "posZ"], "posicionesFila");
        
        GUI.anadirNombreValorEditable(dinamico, "Ángulo X", modelo.anguloX);
        GUI.anadirNombreValorEditable(dinamico, "Ángulo Y", modelo.anguloY);
        GUI.anadirNombreValorEditable(dinamico, "Ángulo Z", modelo.anguloZ);

        
    }

}