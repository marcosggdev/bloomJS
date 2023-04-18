class Matriz4X4 {
    constructor (array) {
        //array 2d con los datos, por filas
        if (array != null) {
            this.datos = array;
        } else {
            this.datos = [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,1,0],
                [0,0,0,1]
            ];
        }
    }

    transponer () {
        for (let i = 0; i < this.datos.length; i++) {
            for (let j = 0; j < this.datos[0].length; j++) {
                this.datos[i][j] = this.datos[j][i];
            }
        }
    }

    static sumar(matrices) {
        let suma = new Matriz4X4();
        suma.identidad();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let sumaElemento = 0;
                for (let k = 0; k < matrices.length; k++) {
                    sumaElemento += matrices[k].datos[i][j];
                }
                suma.datos[i][j] = sumaElemento;
            }
        }
        return suma;
    }

    multiplicarVector (vector) {
        //devuelve el resultado de multiplicar este array por el array2 que es un vector de columna de 4 elementos
        var datosResultado = [
            this.datos[0][0] * vector.datos[0] + this.datos[0][1] * vector.datos[1] + this.datos[0][2] * vector.datos[2] + this.datos[0][3] * vector.datos[3],
            this.datos[1][0] * vector.datos[0] + this.datos[1][1] * vector.datos[1] + this.datos[1][2] * vector.datos[2] + this.datos[1][3] * vector.datos[3],
            this.datos[2][0] * vector.datos[0] + this.datos[2][1] * vector.datos[1] + this.datos[2][2] * vector.datos[2] + this.datos[2][3] * vector.datos[3],
            this.datos[3][0] * vector.datos[0] + this.datos[3][1] * vector.datos[1] + this.datos[3][2] * vector.datos[2] + this.datos[3][3] * vector.datos[3]
        ];
        var vector = new Vector4X1(datosResultado);
        return vector;
    }

    multiplicarEscalar (a) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.datos[i][j] = a * this.datos[i][j];
            }
        }
    }

    multiplicar (matriz) {
        var datosResultado = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        for (let i = 0; i < 4; i++) {
            var fila = this.obtenerFila(this, i);
            for (let j = 0; j < 4; j++) {
                var columna = this.obtenerColumna(matriz, j);
                datosResultado[i][j] = this.filaXcolumna(fila, columna);
            }
        }
        var resultado = new Matriz4X4(datosResultado);
        return resultado;
    }

    cambiarFila (fila, nuevosDatos) {
        for (let j = 0; j < 4; j++) {
            this.datos[fila][j] = nuevosDatos[j];
        }
    }

    cambiarColumna (columna, nuevosDatos) {
        for (let i = 0; i < 4; i++) {
            this.datos[i][columna] = nuevosDatos[i];
        }
    }

    obtenerFila (matriz, n) {
        var resultado = [matriz.datos[n][0], matriz.datos[n][1], matriz.datos[n][2], matriz.datos[n][3]];
        return resultado;
    }

    obtenerColumna (matriz, n) {
        var resultado = [matriz.datos[0][n], matriz.datos[1][n], matriz.datos[2][n], matriz.datos[3][n]];
        return resultado;
    }

    filaXcolumna (fila, columna) {
        var resultado = 0;
        for (let i = 0; i < fila.length; i++) {
            resultado += fila[i] * columna[i];
        }
        return resultado;
    }

    toString () {
        let cadena = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                cadena += this.datos[i][j] + " ";
            }
            cadena += "\n";
        }   
        return cadena;
    }

    leerArray (arrayMatriz) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                this.datos[j][k] = arrayMatriz[4*j + k];
            }
        }
    }

    imprimir () {
        console.log(this.toString());
    }

    trasladar (posX, posY, posZ) {
        let datosTraslacion = [
            [1,0,0,posX],
            [0,1,0,posY],
            [0,0,1,posZ],
            [0,0,0,1]
        ];
        let matrizTraslacion = new Matriz4X4(datosTraslacion);
        this.datos = matrizTraslacion.multiplicar(this).datos;
    }

    rotar (anguloX, anguloY, anguloZ) {
        //composicion de rotaciones en los 3 ejes
        this.rotarX(anguloX);
        this.rotarY(anguloY);
        this.rotarZ(anguloZ);
    }

    rotarX (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(toRadians(angulo));
        let datosRotacion = [
            [1,0,0,0],
            [0,c,-s,0],
            [0,s,c,0],
            [0,0,0,1]
        ];
        let matrizRotacionX = new Matriz4X4(datosRotacion);
        this.datos = matrizRotacionX.multiplicar(this).datos;
    }

    rotarY (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(toRadians(angulo));
        let datosRotacion = [
            [c,0,s,0],
            [0,1,0,0],
            [-s,0,c,0],
            [0,0,0,1]
        ];
        let matrizRotacionY = new Matriz4X4(datosRotacion);
        this.datos = this.multiplicar(matrizRotacionY).datos;
    }

    rotarZ (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(toRadians(angulo));
        let datosRotacion = [
            [c,-s,0,0],
            [s,c,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        let matrizRotacionX = new Matriz4X4(datosRotacion);
        this.datos = this.multiplicar(matrizRotacionX).datos;
    }

    escalar (factorX, factorY, factorZ) {
        let datosEscala = [
            [factorX, 0, 0, 0],
            [0, factorY, 0, 0],
            [0, 0, factorZ, 0],
            [0, 0, 0, 1]
        ];
        let matrizEscala = new Matriz4X4(datosEscala);
        this.datos = this.multiplicar(matrizEscala).datos;
    }

    identidad () {
        this.datos = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }

    obtenerArrayPorFilas () {
        let array = [];
        for (let i = 0; i < this.datos.length; i++) {
            for (let j = 0; j < this.datos[0].length; j++) {
                array.push(this.datos[i][j]);
            }
        }
        return array;
    }

    obtenerArrayPorColumnas () {
        let array = [];
        for (let i = 0; i < this.datos.length; i++) {
            for (let j = 0; j < this.datos[0].length; j++) {
                array.push(this.datos[j][i]);
            }
        }
        return array;
    }

    static crearMatrices4X4 (array) {
        if (array.length % 16 == 0) {
            let matrices = [];
            for (let i = 0; i < array.length/16; i++) {
                let subArray = array.slice(16*i, 16*(i+1));
                let matriz = new Matriz4X4();
                matriz.identidad();
                matriz.leerArray(subArray);
                matrices.push(matriz);
            }
            return matrices;
        } else {
            console.log("El array pasado por parámetro no tiene suficientes datos");
            return null;
        }
    }
}