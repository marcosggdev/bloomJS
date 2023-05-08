class Quaternion {

    constructor (vectorDirectorEje, angulo) {
        this.angulo = angulo;
        this.rads = Utilidades.toRadians(this.angulo);

        this.x = vectorDirectorEje.datos[0] * Math.sin(rads/2);
        this.y = vectorDirectorEje.datos[1] * Math.sin(rads/2);
        this.z = vectorDirectorEje.datos[2] * Math.sin(rads/2);
        this.w = Math.cos(rads/2);
    }

    static convertirEnMatriz (q) {
        
        let qx = q.x;
        let qy = q.y;
        let qz = q.z;
        let qw = q.w;
        
        let matriz = new Matriz4X4([
            [1-2*qy*qy-2*qz*qz, 2*qx*qy-2*qz*qw, 2*qx*qz+2*qy*qw, 0],
            [2*qx*qy+2*qz*qw, 1-2*qx*qx-2*qz*qz, 2*qy*qz-2*qx*qw, 0],
            [2*qx*qz-2*qy*qw, 2*qy*qz+2*qx*qw, 1-2*qx*qx-2*qy*qy, 0],
            [0, 0, 0, 1]
        ]);

        return matriz;
    }

    static stackQuaterniones (quaterniones) {
        let resultado = 1;
        for (let i = 0; i < quaterniones.length; i++) {
            resultado.multiplicar(quaterniones[i]);
        }
    }

}