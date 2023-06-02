class BarraProgreso {

    /**
     * 
     * @param {*} texto Texto encima de la barra de progreso indicando el proceso actual 
     * @param {*} numeroActual Número que indica la posición actual
     * @param {*} numeroMinimo Número mínimo de progreso (0 progreso)
     * @param {*} numeroMaximo Número máximo de progreso (máximo progreso)
     * @param {*} tiempoAnimacion Tiempo de animación entre un valor y el siguiente aplicado
     */
    constructor (texto, numeroActual, numeroMinimo, numeroMaximo, tiempoAnimacion) {
        this.texto = texto;
        this.numeroActual = numeroActual;
        this.numeroMinimo = numeroMinimo;
        this.numeroMaximo = numeroMaximo;
        this.tiempoAnimacion = tiempoAnimacion;
        this.crearNodo();
    }

    crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "BarraProgreso";

        let progreso = document.createElement("div");
        progreso.className = "Progreso";
        progreso.style.width = (this.numeroActual / this.numeroMaximo * 100) + "%";
        nodo.appendChild(progreso);
        this.nodo = nodo;
    }

    actualizarNodo () {
        let progreso = this.nodo.querySelector(".Progreso");
        progreso.style.width = (this.numeroActual / this.numeroMaximo * 100) + "%";
    }

    /**
     * 
     * @param {*} texto Nuevo texto del proceso 
     * @param {*} avance Cuánto avanza número actual en total desde el paso anterior
     */
    avanzarPaso (texto, avance) {
        this.texto = texto;
        this.numeroActual += Number(avance);

        //segundos por frame
        let spf = 1 / 60;

        //numero frames para tiempoAnimacion
        let frames = this.tiempoAnimacion / spf;

        requestAnimationFrame(function () {
            if (this.numeroActual + avance < this.numeroMaximo) {
                this.numeroActual += avance;
                this.actualizarNodo();
            }
        });

        //avance por frame
        let avancePorFrame = avance / frames;

        if (this.numeroActual > this.numeroMaximo) {
            this.numeroActual = this.numeroMaximo;
            this.completar();
        }
        this.actualizarNodo();
    }

    completar () {

    }

}