class BarraProgreso {

    constructor (texto, pasos) {
        this.texto = texto;
        this.pasos = Number(pasos);
        this.pasoActual = 0;
        this.tiempoAnimacion = 1;
        this.framesRestantes = 0;
        this.crearNodo();
    }

    crearNodo () {

        let nodo = document.createElement("div");
        nodo.className = "BarraProgreso";

        let progreso = document.createElement("div");
        progreso.className = "Progreso";
        progreso.style.width = (1 / this.pasos * this.pasoActual) * 100 + "%";
        nodo.appendChild(progreso);
        this.nodo = nodo;
    }

    actualizarNodo () {
        let progreso = this.nodo.querySelector(".Progreso");
        progreso.style.width = (1 / this.pasos * this.pasoActual) * 100 + "%";
    }

    /**
     * 
     * @param {*} texto Nuevo texto del proceso 
     * @param {*} avance Cúanto avanca el paso actual
     */
    avanzarPaso (texto, avance) {
        this.animando = true;
        this.texto = texto;

        let spf = 1 / 60;
        let frames = this.tiempoAnimacion / spf;
        let avancePorFrame = avance / frames;
        this.framesRestantes = frames;

        requestAnimationFrame(()=>{this.dibujarFrame(avancePorFrame)});

        if (this.numeroActual > this.numeroMaximo) {
            this.numeroActual = this.numeroMaximo;
            this.completar();
        }
        this.actualizarNodo();
    }

    dibujarFrame (avancePorFrame) {
        if (this.framesRestantes > 0) {
            this.pasoActual += avancePorFrame;
            this.framesRestantes--;
            requestAnimationFrame(() => {this.dibujarFrame(avancePorFrame)});
        }
    }

    completar () {

    }

}