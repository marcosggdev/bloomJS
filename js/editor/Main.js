window.addEventListener('load', () => {

    let ventanaCanvas = new VentanaCanvas();
    document.querySelector("main").appendChild(ventanaCanvas.nodo);

    //crear canvas y contexto webgl
    canvas = document.querySelector("canvas");
    if (!canvas) {
        console.log("Error al obtener el canvas");
        return;
    }
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Error al obtener el contexto del canvas");
        return;
    }

    //carga valores por defecto del css de elementos que cambian para guardarlos ante alteraciones
    Defecto.cargarValores();

    //se encarga de dibujar en el canvas
    Renderer.iniciar(0, 0, 20, 1920, 1080);

});