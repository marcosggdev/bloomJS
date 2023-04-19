class Contenedor {

    constructor (html) {
        this.nodo = this.crearNodo(html);
    }

    crearNodo (html) {
        let contenedor = document.createElement("div");
        contenedor.className = "contenedor";
        contenedor.innerHTML = html;

        //cuando se hace clik en el nodo, se maneja el click desde el objeto que lo contiene
        contenedor.addEventListener('click', this.click);
        contenedor.addEventListener('blur', this.blur);
        contenedor.addEventListener('dblclick', this.dblclick);
        return contenedor;
    }

    click (e) {
        let nodo = e.target;
        nodo.classList.add("focus");
    }

    blur (e) {
        let nodo = e.target;
    }

    dblclick () {
        console.log("dblclick");
    }

}