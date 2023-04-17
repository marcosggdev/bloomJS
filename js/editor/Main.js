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

    renderer = new Renderer(0, 0, 20, 1920, 1080);

});

async function iniciarObjetos () {

}