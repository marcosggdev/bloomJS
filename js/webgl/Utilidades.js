class Utilidades {

    //comprobar si una imagen tiene ancho y alto como potencias de 2
    static dimensionesPotenciaDeDos (imagen) {
        let ancho = imagen.width;
        let alto = imagen.height;
        let anchoValido = false;
        let altoValido = false;
    
        if (ancho % 2 == 0) {
            while (ancho > 1) {
                ancho /= 2;
            }
            if (ancho == 1) {
                anchoValido = true;
            }
        }
    
        if (alto % 2 == 0) {
            while (alto > 1) {
                alto /= 2;
            }
            if (alto == 1) {
                alto = true;
            }
        }
        return (anchoValido && altoValido);
    }

    //convertir grados a radianes
    static toRadians (grados) {
        //360º = 2pi rad, xº = yrad => yrad = 360x/2pi = 180x/pi
        let resultado = Math.PI * grados / 180.0;
        return resultado;
    }

    static toDegrees (radians) {
        let resultado = 180 * radians / Math.PI;
        return resultado;
    }

    //crear una matriz de perspectiva
    static crearMatrizPerspectiva (fovy, aspecto, n, f) {
        let q = 1.0 / Math.tan(Utilidades.toRadians(0.5 * fovy));
        let A = q / aspecto;
        let B = (n + f) / (n - f);
        let C = (2.0 * n * f) / (n - f);
        let datos = [
            [A,0,0,0],
            [0,q,0,0],
            [0,0,B,C],
            [0,0,-1.0,0]
        ];
        let matriz = new Matriz4X4(datos);
        return matriz;
    }

    static obtenerMayor (array) {
        let mayor = -1000;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > mayor) {
                mayor = array[i];
            }
        }
        return mayor;
    }

}