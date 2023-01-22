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


/*//PHONG SHADING
var VERTEX_SHADER_JUGADOR_PHONG = 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec3 vPos;\n" + 
"void main(){\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   gl_Position = p * mv * vec4(aPos, 1.0);\n" +
"   vTex = aTex;\n" +
"   vPos = aPos;\n" +
"}\n";

var FRAGMENT_SHADER_JUGADOR_PHONG =
"precision mediump float;\n" +
"varying vec3 vNorm;\n" +
"varying vec3 vPos;\n" +
"uniform sampler2D sampler;\n" +
"varying vec2 vTex;\n" +
"void main(){\n" +
"   vec4 colorBase = vec4(0.8 * vec3(1.0, 1.0, 1.0), 1.0);\n" +
"   vec3 luzPos = vec3(-10.0, 0.0, 0.0);\n" +
"   vec4 iAmbiente = vec4(0.3 * colorBase.xyz, colorBase.w);\n" +
"   vec3 l = normalize(vec3(luzPos - vPos));\n" +
"   float cosDifusion = max(dot(l, vNorm), 0.0);\n" +
"   vec4 iDifusion = vec4(cosDifusion * colorBase.xyz, colorBase.w);\n" +
"   vec3 r = normalize(reflect(-l, vNorm));\n" +
"   vec3 camaraPos = vec3(0.0, 0.0, 10.0);\n" +
"   vec3 v = normalize(-camaraPos);\n" +
"   vec4 iEspecular = vec4(max(0.0, pow(dot(r,v), 4.0)) * colorBase.xyz, 1.0);\n" +
"   vec4 textura = texture2D(sampler, vTex);\n" +
"   vec4 color = iAmbiente + iDifusion + iEspecular;\n" +
"   gl_FragColor = vec4(color.xyz * textura.xyz, 1.0);\n" +
"}\n";*/

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