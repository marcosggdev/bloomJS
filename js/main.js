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

    renderer = new Renderer(0, 0, 1, 1920, 1080, controles);

    graficos2D = new Graficos2D();
    /*let imagen = await Imagen2D.crearImagen2D();
    graficos2D = [imagen];*/

    //setInterval("renderer.ciclo()", 1000);
    renderer.dibujar();
}

class Graficos2D {
    constructor (arrayGraficos2D = []) {
        this.arrayGraficos2D = arrayGraficos2D;
    }

    actualizar () {
        renderer.dibujar();
    }

    insertarGrafico2D (imagen2D) {
        this.arrayGraficos2D.push(imagen2D);
        this.actualizar();
    }
}