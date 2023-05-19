/**
 * MenuMalla: igual que menu pero se pasa funcion para cargar objetos, no a mano. Pensado para cargar malla de plantillas
 * desde el servidor
 */
class MenuMalla extends MenuGeneral {

    //titulo y objetos a representar
    constructor (titulo, plantilla, tipo, limit, filas, columnas) {
        super(titulo);
        this.ampliarNodo(plantilla, tipo, limit, filas, columnas);
    }

    ampliarNodo (plantilla, tipo, limit, filas, columnas) {
        //cargar malla desde servidor
        let req = new XMLHttpRequest();
        let self = this;
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                /**
                 * Nota importante: antiguamente se habia pensado usar innHTML += para sumar la respuesta al html que ya se tiene.
                 * Esto es un error, porque eso es equivalente a decir que html = html + algo, lo cual "recrea" el DOM, por tanto
                 * destruye los listeners que teniamos añadidos previamente. En este caso, si se usase, el listener de cerrar el menu
                 * escrito en la clas padre desapareceria sin dejar errores
                 */
                self.nodo.insertAdjacentHTML("beforeend", this.responseText);
                let scriptInput = self.nodo.querySelector("input[class='script'][type='hidden']");
                let scriptDOM = document.createElement("script");
                scriptDOM.src = scriptInput.value;
                self.nodo.appendChild(scriptDOM);
            }
        };
        let formData = new FormData();
        formData.append("tipo", tipo);
        formData.append("numero", limit);
        formData.append("filas", filas);
        formData.append("columnas", columnas);
        req.open("POST", plantilla);
        req.send(formData);
    }

}