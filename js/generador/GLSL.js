//------------------------------------------ONDA-ESFERICA---------------------------------
var VERTEX_SHADER_ONDA_ESFERICA = 

"uniform mat4 m;\n" +
"uniform mat4 v;\n" +
"uniform mat4 p;\n" +

"attribute vec3 aPos;\n" +
"varying vec3 vPos;"+

"void main(){\n" +
"   gl_Position = p * v * m * vec4(aPos, 1.0);\n" +
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