window.addEventListener('load', () => {

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

    //se encarga de dibujar en el canvas
    Renderer.iniciar(0, 0, 0, 640, 360);

    //cuando se crea un modelo, despues de cargarse se añade al renderer, y al añadirse se dibuja
    let fondoAzul = new Modelo2D(0, 0, -10, 0, 0, 0, 15, 6, "", VERTEX_SHADER_IMAGEN, FRAGMENT_SHADER_IMAGEN, Color.AZUL_CIELO);
    let nube = new Modelo2D(0, 0, -5, 0, 0, 0, 2, 2, "/bloomJS/assets/nube.png", VERTEX_SHADER_IMAGEN, FRAGMENT_SHADER_IMAGEN);
    let barril = new Modelo3D(0,-4, -5,0,0,90,3,3,3,"/bloomJS/assets/barril.dae");
    let aps = 60;
    let spa = 1 / aps;
    setInterval(Renderer.ciclo, spa);
});