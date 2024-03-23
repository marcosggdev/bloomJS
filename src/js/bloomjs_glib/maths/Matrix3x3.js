class Matrix3X3 {

    constructor (array) {
        //array 2d con los datos, por filas
        if (array != null) {
            this.datos = array;
        } else {
            this.datos = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
        }
    }

    static formatearDatos (array) {
        
        let datos = [[],[],[]];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                datos[i][j] = array[3 * i + j];
            }
        }

        return datos;
    }

    static obtenerInversa (Matrix) {
        //A-1 = (1 / det(A)) * Adj(A)
    }

    static obtenerMatrixAdjunta(Matrix) {
        //Matrix en la que cada elemento se ha sustituido por el determinante de su adjunto
    }

    static obtenerDeterminante (Matrix) {

        let determinante = 0;

        for (let i = 0; i < Matrix.datos.length; i++) {
            let m1i = Matrix.datos[0][i];
            let adjunto = this.obtenerAdjunto(Matrix, 0, i);
            let termino = Math.pow(-1, 1 + (i+1)) * m1i * Matrix2X2.obtenerDeterminante(adjunto);
            determinante += termino;
        }

        return determinante;
    }

    static obtenerAdjunto (Matrix, evitarI, evitarJ) {

        //Matrix 3x3
        let extraidos = [];

        for (let i = 0; i < Matrix.datos.length; i++) {
            for (let j = 0; j < Matrix.datos[0].length; j++) {
                //recorrer Matrix
                if (i != evitarI & j != evitarJ) {
                    let mij = Matrix.datos[i][j];
                    extraidos.push(mij);
                }
            }
        }

        //convertir array 1D en array 3x3
        let adjunto = Matrix2X2.formatearArray(extraidos);
        return adjunto;

    }

    static formatearArray (array) {
        let datos = [[],[],[]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                datos[i][j] = array[3 * i + j];
            }
        }
        let Matrix = new Matrix3X3(datos);
        return Matrix;
    }

    toString () {
        let cadena = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cadena += this.datos[i][j] + " ";
            }
            cadena += "\n";
        }   
        return cadena;
    }

}