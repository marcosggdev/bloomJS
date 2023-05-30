class Forma extends Modelo2D {

    constructor (x,y,z, escalaX,escalaY,VERTEX_SHADER, FRAGMENT_SHADER, color) {
        super(x, y, z, 0, 0, 0, escalaX, escalaY, null, VERTEX_SHADER, FRAGMENT_SHADER, color);
    }

    crear (x,y,z, escalaX,escalaY,VERTEX_SHADER, FRAGMENT_SHADER, color) {
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

}