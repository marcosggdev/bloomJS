/**
 * Esencialmente conjunto de formas de tipo OndaSenoidalDesfasada
 */
class OndasSenoidales extends GrupoFormas {

    constructor (formas = null) {
        super(formas);
    }

    anadirFormaBasica () {
        this.formas.push(new OndaSenoidalDesfasada(0));
    }

}