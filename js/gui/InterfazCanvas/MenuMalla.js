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
                self.nodo.innerHTML += this.responseText;
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