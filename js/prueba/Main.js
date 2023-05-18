window.addEventListener('load', () => {

    //crear canvas
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

    //camara del renderer
    let camara = new ArcballCamera(0, 0, 0, 30, -90, 30);

    //crear renderer
    let renderer = new RendererRefactor(camara, 1024, 768, null, new Color(80,80,80,255));

    //pasar renderer permite utilizar en los objetos variables no estaticas del renderer como la camara
    let escena = new Escena(renderer);
    renderer.escena = escena;

    //crear contenedor DOM. Canvas tendra asociado el renderer y creamos interfaz de usuario. Pasamos el renderer y el canvas asociados
    //ancho y alto de resolucion definidos en Renderer. Despues escalado por js a width 100% height auto.
    let ventanaCanvas = new VentanaCanvas(renderer, canvas);
    document.body.appendChild(ventanaCanvas.nodo);

    let aps = 24;
    let spa = 1 / aps;
    setInterval(() => {renderer.ciclo()}, spa);


    //carga valores por defecto del css de elementos que cambian para guardarlos ante alteraciones
    //Defecto.cargarValores();

    //camara que el renderer utiliza para dibujar
    //let arcballCamera = new ArcballCamera(0, 0, 0, 30, -90, 30);

    //por defecto no existe escena => se pasa null como argumento
    /*Renderer.iniciar(arcballCamera, 1024, 768, null);
    */
});