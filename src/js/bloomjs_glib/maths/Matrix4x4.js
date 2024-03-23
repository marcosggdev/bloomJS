import Utility from '@/js/bloomjs_glib/Utility'
import Matrix3x3 from '@/js/bloomjs_glib/maths/Matrix3x3'

export default class Matrix4x4 {

    constructor (array) {

        if (array != null) {
            this.data = array;
        } else {
            this.data = [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,1,0],
                [0,0,0,1]
            ];
        }

    }

    transpose () {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = this.data[j][i];
            }
        }
    }

    static add(matrices) {
        let sum = new Matrix4x4();
        sum.identity();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let sumElement = 0;
                for (let k = 0; k < matrices.length; k++) {
                    sumElement += matrices[k].data[i][j];
                }
                sum.data[i][j] = sumElement;
            }
        }
        return sum;
    }

    multiplyVector (vector) {
        //devuelve el result de multiply este array por el array2 que es un vector de col de 4 elementos
        var resultData = [
            this.data[0][0] * vector.data[0] + this.data[0][1] * vector.data[1] + this.data[0][2] * vector.data[2] + this.data[0][3] * vector.data[3],
            this.data[1][0] * vector.data[0] + this.data[1][1] * vector.data[1] + this.data[1][2] * vector.data[2] + this.data[1][3] * vector.data[3],
            this.data[2][0] * vector.data[0] + this.data[2][1] * vector.data[1] + this.data[2][2] * vector.data[2] + this.data[2][3] * vector.data[3],
            this.data[3][0] * vector.data[0] + this.data[3][1] * vector.data[1] + this.data[3][2] * vector.data[2] + this.data[3][3] * vector.data[3]
        ];

        let result = new Vector4X1(resultData);
        return result;
    }

    multiplyScalar (a) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.data[i][j] = a * this.data[i][j];
            }
        }
    }

    multiply (Matrix) {
        var resultData = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        for (let i = 0; i < 4; i++) {
            var row = this.getRow(this, i);
            for (let j = 0; j < 4; j++) {
                var col = this.getCol(Matrix, j);
                resultData[i][j] = this.rowXcol(row, col);
            }
        }
        var result = new Matrix4x4(resultData);
        return result;
    }

    changeRow (row, newdata) {
        for (let j = 0; j < 4; j++) {
            this.data[row][j] = newdata[j];
        }
    }

    changeCol (col, newdata) {
        for (let i = 0; i < 4; i++) {
            this.data[i][col] = newdata[i];
        }
    }

    getRow (Matrix, n) {
        var result = [Matrix.data[n][0], Matrix.data[n][1], Matrix.data[n][2], Matrix.data[n][3]];
        return result;
    }

    getCol (Matrix, n) {
        var result = [Matrix.data[0][n], Matrix.data[1][n], Matrix.data[2][n], Matrix.data[3][n]];
        return result;
    }

    rowXcol (row, col) {
        var result = 0;
        for (let i = 0; i < row.length; i++) {
            result += row[i] * col[i];
        }
        return result;
    }

    toString () {
        let cadena = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                cadena += this.data[i][j] + " ";
            }
            cadena += "\n";
        }   
        return cadena;
    }

    readArray (arrayMatrix) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                this.data[j][k] = arrayMatrix[4*j + k];
            }
        }
    }

    print () {
        console.log(this.toString());
    }

    translate (posX, posY, posZ) {

        let translationData = [
            [1,0,0,posX],
            [0,1,0,posY],
            [0,0,1,posZ],
            [0,0,0,1]
        ];

        let MatrixTraslacion = new Matrix4x4(translationData);

        this.data = MatrixTraslacion.multiply(this).data;

    }

    rotate (anguloX, anguloY, anguloZ) {
        //composicion de rotaciones en los 3 ejes
        this.rotateX(anguloX);
        this.rotateY(anguloY);
        this.rotateZ(anguloZ);
    }

    rotateX (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(Utility.toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(Utility.toRadians(angulo));
        let dataRotacion = [
            [1,0,0,0],
            [0,c,-s,0],
            [0,s,c,0],
            [0,0,0,1]
        ];
        let MatrixRotacionX = new Matrix4x4(dataRotacion);
        this.data = MatrixRotacionX.multiply(this).data;
    }

    rotateY (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(Utility.toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(Utility.toRadians(angulo));

        let dataRotacion = [
            [c,0,s,0],
            [0,1,0,0],
            [-s,0,c,0],
            [0,0,0,1]
        ];

        let MatrixRotacionY = new Matrix4x4(dataRotacion);
        this.data = this.multiply(MatrixRotacionY).data;
    }

    rotateZ (angulo) {
        //sentido antihorario para angulo > 0
        let c = Math.cos(Utility.toRadians(angulo));    //coseno = c, seno = s
        let s = Math.sin(Utility.toRadians(angulo));
        let dataRotacion = [
            [c,-s,0,0],
            [s,c,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        let MatrixRotacionX = new Matrix4x4(dataRotacion);
        this.data = this.multiply(MatrixRotacionX).data;
    }

    scale (factorX, factorY, factorZ) {
        let dataEscala = [
            [factorX, 0, 0, 0],
            [0, factorY, 0, 0],
            [0, 0, factorZ, 0],
            [0, 0, 0, 1]
        ];
        let MatrixEscala = new Matrix4x4(dataEscala);
        this.data = this.multiply(MatrixEscala).data;
    }

    identity () {
        this.data = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }

    getArrayByRows () {
        let array = [];
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                array.push(this.data[i][j]);
            }
        }
        return array;
    }

    getArrayByColumns () {
        let array = [];
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                array.push(this.data[j][i]);
            }
        }
        return array;
    }

    static createMatrices4x4 (array) {
        if (array.length % 16 == 0) {
            let matrices = [];
            for (let i = 0; i < array.length/16; i++) {
                let subArray = array.slice(16*i, 16*(i+1));
                let Matrix = new Matrix4x4();
                Matrix.identity();
                Matrix.readArray(subArray);
                matrices.push(Matrix);
            }
            return matrices;
        } else {
            console.log("El array pasado por parámetro no tiene suficientes data");
            return null;
        }
    }

    static getInverse (Matrix) {
        //A-1 = (1 / det(A)) * Adj(A)
        let primerTermino = 1 / this.getDeterminant(Matrix);
        let attachedMatrix = this.getattachedMatrix(Matrix);
        attachedMatrix.multiplyScalar(primerTermino); //esta es la inversa
        return attachedMatrix;
    }

    static getattachedMatrix(Matrix) {
        //Matrix en la que cada elemento se ha sustituido por el determinante de su adjunto
        let data = [[],[],[], []];
        for (let i = 0; i < Matrix.data.length; i++) {
            for (let j = 0; j < Matrix.data[0].length; j++) {
                let adjunto = this.getAttached(Matrix, i, j);
                let signo = Math.pow(-1, i+j);
                data[j][i] = signo * Matrix3x3.getDeterminant(adjunto);
            }
        }
        let attachedMatrix = new Matrix4x4(data);
        return attachedMatrix;
    }

    static getDeterminant (Matrix) {

        let determinante = 0;

        for (let j = 0; j < Matrix.data.length; j++) {
            let m1i = Matrix.data[0][j];
            let adjunto = this.getAttached(Matrix, 0, j);
            let termino = Math.pow(-1, 1 + (j+1)) * m1i * Matrix3x3.getDeterminant(adjunto);
            determinante += termino;
        }

        return determinante;
    }

    static getAttached (Matrix, evitarI, evitarJ) {

        //Matrix 3x3
        let extraidos = [];

        for (let i = 0; i < Matrix.data.length; i++) {
            for (let j = 0; j < Matrix.data[0].length; j++) {
                //recorrer Matrix
                if (i != evitarI && j != evitarJ) {
                    let mij = Matrix.data[i][j];
                    extraidos.push(mij);
                }
            }
        }

        //convertir array 1D en array 3x3
        let adjunto = Matrix3x3.formatArray(extraidos);
        return adjunto;

    }

    static getCol (Matrix, indice) {
        let data = [];
        for (let i = 0; i < 4; i++) {
            data.push(Matrix.data[i][indice]);
        }
        return new Vector4X1(data);
    }

    rotateRelativeToWorld (anguloX, anguloY, anguloZ) {
        let rotacionWorld = new Matrix4x4();
        rotacionWorld.identity();

        rotacionWorld.rotateX(anguloX);

        let ejeY = new Vector4X1([0,1,0,1]);
        let rotY = Matrix4x4.createRotationMatrixRelativeToUnitaryVector(ejeY, anguloY);
        rotacionWorld = rotY.multiply(rotacionWorld);

        let ejeZ = new Vector4X1([0,0,1,1]);
        let rotZ = Matrix4x4.createRotationMatrixRelativeToUnitaryVector(ejeZ, anguloZ);
        rotacionWorld = rotZ.multiply(rotacionWorld);

        this.data = rotacionWorld.multiply(this).data;
    }

    //vector normalizado
    static createRotationMatrixRelativeToUnitaryVector (vector, angulo) {

        let t = Utility.toRadians(angulo);
        let ux = vector.data[0];
        let uy = vector.data[1];
        let uz = vector.data[2];
        let sin = Math.sin(t);
        let cos = Math.cos(t);

        //Matrix de rotacion con respecto a eje arbitrario dado por vector director unitario
        let Matrix = new Matrix4x4([
            [cos + ux*ux*(1 - cos), ux*uy*(1-cos)-uz*sin, ux*uz*(1-cos)+uy*sin, 0],
            [uy*ux*(1-cos)+uz*sin, cos+uy*uy*(1-cos), uy*uz*(1-cos)-ux*sin, 0],
            [uz*ux*(1-cos)-uy*sin, uz*uy*(1-cos)+ux*sin, cos+uz*uz*(1-cos), 0],
            [0,0,0,1]
        ]);

        return Matrix;
    }

    /**
     * Dada una Matrix de rotacion, devuelve el angulo de euler que se utilizo para getla
     */
    static getRotationAngles (Matrix) {
        let anguloX = Math.atan2(Matrix.data[2][1], Matrix.data[2][2]);
        let anguloY = Math.atan2(-Matrix.data[2][0], Math.pow(Matrix.data[2][1]*Matrix.data[2][1] + Matrix.data[2][2]*Matrix.data[2][2], 0.5));
        let anguloZ = Math.atan2(Matrix.data[1][0], Matrix.data[0][0]);
        let angulos = {
            "anguloX": Utility.toDegrees(anguloX),
            "anguloY": Utility.toDegrees(anguloY),
            "anguloZ": Utility.toDegrees(anguloZ)
        }
        return angulos;
    }
}