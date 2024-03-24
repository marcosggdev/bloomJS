precision mediump float; 

uniform mat4 m; 
uniform mat4 v; 
uniform mat4 p; 
uniform mat4 mInversa;
uniform mat4 vInversa;
uniform mat4 pInversa;

varying vec3 nearPoint;
varying vec3 farPoint;
varying vec3 vPos;

void main() { 
//usamos coords attribute pero aplicamos m porque el plano esta rotado. No se aplican v ni p para estar en world space
    vec4 unprojectedVector =  m * vec4(vPos.xyz, 1.0);
//fade con la lejania
    float distanciaRenderizado = 500.0;
    float distanciaCentro = pow(pow(unprojectedVector.x, 2.0) + pow(unprojectedVector.z, 2.0), 0.5); 
    float factorProfundidad = 0.0; 
//grid
    if (distanciaCentro > distanciaRenderizado) { discard;}
    if (mod(unprojectedVector.x, 10.0) < 0.2 || mod(unprojectedVector.z, 10.0) < 0.2) { 
//ejes
       if (abs(unprojectedVector.x) < 0.2) {
           gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 * factorProfundidad); 
       } else if (abs(unprojectedVector.z) < 0.2) {
           gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0 * factorProfundidad);
       } else {
           gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 * factorProfundidad);
       }
   } else {
//descartamos fragment => relleno del grid transparente y no se procesan tantos pixeles
       discard;
   }
}