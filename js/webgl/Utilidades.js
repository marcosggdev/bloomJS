function dimensionesPotenciaDeDos (imagen) {
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

function toRadians (grados) {
    //360º = 2pi rad, xº = yrad => yrad = 360x/2pi = 180x/pi
    let resultado = Math.PI * grados / 180.0;
    return resultado;
}

//crea y devuelve la matriz de perspectiva
function crearMatrizPerspectiva (fovy, aspecto, n, f) {
    let q = 1.0 / Math.tan(toRadians(0.5 * fovy));
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