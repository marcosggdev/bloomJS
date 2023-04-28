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
    anadirModelo3D () {
        let barril = new Modelo3D(0,0,0,0,0,0,1,1,1,"/bloomJS/assets/barril.dae");
    }

    mostrarMenuAjustesWebGL () {
        GUI.mostrarMenuAjustesWebGL();
    }

}