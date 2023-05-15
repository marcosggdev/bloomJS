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
        this.hexadecimal = this.conversionHexadecimal(R,G,B,A);
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

    serializar () {
        return "color:rgba("+this.R+"-"+this.G+"-"+this.B+"-"+this.A+")";    
    }

    //valores = [rgba]
    conversionHexadecimal (R,G,B,A) { 
        //input tipo rgba(), output tipo hexadecimal #rrggbbaa
        let r = R.toString(16);
        let g = G.toString(16);
        let b = B.toString(16);

        //multiplicamos por 255
        let a = Math.round(A * 255).toString(16);

        if (r.length == 1) {
            r = "0" + r;
        }
        if (g.length == 1) {
            g = "0" + g;
        }
        if (b.length == 1) {
            b = "0" + b;
        }
        if (a.length == 1) {
            a = "0" + a;
        }

        return "#" + r + g + b + a; 
    }

    static convertirAHexadecimal (color) {
        //input tipo rgba(), output tipo hexadecimal #rrggbbaa
        let r = color.R.toString(16);
        let g = color.G.toString(16);
        let b = color.B.toString(16);

        //multiplicamos por 255
        let a = Math.round(color.A * 255).toString(16);

        if (r.length == 1) {
            r = "0" + r;
        }
        if (g.length == 1) {
            g = "0" + g;
        }
        if (b.length == 1) {
            b = "0" + b;
        }
        if (a.length == 1) {
            a = "0" + a;
        }

        return "#" + r + g + b + a;
    }

    static convertirHexadecimalRGBA (colorHexa) {
        let r = 0, g = 0, b = 0, a = 1;

        if (h.length == 5) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
          a = "0x" + h[4] + h[4];
      
        } else if (h.length == 9) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
          a = "0x" + h[7] + h[8];
        }
        a = +(a / 255).toFixed(3);
      
        return new Color(r,g,b,a);
    }

}