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
        let modal = document.getElementById("subirModelo");
        modal.showModal();

        /*let barril = new Modelo3D(0,0,0,0,0,0,1,1,1,"/bloomJS/assets/barril.dae");
        GUI.actualizarMenuGlobal();*/
    }

    mostrarMenuAjustesEditor () {
        let menu = document.getElementById("menuAjustesEditor");
        menu.style.opacity = 1;
        menu.style.pointerEvents = "all";
        Renderer.cargarConfiguracion(menu);
    }

    mostrarMenuControles () {
        let menu = document.getElementById("menuControlesEditor");
        menu.style.opacity = 1;
        menu.style.pointerEvents = "all";
        Renderer.cargarControles(menu);
    }

}