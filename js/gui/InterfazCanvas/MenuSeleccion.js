class MenuSeleccion extends MenuGeneral {

    constructor (titulo, modelo) {
        super(titulo);
        this.modelo = modelo;
        this.ampliarNodo(modelo);
    }

    ampliarNodo (modelo) {

        let contenedor = document.createElement("div");

        GUI.crearListaPestanas(contenedor, ["Objeto", "Adicional"], 0);

        let botonObjeto = contenedor.querySelector("#Objeto");
        let botonAdicional = contenedor.querySelector("#Adicional");

        this.nodo.appendChild(contenedor);

        let propiedades = document.createElement("div");

        let submenuObjeto = document.createElement("div");
        submenuObjeto.className = "propiedades objeto";
        for (let i = 0; i < modelo.supervaloresObjeto.length; i++) {
            submenuObjeto.appendChild(modelo.supervaloresObjeto[i].nodo);
        }
        propiedades.appendChild(submenuObjeto);

        let submenuAdicionales = document.createElement("div");
        submenuAdicionales.className = "propiedades adicionales invisible";
        for (let i = 0; i < modelo.supervaloresAdicionales.length; i++) {
            submenuAdicionales.appendChild(modelo.supervaloresAdicionales[i].nodo);
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

}