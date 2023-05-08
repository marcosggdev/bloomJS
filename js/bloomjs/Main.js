/*
La librería bloomjs debe permitir ver un canvas con modelos, como codigo insertado en cualquier pagina
*/
window.addEventListener('load', () => {

    //crear canvas y contexto webgl
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    if (!canvas) {
        console.log("Error al obtener el canvas");
        return;
    }
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Error al obtener el contexto del canvas");
        return;
    }

    //camara que el renderer utiliza para dibujar
    let arcballCamera = new ArcballCamera(0, 0, 0, 30, -90, 30);
    //se encarga de dibujar en el canvas
    Renderer.iniciar(arcballCamera, 640, 480);

    //el menu global se actualiza cada vez que se añade o borra un grafico dibujable

    let veleta = new Modelo3D(0,3,0,0,90,0,1,1,1,"T", "/bloomJS/assets/defecto/modelos/veleta.dae", new Color(0.6,0.6,0.6,1.0), 
    "/bloomJS/assets/defecto/texturas/veleta.png", null);
    let grid = new Grid();
    let aps = 24;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);
});