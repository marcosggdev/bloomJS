class Matriz2X2 {

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

    static obtenerDeterminante (matriz) {
        let determinante = matriz.datos[0][0] * matriz.datos[1][1] - matriz.datos[0][1] * matriz.datos[1][0];
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
        let matriz = new Matriz2X2(datos);
        return matriz;
    }

}