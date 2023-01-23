class BotonIcono {
    constructor (ruta, ancho, alto, callback) {
        this.nodoImagen = document.createElement("img");
        this.nodoImagen.src = ruta;
        this.nodoImagen.style.width = ancho + "px";
        this.nodoImagen.style.height = alto + "px";
        this.nodoImagen.addEventListener('click', callback);
    }
}