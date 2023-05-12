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
    
    let lienzo = document.getElementById("lienzo");
    lienzo.appendChild(canvas);

    //camara que el renderer utiliza para dibujar
    let arcballCamera = new ArcballCamera(0, 0, 0, 30, 0, 0);
    //se encarga de dibujar en el canvas
    Renderer.iniciar(arcballCamera, 640, 480);

    let grid = new GridGenerador();
    let aps = 24;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);   
});