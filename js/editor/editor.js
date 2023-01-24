//controla el estado del canvas del editor
class Editor {
    static lienzo = null; //elemento lienzo
    static elementos = [];  //lista de elementos excepto lienzo a dibujar

    static setLienzo (elemento) {
        this.lienzo = elemento;
    }
}

