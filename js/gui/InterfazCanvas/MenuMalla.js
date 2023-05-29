/**
 * MenuMalla: igual que menu pero se pasa funcion para cargar objetos, no a mano. Pensado para cargar malla de plantillas
 * desde el servidor
 */
class MenuMalla extends MenuGeneral {

    //titulo y objetos a representar
    constructor (titulo, plantilla, tipo, limit, filas, columnas) {
        super(titulo);
        this.ampliarNodo(titulo, plantilla, tipo, limit, filas, columnas);
    }

    ampliarNodo (titulo, plantilla, tipo, limit, filas, columnas) {
        //cargar malla desde servidor
        Utilidades.cargarPlantilla(this.nodo, plantilla, {"titulo":titulo, "tipo": tipo, "numero": limit, "filas": filas, "columnas": columnas});
    }

}