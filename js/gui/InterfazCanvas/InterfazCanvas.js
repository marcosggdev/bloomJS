/**
 * Interfaz que se dibuja sobre el canvas. Actuara de contenedor de otros elementos de interfaz y controlara dichos elementos
 * */
class InterfazCanvas {

    constructor () {
        this.menus = [];
        this.nodo = this.crearNodo();
    }

    crearNodo () {
        let nodo = document.createElement("div");
        nodo.className = "InterfazCanvas";
        return nodo;
    }

    anadirMenu (menu) {
        this.menus.push(menu);
        this.nodo.appendChild(menu.nodo);
    }

    eliminarMenu (menu) {
        for (let i = 0; i < this.menus.length; i++) {
            if (menus[i] == menu) {
                this.menus = this.menus.splice(i, 1);
            }
        }
        menu.parentNode.removeChild(menu);
    }

    buscarMenuPorTitulo (titulo) {
        for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].titulo == titulo) {
                return this.menus[i];
            }
        }
        return null;
    }

    mostrarMenu (menu) {
        for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i] == menu) {
                menu.mostrar();
            }
        }
    }

}