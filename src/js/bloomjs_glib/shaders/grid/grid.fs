precision highp float;

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
    vec4 unprojectedVector = m * vec4(vPos.xyz, 1.0);
//fade con la lejania
    float distanciaRenderizado = 70.0;
    float distanciaCentro = pow(pow(unprojectedVector.x, 2.0) + pow(unprojectedVector.z, 2.0), 0.5);
    float factorProfundidad = exp(-0.01 * distanciaCentro);
    float lineWidth = 0.15;
//grid
    if(distanciaCentro > distanciaRenderizado) {
        discard;
    }
    
    if(mod(unprojectedVector.x, 10.0) < lineWidth || mod(unprojectedVector.z, 10.0) < lineWidth) { 
//ejes
        float dx = pow(pow(mod(unprojectedVector.x, 10.0), 2.0), 0.5);
        float dz = pow(pow(mod(unprojectedVector.z, 10.0), 2.0), 0.5);
        float factorSombreadoLinea = min((exp(-3.0*dx) + exp(-3.0*dz)), 0.85);

        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 * factorProfundidad * factorSombreadoLinea);

        if(abs(unprojectedVector.x) < lineWidth) {

            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 * factorProfundidad);

        }
        
        if(abs(unprojectedVector.z) < lineWidth) {

            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0 * factorProfundidad);

        }

    } else {
//descartamos fragment => relleno del grid transparente y no se procesan tantos pixeles
        discard;
    }
}