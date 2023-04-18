//representara el lienzo sobre el que vamos a trabajar, como una hoja de papel

class Lienzo extends Modelo2D {

    constructor () {
        super(0, 0, 0, 0, 0, 0, 2, 2, "", VERTEX_SHADER_IMAGEN, FRAGMENT_SHADER_IMAGEN, Color.BLANCO);
    }

}