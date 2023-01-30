//controla el estado del canvas y el renderizado de elementos HTML
//meidante sus imagen2D
class Editor {
    constructor () {
        this.lienzo = null;
        this.elementos = [];
    }

    setLienzo (elemento) {
        this.lienzo = elemento;
    }

    dibujar () {
        if (this.lienzo != null) {
            this.lienzo.imagen.dibujar();
        }
        for (let i = 0; i < this.elementos.length; i++) {
            this.elementos[i].imagen.dibujar();
        }
    }
}

