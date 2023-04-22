class ArcballCamera {

    //camara que orbita en una esfera, orientada siempre hacia su centro
    constructor (posXCentro, posYCentro, posZCentro, radio, anguloY, anguloXPropio) {

        this.posXCentro = posXCentro;
        this.posYCentro = posYCentro;
        this.posZCentro = posZCentro;

        this.radio = radio;

        this.anguloY = anguloY;
        this.anguloXPropio = anguloXPropio;

        this.posXInicial = 0;
        this.posYInicial = 0;
        this.posZInicial = radio;

        this.matrizV = this.crearMatrizVista();
    }

    crearMatrizVista () {
        let matriz = new Matriz4X4();
        matriz.identidad();

        //rotar anguloY con respecto al eje y
        matriz.rotarY(this.anguloY);

        //rotar x con respecto al eje x propio
        matriz.rotarX(this.anguloXPropio);

        //trasladar radio con respecto al eje z propio
        matriz.trasladar(0, 0, -this.radio);

        return matriz;
    }

    actualizar () {
        //this.anguloY += 0.25;
        this.matrizV = this.crearMatrizVista();
    }

}