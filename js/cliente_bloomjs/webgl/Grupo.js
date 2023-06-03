/**
 * Conjunto de supervalores de un objeto que tienen algun aspecto en comun.
 */
class Grupo {

    constructor (nombre, objeto, identificadores, nombres, tipos) {
        this.nombre = nombre;
        this.supervalores = this.crearSupervalores(objeto, identificadores, nombres, tipos);
    }

    crearSupervalores (objeto, identificadores, nombres, tipos) {
        let supervalores = [];
        for (let i = 0; i < identificadores.length; i++) {
            let supervalor = new Supervalor(objeto, tipos[i], identificadores[i], nombres[i], objeto[identificadores[i]]);
            supervalores.push(supervalor);
        }
        return supervalores;
    }

}