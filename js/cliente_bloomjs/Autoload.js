
RUTA_BLOOM = "/prueba/js/cliente_bloomjs/";
NOMBRE_ESCENA = "Escena.json";

let archivos = [

    //estilo
    RUTA_BLOOM + "Canvas.css",

    //matematicas
    RUTA_BLOOM + "webgl/matematicas/Matriz2x2.js",
    RUTA_BLOOM + "webgl/matematicas/Matriz3x3.js",
    RUTA_BLOOM + "webgl/matematicas/Matriz4x4.js",
    RUTA_BLOOM + "webgl/matematicas/Quaternion.js",
    RUTA_BLOOM + "webgl/matematicas/Vector4x1.js",

    //supervalores
    RUTA_BLOOM + "webgl/supervalores/Supervalor.js",
    RUTA_BLOOM + "webgl/supervalores/Booleano.js",
    RUTA_BLOOM + "webgl/supervalores/ColorS.js",
    RUTA_BLOOM + "webgl/supervalores/Numerico.js",
    RUTA_BLOOM + "webgl/supervalores/Select.js",
    RUTA_BLOOM + "webgl/supervalores/SelectCompuesto.js",
    RUTA_BLOOM + "webgl/supervalores/Texto.js",

    //resto de archivos de webgl
    RUTA_BLOOM + "webgl/ArcballCamera.js",
    RUTA_BLOOM + "webgl/CamaraSimple.js",
    RUTA_BLOOM + "webgl/Color.js",
    RUTA_BLOOM + "webgl/Dae.js",
    RUTA_BLOOM + "webgl/Dibujable.js",
    RUTA_BLOOM + "webgl/Escena.js",
    RUTA_BLOOM + "webgl/EscenaGenerador.js",
    RUTA_BLOOM + "webgl/GLSL.js",
    RUTA_BLOOM + "webgl/Grupo.js",
    RUTA_BLOOM + "webgl/Hitbox.js",
    RUTA_BLOOM + "webgl/LineaRecta.js",
    RUTA_BLOOM + "webgl/Matematicas.js",
    RUTA_BLOOM + "webgl/Material.js",
    RUTA_BLOOM + "webgl/Modelo2D.js",
    RUTA_BLOOM + "webgl/Lienzo.js",
    RUTA_BLOOM + "webgl/Grid.js",
    RUTA_BLOOM + "webgl/GridGenerador.js",
    RUTA_BLOOM + "webgl/Modelo3D.js",
    RUTA_BLOOM + "webgl/PuntoLuz.js",
    RUTA_BLOOM + "webgl/Renderer.js",
    RUTA_BLOOM + "webgl/RendererRefactor.js",
    RUTA_BLOOM + "webgl/Triangulo.js",
    RUTA_BLOOM + "webgl/Utilidades.js",
    RUTA_BLOOM + "Main.js"

];

let head = document.querySelector("head");
for (let i = 0; i < archivos.length; i++) {

    //script
    if (archivos[i].match(/.js$/)) {

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = archivos[i];
        script.async = false;
        head.appendChild(script);

    } else if (archivos[i].match(/.css$/)) {

        //estilo
        let estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href = archivos[i];
        head.appendChild(estilo);

    }

}
