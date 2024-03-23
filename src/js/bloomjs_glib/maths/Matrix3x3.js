import Matrix2x2 from '@/js/bloomjs_glib/maths/Matrix2x2'

export default class Matrix3x3 {

    constructor (array) {
        //array 2d con los data, por filas
        if (array != null) {
            this.data = array;
        } else {
            this.data = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
        }
    }

    static formatData (array) {
        
        let data = [[],[],[]];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                data[i][j] = array[3 * i + j];
            }
        }

        return data;
    }

    static getInverse (Matrix) {
        //A-1 = (1 / det(A)) * Adj(A)
    }

    static getAttachedMatrix(Matrix) {
        //Matrix en la que cada elemento se ha sustituido por el determinante de su attached
    }

    static getDeterminant (Matrix) {

        let determinante = 0;

        for (let i = 0; i < Matrix.data.length; i++) {
            let m1i = Matrix.data[0][i];
            let attached = this.getAttachedMatrix(Matrix, 0, i);
            let termino = Math.pow(-1, 1 + (i+1)) * m1i * Matrix2x2.getDeterminant(attached);
            determinante += termino;
        }

        return determinante;
    }

    static getAttachedMatrix (Matrix, avoidI, avoidJ) {

        //Matrix 3x3
        let extracted = [];

        for (let i = 0; i < Matrix.data.length; i++) {
            for (let j = 0; j < Matrix.data[0].length; j++) {
                //recorrer Matrix
                if (i != avoidI & j != avoidJ) {
                    let mij = Matrix.data[i][j];
                    extracted.push(mij);
                }
            }
        }

        //convertir array 1D en array 3x3
        let attached = Matrix2x2.formatArray(extracted);
        return attached;

    }

    static formatArray (array) {
        let data = [[],[],[]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                data[i][j] = array[3 * i + j];
            }
        }
        let Matrix = new Matrix3x3(data);
        return Matrix;
    }

    toString () {
        let str = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                str += this.data[i][j] + " ";
            }
            str += "\n";
        }   
        return str;
    }

}