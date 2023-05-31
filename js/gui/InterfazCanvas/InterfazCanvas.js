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

    eliminarMenu (menuNodo) {
        
        for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].nodo == menuNodo) {
                //deseleccionamos objeto tb. Se puede entender como codigo adicional al boton de cerrar el menu
                if (!typeof ControlesCanvas === "undefined" && this.menus[i].titulo == "Selección") {
                    ControlesCanvas.objetoSeleccionado = null;
                }
                menuNodo.remove();  
                this.menus.splice(i, 1);
            }
        }

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

    cargarDialogSubirModelo () {
        return new Promise(resolve => {
            let dialog = document.createElement("dialog");
            dialog.id = "subirModelo";
    
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            req.open("GET", "/bloomJS/vistas/editor/subirModelo.php");
            req.send();
        });
    }

}