//Este archivo tiene los diferentes shaders que se van a usar
//GOURAUD SHADING
var VERTEX_SHADER_GOURAUD2= 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform vec3 uJPos;\n" +
"uniform sampler2D sampler;\n" +
"uniform float texturizado;\n" + 
"uniform float ns;\n" +
"uniform vec3 ka;\n" +
"uniform vec3 kd;\n" +
"uniform vec3 ks;\n" +
"uniform vec3 ke;\n" +
"uniform float ni;\n" +
"uniform float d;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec3 iAmbiente;\n" +
"varying vec3 iDifusion;\n" +
"varying vec3 iEspecular;\n" +
"varying vec3 vColor;\n" +
"varying vec3 l;\n" +
"void main(){\n" +
"   vec3 lightColor = vec3(3.0,3.0,3.0);\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   vec3 luzPos = vec3(-10.0, 0.0, 0.0);\n" +
"   iAmbiente = lightColor * ka;\n" +
"   l = normalize(luzPos - (aPos - uJPos));\n" +
"   float cosDifusion = max(dot(vNorm, l), 0.0);\n" +
"   iDifusion = lightColor * (cosDifusion * kd);\n" +
"   vec3 r = normalize(reflect(-l, vNorm));\n" +
"   vec3 camaraPos = vec3(0.0, 0.0, 10.0);\n" +
"   vec3 v = normalize(-camaraPos);\n" +
"   iEspecular = lightColor * (max(0.0, pow(dot(r,v), 3.0)) * ks);\n" +
"   gl_Position = p * mv * vec4(aPos - uJPos, 1.0);\n" +
"   vNorm = aNorm;\n" +
"   if (texturizado == 1.0) vTex = aTex;\n" +
"   vColor = iAmbiente + iDifusion + iEspecular;\n" +
"}\n";

var FRAGMENT_SHADER_GOURAUD2 =
"precision highp float;\n" +
"varying vec3 vColor;\n" +
"varying vec2 vTex;\n" +
"uniform sampler2D sampler;\n" +
"uniform float texturizado;\n" + 
"uniform float ns;\n" +
"uniform vec3 ka;\n" +
"uniform vec3 kd;\n" +
"uniform vec3 ks;\n" +
"uniform vec3 ke;\n" +
"uniform float ni;\n" +
"uniform float d;\n" +
"void main(){\n" +
"   if (texturizado == 1.0) {\n" +
"       vec4 textura = texture2D(sampler, vTex);\n" +
"       gl_FragColor = vec4(vColor * textura.xyz, d*1.0);\n" +
"   } else {\n" + 
"       gl_FragColor = vec4(vColor, d*1.0);\n" +
"   }" + 
"}\n";

//PHONG 2 (materiales)
//PHONG SHADING
var VERTEX_SHADER_PHONG2 = 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform vec3 uJPos;\n" +
"uniform float texturizado;\n" + 
"uniform float ns;\n" +
"uniform vec3 ka;\n" +
"uniform vec3 kd;\n" +
"uniform vec3 ks;\n" +
"uniform vec3 ke;\n" +
"uniform float ni;\n" +
"uniform float d;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec3 vPos;\n" + 
"void main(){\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   gl_Position = p * mv * vec4(aPos - uJPos, 1.0);\n" +
"   if (texturizado == 1.0) vTex = aTex;\n" +
"   vPos = aPos - uJPos;\n" +
"}\n";

var FRAGMENT_SHADER_PHONG2 =
"precision mediump float;\n" +
"varying vec3 vNorm;\n" +
"varying vec3 vPos;\n" +
"uniform sampler2D sampler;\n" +
"uniform vec3 uJPos;\n" +
"uniform float texturizado;\n" + 
"uniform float ns;\n" +
"uniform vec3 ka;\n" +
"uniform vec3 kd;\n" +
"uniform vec3 ks;\n" +
"uniform vec3 ke;\n" +
"uniform float ni;\n" +
"uniform float d;\n" +
"varying vec2 vTex;\n" +
"void main(){\n" +
"   vec3 lightColor = vec3(3.0, 1.0, 1.0);" +
"   vec3 luzPos = vec3(-10.0, 0.0, 0.0);\n" +
"   vec3 iAmbiente = lightColor * ka;\n" +
"   vec4 iAmbiente = vec4(0.3 * colorBase.xyz, colorBase.w);\n" +
"   vec3 l = normalize(luzPos - (vPos - UJPos));\n" +
"   float cosDifusion = max(dot(l, vNorm), 0.0);\n" +
"   vec3 iDifusion = lightColor * (cosDifusion * kd);\n" +
"   vec3 r = normalize(reflect(-l, vNorm));\n" +
"   vec3 camaraPos = vec3(0.0, 0.0, 10.0);\n" +
"   vec3 v = normalize(-camaraPos);\n" +
"   vec4 iEspecular = lightColor * (max(0.0, pow(dot(r,v), 12.0)) * ks);\n" +
"   vec4 color = iAmbiente + iDifusion + iEspecular;\n" +
"   if (texturizado == 1.0) {" +
"       vec4 textura = texture2D(sampler, vTex);\n" +
"       gl_FragColor = color * textura.xyz, d * 1.0);\n" +
"   } else {" +
"       gl_FragColor = vec4(color, d * 1.0);\n" +
"   }" +
"}\n";

