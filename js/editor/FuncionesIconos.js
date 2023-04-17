function minimizar (boton) {
    if (boton.estado) {
        boton.nodo.className = "iconoDesha"
        console.log("minimizar");
        boton.nodo.className = "iconoDeshabilitado";
        let botonMaximizar = Icono.buscarBotonPorId("maximizar");
        botonMaximizar.nodo.className = "iconoHabilitado";
        botonMaximizar.estado = true;
        boton.estado = false;
    }
}

function maximizar (boton) {
    if (boton.estado) {
        boton.nodo.className = "iconoDeshabilitado";
        boton.estado = false;
        document.getElementById("minimizar").className = "iconoHabilitado";
        BotonIcono.buscarBotonPorId("minimizar").estado = true;
        console.log("maximizar");
    }
}