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

}