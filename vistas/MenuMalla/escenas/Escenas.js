Array.from(document.querySelectorAll(".MallaEscenas .plantilla.escena")).forEach((plantilla) => {

    plantilla.addEventListener("click", () => {

        Escena.leerEscenaSerializada(plantilla.querySelector("#serializacion").value);
        VentanaCanvas.interfazCanvas.eliminarMenu(VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Escenas").nodo);
        Escena.id = plantilla.querySelector("#id_escena").value;
        
    });

});