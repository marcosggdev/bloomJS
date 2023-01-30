window.addEventListener('load', () => {
    //----------------------------------Operaciones sobre display del editor-------------------------------------
    guardarEstilos(); //seran modificados por codigo e interesa guardar los originales
    anadirBotonDesplegable("archivo", "Archivo", ["Nuevo", "Abrir", "Guardar"], [crear, abrir, guardar]);
    anadirBotonDesplegable("html", "HTML", ["Crear página", "Añadir elemento", "Abrir HTML"], [crearPagina, anadirHtml, abrirHtml]);
    anadirBotonIcono("../img/iconos/iconoMaximizar.png", 20, 20, maximizarEditor);
    anadirBotonIcono("../img/iconos/iconoMinimizar.png", 20, 20, minimizarEditor);
    maximizarEditor();

    //---MAIN----
    main();
});

function main () {
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

    controles = new Controles(canvas);

    renderer = new Renderer(0, 0, 1, 1920, 1080, controles);

    editor = new Editor();
}