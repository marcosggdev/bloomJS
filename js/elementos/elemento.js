class Elemento {
    constructor (id, ancho, alto, capa) {
        this.id = id;
        this.ancho = ancho;
        this.alto = alto;
        this.capa = capa;
    }
    static async crearElemento (id, ancho, alto, capa, ruta) {
        let elemento = new Elemento(id, ancho, alto, capa);
        elemento.imagen2D = await Imagen2D.crearImagen2D(0, 0, elemento.capa, elemento.ancho, elemento.alto, 0, 0, 0, 
            1/canvas.clientWidth, 1/canvas.clientHeight, ruta);
        return elemento;
    }
}