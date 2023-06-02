/**
 * menu para mostrar nombres y valores de las propiedades de un objeto o clase, de forma que no sean editables. Grupo indica
 * qué conjunto de propiedades mostrar. Por ejemplo el renderer puede tener un grupo de propiedades editables de ajustes,
 * otro grupo no editable de "webgl parametros" etc.
 */
class MenuDisplay extends MenuEdicion {

    //grupo es el nombre de la variable que representa el grupo en el objeto, no la propia variable
    constructor (titulo, objeto) {
        super(titulo, objeto);
        this.modificarNodo();
    }

    modificarNodo () {
        
        let nodosSupervalores = this.nodo.querySelectorAll(".Supervalor");

        Array.from(nodosSupervalores).forEach((nodo) => {
            nodo.querySelector("input").disabled = true;
        });
    }

}