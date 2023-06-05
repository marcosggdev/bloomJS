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

        //Submenu de atributos editables del objeto
        let submenuObjeto = document.createElement("div");
        submenuObjeto.className = "propiedades objeto";

        let submenuAdicionales = document.createElement("div");
        submenuAdicionales.className = "propiedades adicionales invisible"; 

        for (let i = 0; i < modelo.supervalores.length; i++) {
            
            if (modelo.supervalores[i].editable) {
                submenuObjeto.appendChild(modelo.supervalores[i].nodo);
            } else {
                submenuAdicionales.appendChild(modelo.supervalores[i].nodo);
            }

        }

        propiedades.appendChild(submenuObjeto);
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

        for (let i = 0; i < modelo.supervalores.length; i++) {
            if (modelo.supervalores[i].editable) {
                submenuObjeto.appendChild(modelo.supervalores[i].nodo);
            } else {
                submenuAdicionales.appendChild(modelo.supervalores[i].nodo);
            }
        }

    }

    //hay cambios en el objeto, asi que tenemos que sincronizar datos del menu con los del objeto
    actualizar () {
        if (ControlesCanvas.objetoSeleccionado != null) {
            this.actualizarDatos(ControlesCanvas.objetoSeleccionado);
        }
    }

}