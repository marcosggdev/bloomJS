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
    //se encarga de dibujar en el canvas
    Renderer.iniciar(arcballCamera, 640, 480);

    //el menu global se actualiza cada vez que se añade o borra un grafico dibujable

    //cuando se crea un modelo, despues de cargarse se añade al renderer, y al añadirse se dibuja
    //let blanco = new Modelo2D(0, 0, 0, 0, 0, 0, 1, 1, "/bloomJS/img/pluma.jpg", VERTEX_SHADER_IMAGEN, FRAGMENT_SHADER_IMAGEN);
    //let lienzo = new Lienzo();
    //let barril = new Modelo3D(0,0,0,0,0,0,1,1,1,"/bloomJS/assets/barril.dae");
    let luz = new PuntoLuz(0, 0, 0);

    let botonMaximizar = document.getElementById("maximizar");
    maximizar(botonMaximizar);

    //let hitbox = new Hitbox(barril);
    let grid = new Grid();
    let aps = 24;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);
});