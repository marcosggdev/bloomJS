/**
 * menu para mostrar nombres y valores de las propiedades de un objeto o clase, de forma que no sean editables. Grupo indica
 * qué conjunto de propiedades mostrar. Por ejemplo el renderer puede tener un grupo de propiedades editables de ajustes,
 * otro grupo no editable de "webgl parametros" etc.
 */
class MenuDisplay extends MenuGeneral {

    //grupo es el nombre de la variable que representa el grupo en el modelo, no la propia variable
    constructor (titulo, modelo, grupo) {
        super(titulo);
        this.modelo = modelo;
        
        let grupos = modelo.grupos;

        //grupos puede ser null o []
        if (grupos != null) {

            let encontrado = false;
            for (let i = 0; i < grupos.length; i++) {
                //tiene grupos y el que buscamos
                if (grupos[i].nombre == grupo) {
                    this.ampliarNodo(grupos[i]);
                    encontrado = true;
                }
            }

            //tiene grupos pero no el que buscamos
            if (!encontrado) {
                let p = document.createElement("p");
                p.textContent = "El elemento no tiene propiedades que mostrar...";
                this.nodo.appendChild(p);
            }

        } else {
            let p = document.createElement("p");
            p.textContent = "El elemento no tiene propiedades que mostrar...";
            this.nodo.appendChild(p);
        }
    }

    ampliarNodo (grupo) {

        let propiedades = document.createElement("div");

        let submenuPropiedades = document.createElement("div");
        submenuPropiedades.className = "propiedades";

        for (let i = 0; i < grupo.supervalores.length; i++) {
            //grupo una serie de supervalores
            submenuPropiedades.appendChild(grupo.supervalores[i].nodo);
        }
        propiedades.appendChild(submenuPropiedades);
        this.nodo.appendChild(propiedades);
    }

}