window.addEventListener('load', () => {

    //crear canvas
    canvas = document.createElement("canvas");
    if (!canvas) {
        console.log("Error al obtener el canvas");
        return;
    }
    let atributosContexto = { preserveDrawingBuffer: true };
    gl = canvas.getContext("webgl", atributosContexto);
    if (!gl) {
        console.log("Error al obtener el contexto del canvas");
        return;
    }
    canvas.tabIndex = 0;

    //camara del renderer
    let camara = new CamaraSimple(0, 0, 0);

    //crear renderer
    RendererRefactor.iniciar(1920, 1080, new Color(80,80,80,255), camara, null);

    //crear contenedor DOM. Canvas tendra asociado el renderer y creamos interfaz de usuario. Pasamos el renderer y el canvas asociados
    //ancho y alto de resolucion definidos en Renderer. Despues escalado por js a width 100% height auto.
    let barraVentana = new BarraVentana("BloomJS - Editor", ["/bloomJS/img/iconos/minimizar.png", "/bloomJS/img/iconos/maximizar.png"],
    [BarraVentana.minimizar, BarraVentana.maximizar]);

    let interfazCanvas = new InterfazCanvas();

    //menu de interfaz
    let menuInterfaz = new MenuInterfaz(
        [
            new SubmenuInterfaz("Imagen", [
                new BotonInterfaz("Crear", MenuInterfaz.crearImagen),
                new BotonInterfaz("Cargar", MenuInterfaz.cargarImagen),
                new BotonInterfaz("Guardar", MenuInterfaz.guardarImagen)
            ]),
            new BotonInterfaz("Exportar", MenuInterfaz.exportarImagen)
        ]);

    VentanaCanvas.iniciar(barraVentana, menuInterfaz, interfazCanvas, canvas);

    let main = document.querySelector("main");
    main.appendChild(VentanaCanvas.nodo);

    //escena del generador
    EscenaGenerador.crearEscenaGenerador(null)
    .then(
        function (escena) {
            RendererRefactor.escena = escena;
        }
    );

    //bucle principal
    window.requestAnimationFrame(RendererRefactor.ciclo);
});