class MenuSeleccion extends MenuGeneral {

    constructor (titulo, modelo) {
        super(titulo);
        this.modelo = modelo;
        this.ampliarNodo(modelo);
    }

    ampliarNodo (modelo) {

        let botonCerrar = this.nodo.querySelector(".BarraCierre img");
        botonCerrar.addEventListener("click", () => {
            ControlesCanvas.objetoSeleccionado = null;
        });

        let contenedor = document.createElement("div");

        GUI.crearListaPestanas(contenedor, ["Objeto", "Adicional"], 0);

        let botonObjeto = contenedor.querySelector("#Objeto");
        let botonAdicional = contenedor.querySelector("#Adicional");

        this.nodo.appendChild(contenedor);

        let propiedades = document.createElement("div");

        let submenuObjeto = document.createElement("div");
        submenuObjeto.className = "propiedades objeto";

        let supervaloresObjeto = modelo.supervalores.filter(supervalor => {
            return supervalor.editable;
        });
        for (let i = 0; i < supervaloresObjeto.length; i++) {
            submenuObjeto.appendChild(supervaloresObjeto[i].nodo);
        }
        propiedades.appendChild(submenuObjeto);

        let submenuAdicionales = document.createElement("div");
        submenuAdicionales.className = "propiedades adicionales invisible";

        let supervaloresAdicionales = modelo.supervalores.filter(supervalor => {
            return supervalor.editable;
        });
        for (let i = 0; i < supervaloresAdicionales.length; i++) {
            submenuAdicionales.appendChild(supervaloresAdicionales[i].nodo);
        }
        propiedades.appendChild(submenuAdicionales);

        //alternar submenus
        botonObjeto.addEventListener("click", () => {
            submenuObjeto.classList.remove("invisible");
            submenuAdicionales.classList.add("invisible");
            botonObjeto.classList.add("actual");
            botonAdicional.classList.remove("actual");
        });

        botonAdicional.addEventListener("click", () => {
            submenuObjeto.classList.add("invisible");
            submenuAdicionales.classList.remove("invisible");
            botonObjeto.classList.remove("actual");
            botonAdicional.classList.add("actual");
        });

        this.nodo.appendChild(propiedades);
    }

    actualizarDatos (modelo) {
        
        let submenuObjeto = this.nodo.querySelector(".propiedades.objeto");
        let submenuAdicionales = this.nodo.querySelector(".propiedades.adicionales");

        submenuObjeto.innerHTML = "";
        submenuAdicionales.innerHTML = "";

        for (let i = 0; i < modelo.supervaloresObjeto.length; i++) {
            submenuObjeto.appendChild(modelo.supervaloresObjeto[i].nodo);
        }

        for (let i = 0; i < modelo.supervaloresAdicionales.length; i++) {
            submenuAdicionales.appendChild(modelo.supervaloresAdicionales[i].nodo);
        }
    }

    actualizar () {
        if (ControlesCanvas.objetoSeleccionado != null) {
            this.actualizarDatos(ControlesCanvas.objetoSeleccionado);
        }
    }

}