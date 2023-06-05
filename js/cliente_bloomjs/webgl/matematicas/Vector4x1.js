class Vector4X1 {

    constructor (array) {
        //array con datos que poner en una columna y 4 filas
        this.datos = [];
        array.forEach(element => {
            this.datos.push(element);
        }); 
    }

    toString () {
        let cadena = "(";
        for (let i = 0; i < this.datos.length; i++) {
            cadena += this.datos[i];
            if (i < this.datos.length - 1) {
                cadena += ", ";
            }
        }
        cadena += ")";
        return cadena;
    }

    imprimir() {
        console.log(this.toString());
    }

    productoVectorial (vector) {
        let a1 = this.datos[0];
        let a2 = this.datos[1];
        let a3 = this.datos[2];
        let b1 = vector.datos[0];
        let b2 = vector.datos[1];
        let b3 = vector.datos[2];
        let datos = [a2*b3-a3*b2, a1*b3-a3*b1, a1*b2-a2*b1, 1.0];
        return new Vector4X1(datos);
    }

    normalizar () {
        let x2 = this.datos[0] * this.datos[0];
        let y2 = this.datos[1] * this.datos[1];
        let z2 = this.datos[2] * this.datos[2];
        let longitud = Math.sqrt(x2 + y2 + z2);

        for (let i = 0; i < 3; i++) {
            this.datos[i] /= longitud;
        }
    }

    sumarVector (vector) {
        for (let i = 0; i < 3; i++) {
            this.datos[i] += vector.datos[i];
        }
    }

    restarVector (vector) {
        for (let i = 0; i < 3; i++) {
            this.datos[i] -= vector.datos[i];
        }
    }

    invertir () {
        for (let i = 0; i < 3; i++) {
            this.datos[i] = -this.datos[i];
        }
    }

    multiplicarEscalar (escalar) {
        for (let i = 0; i < 3; i++) {
            this.datos[i] *= escalar;
        }
    }

    static sumarVectores (v1, v2) {
        let datos = [];
        for (let i = 0; i < 3; i++) {
            datos[i] = v1.datos[i] + v2.datos[i];
        }
        datos[3] = 1;
        return new Vector4X1(datos);
    }

    static restarVectores (v1, v2) {
        let datos = [];
        for (let i = 0; i < 3; i++) {
            datos[i] = v1.datos[i] - v2.datos[i];
        }
        datos[3] = 1;
        return new Vector4X1(datos);
    }

    static multiplicarVectorPorEscalar (vector, escalar) {
        let datos = [];
        for (let i = 0; i < 3; i++) {
            datos[i] = vector.datos[i] * escalar;
        }
        datos[3] = vector.datos[3];
        return new Vector4X1(datos);
    }

    static normalizarVector (vector) {
        let datos = [];
        let x2 = vector.datos[0] * vector.datos[0];
        let y2 = vector.datos[1] * vector.datos[1];
        let z2 = vector.datos[2] * vector.datos[2];
        let longitud = Math.sqrt(x2 + y2 + z2);

        for (let i = 0; i < 3; i++) {
            datos[i] /= vector.datos[i] / longitud;
        }
    }

    static invertirVector (vector) {
        let datos = [];
        for (let i = 0; i < 3; i++) {
            datos[i] = -vector.datos[i];
        }
        datos[3] = 1;
        return new Vector4X1(datos);
    }

    static obtenerModulo (vector) {
        let x2 = vector.datos[0] * vector.datos[0];
        let y2 = vector.datos[1] * vector.datos[1];
        let z2 = vector.datos[2] * vector.datos[2];
        let longitud = Math.sqrt(x2 + y2 + z2);
        return longitud;
    }
}