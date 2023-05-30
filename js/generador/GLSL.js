//------------------------------------------GRID-GENERADOR--------------------------------------ç
var VERTEX_SHADER_GRID_GENERADOR = 
"precision mediump float;\n" +

"uniform mat4 m;\n" +
"uniform mat4 v;\n" +
"uniform mat4 mInversa;\n"+
"uniform mat4 vInversa;\n"+

"attribute vec3 aPos;\n" +
"varying vec3 vPos;\n"+
"varying vec3 nearPoint;\n"+
"varying vec3 farPoint;\n"+

"void main() {\n" +
"   gl_Position = v * m * vec4(aPos, 1.0);\n"+
"   vPos = aPos;\n"+
"}\n";

var FRAGMENT_SHADER_GRID_GENERADOR = 
"precision mediump float;\n" +

"uniform mat4 m;\n" +
"uniform mat4 v;\n" +
"uniform mat4 mInversa;\n"+
"uniform mat4 vInversa;\n"+

"varying vec3 nearPoint;\n"+
"varying vec3 farPoint;\n"+
"varying vec3 vPos;\n"+

"void main() {\n" +
//usamos coords attribute pero aplicamos m porque el plano esta rotado. No se aplican v ni p para estar en world space
"    vec4 unprojectedVector =  m * vec4(vPos.xyz, 1.0);\n"+
//fade con la lejania
"    float distanciaRenderizado = 50.0;"+
"    float distanciaVisionMinima = 20.0;"+
"    float grosor = 0.002;"+
"    float offset = 0.3;"+
"    float distanciaCentro = pow(pow(unprojectedVector.x, 2.0) + pow(unprojectedVector.y, 2.0), 0.5);" +
//grid
"    if (distanciaCentro > distanciaRenderizado) { discard;}"+
//multiplicamos offset por 16/9, rel aspecto => cuadrados reales (sino serian rectangulos por tener mas ancho que alto)
"    if (mod(unprojectedVector.x, offset) < grosor || mod(unprojectedVector.y, offset*16.0/9.0) < grosor) {" +
//ejes
"       if (abs(unprojectedVector.x) < grosor) {"+
"           gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);"+ 
"       } else if (abs(unprojectedVector.y) < grosor) {"+
"           gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);"+
"       } else {"+
"           gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);"+
"       }"+
"   } else {"+
//descartamos fragment => relleno del grid transparente y no se procesan tantos pixeles
"       discard;"+
"   }"+
"}\n";

//------------------------------------------ONDA-ESFERICA---------------------------------
var VERTEX_SHADER_ONDA_ESFERICA = 

"uniform mat4 m;\n" +
"uniform mat4 v;\n" +

"attribute vec3 aPos;\n" +
"varying vec3 vPos;"+

"void main(){\n" +
"   gl_Position = v * m * vec4(aPos, 1.0);\n" +
"   vPos = aPos;"+
"}\n";

var FRAGMENT_SHADER_ONDA_ESFERICA =
"precision mediump float;\n" +

"uniform vec4 uColor;\n"+
"varying vec3 vPos;"+

"void main() {\n" +
"   float r = pow(pow(vPos.x,2.0) + pow(vPos.y, 2.0),0.5);"+
"   if (r < 1.0) {"+
"       discard;"+
"   } else { "+
"       gl_FragColor = uColor;"+
"   }"+
"}\n";

//------------------------------------------ONDAS-SENOIDALES---------------------------------
var VERTEX_SHADER_ONDAS_SENOIDALES = 

"uniform mat4 m;\n" +
"uniform mat4 v;\n" +

"attribute vec3 aPos;\n" +
"varying vec3 vPos;"+

"void main(){\n" +
"   gl_Position = v * m * vec4(aPos, 1.0);\n" +
"   vPos = aPos;"+
"}\n";

var FRAGMENT_SHADER_ONDAS_SENOIDALES =
"precision mediump float;\n" +

"uniform float amplitud;"+
"uniform float desfaseX;"+
"uniform float desfaseY;"+
"uniform float periodo;"+

"uniform vec4 uColor;\n"+
"uniform vec4 colorRelleno;"+
"uniform vec4 colorBorde;"+
"uniform float rellenoInferior;"+

"varying vec3 vPos;"+

"void main() {\n" +

"   float y = amplitud * sin(periodo * vPos.x + desfaseX) + desfaseY;"+
"   float grosor = 0.005;"+
"   float distancia = abs(y - vPos.y);"+

"   if (distancia < grosor) {"+

"       gl_FragColor = colorBorde;"+

"   } else { "+

"       if (rellenoInferior == 1.0) {"+

"           if (vPos.y < y) {"+

"               gl_FragColor = colorRelleno;"+

"           } else { "+

"               discard;"+

"           }"+

"       } else {"+

"           discard;"+

"       }"+
"   }"+
"}\n";