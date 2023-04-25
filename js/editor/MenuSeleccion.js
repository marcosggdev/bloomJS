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
        h1.textContent = "Menú de selección"
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
    }

    actualizarDatos (modelo) {
        let dinamico = this.nodo.querySelector("#dinamico");
        dinamico.innerHTML = "";
        GUI.anadirNombreValor(dinamico, "Posición X", modelo.posX);
        GUI.anadirNombreValor(dinamico, "Posición Y", modelo.posY);
        GUI.anadirNombreValor(dinamico, "Posición Z", modelo.posZ);
        
        GUI.anadirNombreValor(dinamico, "Ángulo X", modelo.anguloX);
        GUI.anadirNombreValor(dinamico, "Ángulo Y", modelo.anguloY);
        GUI.anadirNombreValor(dinamico, "Ángulo Z", modelo.anguloZ);
    }

    ocultar () {
        this.nodo.style.opacity = "0";
        this.modelo = null;
    }

}