var VERTEX_IMAGEN_2D =
"uniform mat4 m;\n" + 
"uniform mat4 v;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"varying vec2 vTex;\n" +
"void main(){\n" +
"   gl_Position = v * m * vec4(aPos, 1.0);\n" +
"   vTex = aTex;\n" +
"}\n";

var FRAGMENT_IMAGEN_2D =
"precision mediump float;\n" +
"uniform sampler2D sampler;\n" +
"varying vec2 vTex;\n" +
"void main(){\n" +
"   gl_FragColor = texture2D(sampler, vTex);\n" +
"}\n";

function crearShader (gl, tipo, codigoGLSL) {
    var shader = gl.createShader(tipo);
    gl.shaderSource(shader, codigoGLSL);
    gl.compileShader(shader);
    var exito = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (exito) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
    
function crearPrograma (gl, VSHADER, FSHADER) {
    var programa = gl.createProgram();
    gl.attachShader(programa, VSHADER);
    gl.attachShader(programa, FSHADER);
    gl.linkProgram(programa);
    var exito = gl.getProgramParameter(programa, gl.LINK_STATUS);
    if (exito) {
        return programa;
    }
    console.log(gl.getProgramInfoLog(programa));
    gl.deleteProgram(programa);
}