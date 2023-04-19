class Contenedor {

    constructor (html) {
        this.nodo = this.crearNodo(html);
    }

    crearNodo (html) {
        let contenedor = document.createElement("div");
        contenedor.className = "contenedor";
        contenedor.innerHTML = html;
        contenedor.draggable = true;

        var self = this;
        //cuando se hace clik en el nodo, se maneja el click desde el objeto que lo contiene
        contenedor.addEventListener('click', function () {
            self.click(self);
        });

        return contenedor;
    }

    click (contenedor) {
        contenedor.nodo.classList.add("focus");
    }

}