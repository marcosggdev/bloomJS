class Matriz3X3 {

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

    static obtenerInversa (matriz) {
        //A-1 = (1 / det(A)) * Adj(A)
    }

    static obtenerMatrizAdjunta(matriz) {
        //matriz en la que cada elemento se ha sustituido por el determinante de su adjunto
    }

    static obtenerDeterminante (matriz) {

        let determinante = 0;

        for (let i = 0; i < matriz.datos.length; i++) {
            let m1i = matriz.datos[0][i];
            let adjunto = this.obtenerAdjunto(matriz, 0, i);
            let termino = Math.pow(-1, 1 + (i+1)) * m1i * Matriz2X2.obtenerDeterminante(adjunto);
            determinante += termino;
        }

        return determinante;
    }

    static obtenerAdjunto (matriz, evitarI, evitarJ) {

        //matriz 3x3
        let extraidos = [];

        for (let i = 0; i < matriz.datos.length; i++) {
            for (let j = 0; j < matriz.datos[0].length; j++) {
                //recorrer matriz
                if (i != evitarI & j != evitarJ) {
                    let mij = matriz.datos[i][j];
                    extraidos.push(mij);
                }
            }
        }

        //convertir array 1D en array 3x3
        let adjunto = Matriz2X2.formatearArray(extraidos);
        return adjunto;

    }

    static formatearArray (array) {
        let datos = [[],[],[]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                datos[i][j] = array[3 * i + j];
            }
        }
        let matriz = new Matriz3X3(datos);
        return matriz;
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