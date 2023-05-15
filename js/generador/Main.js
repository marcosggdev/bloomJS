window.addEventListener('load', () => {

    //crear canvas y contexto webgl
    canvas = document.createElement("canvas");
    if (!canvas) {
        console.log("Error al obtener el canvas");
        return;
    }
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Error al obtener el contexto del canvas");
        return;
    }

    let contenedorCanvas = document.querySelector(".contenedorCanvas");
    contenedorCanvas.appendChild(canvas);

    GUIGenerador.crearInterfaz(document.querySelector(".ventana .barra"));

    //camara que el renderer utiliza para dibujar
    let camaraSimple = new CamaraSimple(0, 0, 0);
    //se encarga de dibujar en el canvas
    Renderer.iniciar(camaraSimple, 1024, 768);

   // let grid = new GridGenerador();
    let aps = 24;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);   
});