precision highp float; 

uniform mat4 m; 
uniform mat4 v; 
uniform mat4 p; 
uniform mat4 mInversa;
uniform mat4 vInversa;
uniform mat4 pInversa;

attribute vec3 aPos; 
varying vec3 vPos;
varying vec3 nearPoint;
varying vec3 farPoint;

void main() { 
    vec4 unprojectedNear = vInversa * pInversa * vec4(aPos.xy, 0.0, 1.0); 
    vec4 unprojectedFar = vInversa * pInversa * vec4(aPos.xy, 1.0, 1.0); 

    nearPoint = unprojectedNear.xyz / unprojectedNear.w;
    farPoint = unprojectedFar.xyz / unprojectedFar.w;

   gl_Position = p * v * m * vec4(aPos, 1.0);
   vPos = aPos;
}