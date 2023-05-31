class Color {

    //colores definidos en RGB max 255
    static FONDO = new Color(0,0,0,255);
    static BLANCO = new Color(255,255,255,255);
    static AZUL = new Color(0, 0, 255, 255);
    static AZUL_CIELO = new Color(176, 217, 219, 255);
    static ROJO = new Color(255,0,0,255);
    static NARANJA = new Color(255,130,0,255);

    //se guarda en valores gl
    constructor (R,G,B,A) {
        this.R = R / 255;
        this.G = G / 255;
        this.B = B / 255;
        this.A = A / 255;
        this.hexadecimal = this.conversionHexadecimal(R, G, B, A);
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

    conversionGL (R,G,B,A) {
        //gl = 1; rgb = 255 => /255
        return {
            "R":R/255, 
            "G":G/255, 
            "B":B/255, 
            "A":A/255
        };
    }

    //valores = [rgba] con max 255
    conversionHexadecimal (R,G,B,A) { 
        //input tipo rgba(), output tipo hexadecimal #rrggbbaa
        let r = R.toString(16);
        let g = G.toString(16);
        let b = B.toString(16);
        let a = A.toString(16);

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

        //no multiplicamos por 255
        let a = color.A.toString(16);
        //let a = Math.round(color.A * 255).toString(16);

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

    static convertirHexadecimalRGBA (h) {
        let r = 0, g = 0, b = 0, a = 1;

        //suponemos que h es un codigo hexadecimal de 6 digitos y 1 simbolo #: #rrggbbaa

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

    serializar () {

    }

    static deserializar (json) {
        
    }

}