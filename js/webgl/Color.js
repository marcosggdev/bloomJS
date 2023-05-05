class Color {

    static FONDO = new Color(0,0,0,255);
    static BLANCO = new Color(255,255,255,255);
    static AZUL = new Color(0, 0, 255, 255);
    static AZUL_CIELO = new Color(176, 217, 219);

    constructor (R,G,B,A) {
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }

    toString () {
        return "rgba(" + this.R + ", " + this.G + ", " + this.B + ", " + this.A + ")";
    }

    static parsearString (string) {
        //string de la forma rgba(r,g,b,a), pudiendo tener espacios entre las comas. Los numeros minim 1 caracter, max infinito
        let patron = /rgba\([ ]*([0-9]+.)?[0-9]+[ ]*,[ ]*([0-9]+.)?[0-9]+[ ]*,[ ]*([0-9]+.)?[0-9]+[ ]*,[ ]*([0-9]+.)?[0-9]+[ ]*\)/g;
        let coincidencias = string.match(patron)[0];
        if (coincidencias != [""]) {
            let patronNumero = /([0-9]+.)?[0-9]+/g;
            let numeros = string.match(patronNumero);
            return numeros;
        }

        return null;
    }

}