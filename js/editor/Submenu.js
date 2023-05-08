class Submenu {

    constructor (arraySubmenu) {
        this.nombres = arraySubmenu[0];
        this.acciones = arraySubmenu[1];

        this.nodo = this.crearNodo(this.nombres, this.acciones);
    }

    crearNodo (nombres, acciones) {
        let ul = document.createElement("ul");
        ul.className = "submenu";

        for (let i = 0; i < nombres.length; i++) {
            let li = document.createElement("li");
            li.textContent = nombres[i];
            li.addEventListener("click", () => {
                this[acciones[i]]();
                this.ocultar();
            });
            ul.appendChild(li);
        }

        return ul;
    }

    desplegar () {
        this.nodo.style.opacity = 1;
        this.nodo.style.pointerEvents = "all";
    }

    ocultar () {
        this.nodo.style.opacity = 0;
        this.nodo.style.pointerEvents = "none";
    }

    c1 () {
        console.log("c1");
    }
    c2 () {
        console.log("c2");
    }

    //permite añadir un modelo 3D a la escena. Para ello se sube al servidor el archivo dae y la textura
    anadirModelo3D () {
        let dialog = document.createElement("dialog");
        dialog.id = "subirModelo";

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                dialog.innerHTML += this.responseText;
                let lienzo = document.getElementById("lienzo");
                lienzo.appendChild(dialog);
                ControlesSubirModelo.crearControles(dialog);
                dialog.showModal();
            }
        };
        req.open("GET", "/bloomJS/vistas/editor/subirModelo.php");
        req.send();

        /*let barril = new Modelo3D(0,0,0,0,0,0,1,1,1,"/bloomJS/assets/barril.dae");
        GUI.actualizarMenuGlobal();*/
    }

    /**
     * Muestra un menú con un conjunto de modelos prehechos (guardados permanentemente en el servidor) que el usuario puede seleccionar
     * e importar a la escena en el 0, 0, 0 con un click, con valores estandar de atributos
    */
    crearMenuModelos () {
        let antiguoMenu = document.getElementById("menuModelos");
        if (antiguoMenu == null) {
            let menu = document.createElement("div");
            menu.id = "menuModelos";
            menu.className = "menuPopUp visible";
            GUI.crearBarraCierre(menu, "Modelos predeterminados");
            GUI.generarMalla(menu, "/bloomJS/vistas/editor/modelo.php", "defecto", "0", null, 3);
            document.getElementById("gui").appendChild(menu);
        } else {
            antiguoMenu.classList.add("visible");
        }
    }

    crearMenuAjustesEditor () {
        let antiguoMenu = document.getElementById("menuModelos");
        if (antiguoMenu == null) {
            let menu = document.createElement("div");
            menu.id = "menuAjustesEditor";
            menu.className = "menuPopUp visible";
            GUI.crearBarraCierre(menu, "Ajustes Editor");
            
            for (let i = 0; i < Renderer.nombresPropiedades.length; i++) {
                GUI.anadirNombreValorEditable(menu, Renderer.nombresPropiedades[i], Renderer.valoresPropiedades[i]);
            }
            let guardar = document.createElement("button");
            guardar.className = "botonGuardar";
            guardar.textContent = "Guardar";
            guardar.addEventListener("click", () => {
                let nombres = menu.querySelectorAll("div.nombreValor p");
                let inputs = menu.querySelectorAll("div.nombreValor input");
                Renderer.actualizarAjustes(nombres, inputs);
                menu.parentNode.removeChild(menu);
            });
            menu.appendChild(guardar);
            document.getElementById("gui").appendChild(menu);
        } else {
            antiguoMenu.classList.add("visible");
        }
    }

    crearMenuControles () {
        let antiguoMenu = document.getElementById("menuControles");
        if (antiguoMenu == null) {
            let menu = document.createElement("div");
            menu.id = "menuControles";
            menu.className = "menuPopUp visible";
            GUI.crearBarraCierre(menu, "Controles");
            
            for (let i = 0; i < Renderer.controlesNombres.length; i++) {
                GUI.anadirNombreValor(menu, Renderer.controlesNombres[i], Renderer.controlesAcciones[i]);
            }
            document.getElementById("gui").appendChild(menu);
        } else {
            antiguoMenu.classList.add("visible");
        }
    }

    exportarImagen () {
        Renderer.maximizarAjustesParaExportacion();
        //esperamos 2s a que se apliquen los cambios
        setTimeout(function () {
            let enlaceAuxiliar = document.createElement('a');
            enlaceAuxiliar.download = 'BloomJS.png';
            enlaceAuxiliar.href = canvas.toDataURL();
            enlaceAuxiliar.click();
            enlaceAuxiliar = null;
            Renderer.resetearAjustes();
        }, 2000);
    }

    exportarEscena () {
        console.log("exportar escena");
    }

    exportarCanvas () {
        console.log("exportar canvas");
    }

}