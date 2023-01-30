class Html {
    constructor (ancho, alto, tag) {
        this.ancho = ancho;
        this.alto = alto;
        this.tag = tag;
        this.iniciarNodo();
    }

    static async crearHtml (ancho, alto, tag) {
        let html = new Html(ancho, alto, tag);
        await html.iniciarImagen();
        return html;
    }

    iniciarNodo () {
        let nodo = document.createElement(this.tag);
        nodo.style.width = ""+this.ancho+"px";
        nodo.style.height = ""+this.alto+"px";
        this.nodo = nodo;
    }

    async iniciarImagen () {
        console.log(this.ancho);
        let imagen = await Imagen2D.crearImagen2D(0,0,0,this.ancho,this.alto,0,0,0,1,1,"../img/pluma.jpg");
        this.imagen = imagen;
    }
}