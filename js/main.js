window.addEventListener('load', () => {
    main();
});

async function main () {
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
    
    renderer = new Renderer(0, 0, 20, 1920, 1080, controles);
    renderer.dibujar();
}