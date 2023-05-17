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

    //camara que el renderer utiliza para dibujar
    let arcballCamera = new ArcballCamera(0, 0, 0, 30, -90, 30);

    //por defecto no existe escena => se pasa null como argumento
    Renderer.iniciar(arcballCamera, 1024, 768, null);
    let aps = 24;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);
});