class Matrix2X2 {

    constructor (array) {
        //array 2d con los datos, por filas
        if (array != null) {
            this.datos = array;
        } else {
            this.datos = [
                [1, 0],
                [0, 1]
            ];
        }
    }

    static obtenerDeterminante (Matrix) {
        let determinante = Matrix.datos[0][0] * Matrix.datos[1][1] - Matrix.datos[0][1] * Matrix.datos[1][0];
        return determinante;
    }

    toString () {
        let cadena = "";
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                cadena += this.datos[i][j] + " ";
            }
            cadena += "\n";
        }   
        return cadena;
    }

    static formatearArray (array) {
        let datos = [[],[]];
        for (let i = 0; i< 2; i++) {
            for (let j = 0; j < 2; j++) {
                datos[i][j] = array[2*i + j];
            }   
        }
        let Matrix = new Matrix2X2(datos);
        return Matrix;
    }

}