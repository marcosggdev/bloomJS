class Forma extends Modelo2D {

    constructor (x,y,z, escalaX,escalaY,VERTEX_SHADER, FRAGMENT_SHADER, color, parametros) {

        super(x, y, z, 0, 0, 0, escalaX, escalaY, null, VERTEX_SHADER, FRAGMENT_SHADER, color);
        this.parametros = parametros;
        this.crearSupervalores(parametros);

    }

    crearSupervalores (parametros) {
        let supervaloresObjeto = [];
        //objeto (editables)
        for (let i = 0; i < this.parametros.length; i++) {
            this[parametros[i][1]] = new Supervalor(this, this.parametros[i][2], this.parametros[i][1], this.parametros[i][0], this.parametros[i][3]);
            supervaloresObjeto.push(this[parametros[i][1]]);
        }
        this.supervaloresObjeto = supervaloresObjeto;
        //adicionales (no editables)
    }

    actualizarValor (identificador, valor) {
        this[identificador] = valor;
    }

}