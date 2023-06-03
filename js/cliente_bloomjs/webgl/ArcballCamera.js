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
        this.posZInicial = 0;

        this.matrizV = this.crearMatrizVista();
    }

    obtenerPosicionCamara () {
        this.matrizV = this.crearMatrizVista();
        let vector = new Vector4X1([this.posXInicial, this.posYInicial, this.posZInicial, 1.0]);
        //al ser camara, modelo = inversa de vista)
        return Matriz4X4.obtenerInversa(this.matrizV).multiplicarVector(vector);
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

    serializar () {
        //posXCentro, posYCentro, posZCentro, radio, anguloY, anguloXPropio
        let jsonOBJ = {
            "clase": "ArcballCamera",
            "parametros": {
                "posXCentro": this.posXCentro,
                "posYCentro": this.posYCentro,
                "posZCentro": this.posZCentro,
                "radio": this.radio,
                "anguloY": this.anguloY,
                "anguloXPropio": this.anguloXPropio
            }
        };
        return jsonOBJ;
    }

    static deserializar (json) {
        return new ArcballCamera(json.parametros.posXCentro, json.parametros.posYCentro, json.parametros.posZCentro, json.parametros.radio,
            json.parametros.anguloY, json.parametros.anguloXPropio);
    }

}