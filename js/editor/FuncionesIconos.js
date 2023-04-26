function minimizar (boton) {
    if (boton.estado) {
        boton.deshabilitar();
        BotonIcono.buscarBotonPorId("maximizar").habilitar();
        Defecto.aplicarEstilosPorDefecto();
    }
}

function maximizar (boton) {
    if (boton.estado) {
        boton.deshabilitar();
        BotonIcono.buscarBotonPorId("minimizar").habilitar();
        document.querySelector("footer").style.display = "none";
        document.querySelector("div#cabecera").style.display = "none";
        document.querySelector("main").style.width = "100vw";
        document.querySelector("main").style.height = "100vh";
        document.querySelector("main").style.padding = "0";
        document.querySelector("#lienzo").style.padding = "0";
        document.querySelector("#lienzo").style.overflow = "hidden";
    }
}