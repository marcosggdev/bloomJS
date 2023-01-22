class Controles {
    constructor (canvas) {
        this.canvas = canvas;
        this.teclas = [];
        for (let i = 0; i < 108; i++) {
            this.teclas[i] = 0;
        }
        this.canvas.addEventListener('keydown', (e) => {
           this.teclas[e.keyCode] = 1;
        });
        this.canvas.addEventListener('keyup', (e) => {
            this.teclas[e.keyCode] = 0;
        });
        this.canvas.addEventListener('mousemove', (e) => {
            //console.log(`raton en posicion: (${e.clientX}, ${e.clientY})`);
        });
    }
    actualizar () {
        if (this.teclas[87]) {
            jugador.mover("w");
        }
        if (this.teclas[65]) {
            jugador.mover("a");
        }
        if (this.teclas[83]) {
            jugador.mover("s");
        }
        if (this.teclas[68]) {
            jugador.mover("d");
        }
    }
}