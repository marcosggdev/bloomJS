/**
 * Conjunto de formas que guardan propiedades en común. Por ejemplo, un conjunto de ondas senoidales, que guardan misma posX
 * posY etc del plano de vertices, pero que tienen desfase entre si
 */
class GrupoFormas {

    constructor (formas = null) {
        if (formas != null) {
            this.formas = formas;
        } else {
            this.formas = [];
            this.anadirFormaBasica();
        }
    }

    anadirFormaBasica() {
        this.formas.push(new Forma(0, 0, 0, 1, 1, VERTEX_SHADER_GOURAUD2, FRAGMENT_SHADER_GOURAUD2, Color.AZUL));
    }

}