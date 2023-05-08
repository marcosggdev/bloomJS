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
        div.className = "menuSeleccion menuPopUp";

        //barra de cierre k no borra el nodo sino solo lo oculta
        GUI.crearBarraCierreOcultar(div, "Selección");

        /*//boton para arrastrar hacia arriba y hacer mas grande el menu
        GUI.anadirBotonAltura(div, "/bloomJS/img/iconos/arriba.png");*/

        let dinamico = document.createElement("div");
        dinamico.id = "dinamico";
        div.appendChild(dinamico);

        let funcionalidades = document.createElement("div");
        funcionalidades.id = "funcionalidades";
        GUI.anadirIconoFuncional(funcionalidades, "/bloomJS/img/iconos/cerrar.png", function () {
            VentanaCanvas.eliminarSeleccionado();
        });
        div.appendChild(funcionalidades);

        let divActualizar = document.createElement("div");
        GUI.anadirNombreSelect(divActualizar, "Función actualizar",
            ["RotarX", "RotarY", "RotarZ", "Seleccion"], 
            [
                function () {
                    if (VentanaCanvas.objetoSeleccionado != null) {
                        VentanaCanvas.objetoSeleccionado.setFuncionActualizar("funcionRotarX");
                    }
                }, 
                function () {
                    if (VentanaCanvas.objetoSeleccionado != null) {
                        VentanaCanvas.objetoSeleccionado.setFuncionActualizar("funcionRotarY");
                    }
                }, 
                function () {
                    if (VentanaCanvas.objetoSeleccionado != null) {
                        VentanaCanvas.objetoSeleccionado.setFuncionActualizar("funcionRotarZ");
                    }
                }, 
                function () {
                    if (VentanaCanvas.objetoSeleccionado != null) {
                        VentanaCanvas.objetoSeleccionado.setFuncionActualizar("funcionSeleccion");
                    }
                }
            ]);
        div.appendChild(divActualizar);

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

        GUI.anadirGrupoNombresValoresEditablesModelo(dinamico, modelo, ["x", "y", "z"], [modelo.posX, modelo.posY, modelo.posZ], 
        ["posX", "posY", "posZ"], "posicionesColumna", "number", 1, false);

        GUI.anadirGrupoNombresValoresEditablesModelo(dinamico, modelo, ["Ángulo X", "Ángulo Y", "Ángulo Z"], 
        [modelo.anguloX, modelo.anguloY, modelo.anguloZ], ["anguloX", "anguloY", "anguloZ"], "posicionesColumna", "number", 10, false);

        GUI.anadirGrupoNombresValoresEditablesModelo(dinamico, modelo, ["Factor X", "Factor Y", "Factor Z"], 
        [modelo.factorX, modelo.factorY, modelo.factorZ], ["factorX", "factorY", "factorZ"], "posicionesColumna", "number", 0.5, true);
    }

}