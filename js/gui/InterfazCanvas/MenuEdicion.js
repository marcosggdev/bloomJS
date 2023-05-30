/**
 * Menu de nombres / inputs para editar rapidamente valores de un objeto. Los inputs seran personalizados
 * y cambiaran los valores de l objeto en tiempo real.
 */
class MenuEdicion extends MenuGeneral {

    constructor (titulo, objeto) {
        super(titulo);
        this.objeto = objeto;
        this.ampliarNodo(objeto);
    }

    ampliarNodo (objeto) {
        
        let supervalores = objeto.supervaloresObjeto;

        if (supervalores != null) {
            let contenedorEditables = document.createElement("div");
            contenedorEditables.className = "contenedorEditables";
    
            for (let i = 0; i < supervalores.length; i++) {
                contenedorEditables.appendChild(supervalores[i].nodo);
            }
    
            this.nodo.appendChild(contenedorEditables);
        } else {
            let contenedorEditables = document.createElement("div");
            contenedorEditables.className = "contenedorEditables";

            let error = document.createElement("p");
            error.textContent = "La forma elegida no tiene atributos...";
            contenedorEditables.appendChild(error);
            this.nodo.appendChild(contenedorEditables);
        }
    }

}