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
    let camara = new ArcballCamera(0, 0, 0, 30, 0, 30);

    //crear renderer
    RendererRefactor.iniciar(1024, 768, new Color(80,80,80,255), camara, null);

    //crear contenedor DOM. Canvas tendra asociado el renderer y creamos interfaz de usuario. Pasamos el renderer y el canvas asociados
    //ancho y alto de resolucion definidos en Renderer. Despues escalado por js a width 100% height auto.
    let barraVentana = new BarraVentana("BloomJS - Editor", ["/bloomJS/img/iconos/minimizar.png", "/bloomJS/img/iconos/maximizar.png"],
    [BarraVentana.minimizar, BarraVentana.maximizar]);

    let interfazCanvas = new InterfazCanvas();

    let menuInterfaz = new MenuInterfaz(
        [
            new SubmenuEscena(interfazCanvas),
            new SubmenuInterfaz("Editor", 
                [
                    new BotonInterfaz("Controles", MenuInterfaz.controles),
                    new BotonInterfaz("Ajustes", ()=>{MenuInterfaz.ajustes(renderer)})
                ]),
        ]);

    VentanaCanvas.iniciar(barraVentana, menuInterfaz, interfazCanvas, canvas);

    let main = document.querySelector("main");
    main.appendChild(VentanaCanvas.nodo);

    window.requestAnimationFrame(RendererRefactor.ciclo);
});