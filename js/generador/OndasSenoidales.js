/**
 * Esencialmente conjunto de formas de tipo OndaSenoidalDesfasada
 */
class OndasSenoidales extends GrupoFormas {

    constructor (formas = null) {
        super(formas);
    }

    static async crear (x,y,z, escalaX,escalaY,VERTEX_SHADER, FRAGMENT_SHADER, color) {
        return new Promise(resolve => {
            let forma = new Forma(x,y,z, escalaX,escalaY,VERTEX_SHADER, FRAGMENT_SHADER, color);
            forma.iniciar()
            .then(
                function () {
                    resolve(forma);
                }
            );
        });
    }

    anadirFormaBasica () {
        this.formas.push(new OndaSenoidalDesfasada(0));
    }

}