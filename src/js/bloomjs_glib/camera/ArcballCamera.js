import Matrix4x4 from '@/js/bloomjs_glib/maths/Matrix4x4';

export default class ArcballCamera {

    //camara que orbita en una esfera, orientada siempre hacia su centro
    constructor (centerX, centerY, centerZ, radius, angleY, angleX) {

        this.centerX = centerX;
        this.centerY = centerY;
        this.centerZ = centerZ;

        this.radius = radius;

        this.angleY = angleY;
        this.angleX = angleX;

        this.initialXPos = 0;
        this.initialYPos = 0;
        this.initialZPos = 0;

        this.vMat = this.createVMat();
    }

    getCameraPosition () {
        this.vMat = this.createVMat();
        let vector = new Vector4x1([this.initialXPos, this.initialYPos, this.initialZPos, 1.0]);
        return Matrix4x4.getInverse(this.vMat).multiplyVector(vector);
    }

    createVMat () {
        let Matrix = new Matrix4x4();
        Matrix.identity();

        Matrix.rotateY(this.angleY);
        Matrix.rotateX(this.angleX);
        Matrix.translate(0, 0, -this.radius);
        return Matrix;
    }

    update () {
        this.vMat = this.createVMat();
    }

}