//GOURAUD SHADING
var VERTEX_SHADER_GOURAUD= 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform vec3 uJPos;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec4 iAmbiente;\n" +
"varying vec4 iDifusion;\n" +
"varying vec4 iEspecular;\n" +
"varying vec4 vColor;\n" +
"varying vec3 l;\n" +
"void main(){\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   vec4 colorBase = vec4(0.8 * vec3(1.0, 1.0, 1.0), 1.0);\n" +
"   vec3 luzPos = vec3(-10.0, 0.0, 0.0);\n" +
"   iAmbiente = vec4(0.3 * colorBase.xyz, colorBase.w);\n" +
"   l = normalize(vec3(luzPos - (aPos - uJPos)));\n" +
"   float cosDifusion = max(dot(l, vNorm), 0.0);\n" +
"   iDifusion = vec4(cosDifusion * colorBase.xyz, colorBase.w);\n" +
"   vec3 r = normalize(reflect(-l, vNorm));\n" +
"   vec3 camaraPos = vec3(0.0, 0.0, 10.0);\n" +
"   vec3 v = normalize(-camaraPos);\n" +
"   iEspecular = vec4(max(0.0, pow(dot(r,v), 4.0)) * colorBase.xyz, 1.0);\n" +
"   gl_Position = p * mv * vec4(aPos - uJPos, 1.0);\n" +
"   vNorm = aNorm;\n" +
"   vTex = aTex;\n" +
"   vColor = iAmbiente + iDifusion + iEspecular;\n" +
"}\n";

var FRAGMENT_SHADER_GOURAUD =
"precision mediump float;\n" +
"varying vec4 vColor;\n" +
"varying vec2 vTex;\n" +
"uniform sampler2D sampler;\n" +
"void main(){\n" +
"   vec4 textura = texture2D(sampler, vTex);\n" +
"   gl_FragColor = vec4(vColor.xyz * textura.xyz, 1.0);\n" +
"}\n";

//PHONG SHADING
var VERTEX_SHADER_PHONG = 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform vec3 uJPos;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec3 vPos;\n" + 
"void main(){\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   gl_Position = p * mv * vec4(aPos - uJPos, 1.0);\n" +
"   vTex = aTex;\n" +
"   vPos = aPos - uJPos;\n" +
"}\n";

var FRAGMENT_SHADER_PHONG =
"precision mediump float;\n" +
"varying vec3 vNorm;\n" +
"varying vec3 vPos;\n" +
"uniform sampler2D sampler;\n" +
"uniform vec3 uJPos;\n" +
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
"}\n";

//shaders jugador
//GOURAUD SHADING
var VERTEX_SHADER_JUGADOR_GOURAUD= 
"uniform mat4 mv;\n" +
"uniform mat4 m;\n" +
"uniform mat4 p;\n" +
"uniform sampler2D sampler;\n" +
"attribute vec3 aPos;\n" +
"attribute vec2 aTex;\n" +
"attribute vec3 aNorm;\n" +
"varying vec3 vNorm;\n" +
"varying vec2 vTex;\n" +
"varying vec4 iAmbiente;\n" +
"varying vec4 iDifusion;\n" +
"varying vec4 iEspecular;\n" +
"varying vec4 vColor;\n" +
"varying vec3 l;\n" +
"void main(){\n" +
"   vNorm = normalize((m * vec4(aNorm, 1.0)).xyz);\n" +
"   vec4 colorBase = vec4(0.8 * vec3(1.0, 1.0, 1.0), 1.0);\n" +
"   vec3 luzPos = vec3(-10.0, 0.0, 0.0);\n" +
"   iAmbiente = vec4(0.3 * colorBase.xyz, colorBase.w);\n" +
"   l = normalize(vec3(luzPos - (aPos)));\n" +
"   float cosDifusion = max(dot(l, vNorm), 0.0);\n" +
"   iDifusion = vec4(cosDifusion * colorBase.xyz, colorBase.w);\n" +
"   vec3 r = normalize(reflect(-l, vNorm));\n" +
"   vec3 camaraPos = vec3(0.0, 0.0, 10.0);\n" +
"   vec3 v = normalize(-camaraPos);\n" +
"   iEspecular = vec4(max(0.0, pow(dot(r,v), 4.0)) * colorBase.xyz, 1.0);\n" +
"   gl_Position = p * mv * vec4(aPos, 1.0);\n" +
"   vNorm = aNorm;\n" +
"   vTex = aTex;\n" +
"   vColor = iAmbiente + iDifusion + iEspecular;\n" +
"}\n";

var FRAGMENT_SHADER_JUGADOR_GOURAUD =
"precision mediump float;\n" +
"varying vec4 vColor;\n" +
"varying vec2 vTex;\n" +
"uniform sampler2D sampler;\n" +
"void main(){\n" +
"   vec4 textura = texture2D(sampler, vTex);\n" +
"   gl_FragColor = vec4(vColor.xyz * textura.xyz, 1.0);\n" +
"}\n";

//PHONG SHADING
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