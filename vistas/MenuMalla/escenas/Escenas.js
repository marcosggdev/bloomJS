Array.from(document.querySelectorAll(".MallaEscenas .plantilla.escena")).forEach((plantilla) => {

    plantilla.addEventListener("click", () => {
        
        serializacion = plantilla.querySelector("#serializacion").value;

        id = plantilla.querySelector("#id").value;
        titulo = plantilla.querySelector("#titulo").value;
        descripcion = plantilla.querySelector("#descripcion").value;
 
        json = JSON.parse(serializacion);
        json.id = id;
        json.titulo = titulo;
        json.descripcion = descripcion;

        Escena.leerEscenaSerializada(JSON.stringify(json));
        VentanaCanvas.interfazCanvas.eliminarMenu(VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Escenas").nodo);
    });

});