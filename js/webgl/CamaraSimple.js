class CamaraSimple {

    //camara sin perspectiva ni rotacion, solo traslacion
    constructor (posX, posY, posZ) {

        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;

        this.matrizV = this.crearMatrizVista();
    }

    obtenerPosicionCamara () {
        this.matrizV = this.crearMatrizVista();
        let vector = new Vector4X1([this.posX, this.posY, this.posZ, 1.0]);
        //al ser camara, modelo = inversa de vista)
        return Matriz4X4.obtenerInversa(this.matrizV).multiplicarVector(vector);
    }

    crearMatrizVista () {
        let matriz = new Matriz4X4();
        matriz.identidad();

        //trasladar radio con respecto al eje z propio
        matriz.trasladar(0, 0, -this.posZ);

        return matriz;
    }

    actualizar () {
        //this.anguloY += 0.25;
        this.matrizV = this.crearMatrizVista();
    }

    serializar () {
        return "clase=CamaraSimple;variables={posX:"+this.posXCentro+";posY:"+this.posYCentro+";posZ:"+this.posZ+"}";
    }

}