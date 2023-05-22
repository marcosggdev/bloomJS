/**
 * Encapsula todos los datos necesarios para dibujar la escena: los modelos, iluminacion, camara, etc...
 * por tanto tendra una funcion exportar
 */
class Escena {

    constructor () {

        this.dibujables = [
            new Grid()
        ];
        this.iluminacion = [];
        this.camara = RendererRefactor.camara;
    }

    anadirDibujable (dibujable) {
        this.dibujables.push(dibujable);
    }

    eliminarDibujable (dibujable) {
        for (let i = 0; i < this.dibujables.length; i++) {
            if (this.dibujables[i] == dibujable) {
                this.dibujables = this.dibujables.splice(i, 1);
                i = this.dibujables.length;
            }
        }
    }

    anadirIluminacion (objetoLuminoso) {
        this.iluminacion.push(objetoLuminoso);
    }

    eliminarIluminacion (objetoLuminoso) {
        for (let i = 0; i < this.iluminacion.length; i++) {
            if (this.iluminacion[i] == objetoLuminoso) {
                this.dibujables = this.dibujables.splice(i, 1);
                i = this.dibujables.length;
            }
        }
    }

    setCamara (camara) {
        this.camara = camara;
    }

    exportar () {
        //implementar para exportar escena
        
    }

    actualizar () {
        for (let i = 0; i < this.dibujables.length; i++) {
            this.dibujables[i].actualizar();
        }
    }

    dibujar () {
        for (let i = 0; i < this.dibujables.length; i++) {
            this.dibujables[i].dibujar();
        }
    }

    comprobarSeleccionDeModelo (rayoClick) {
        for (let i = 0; i < this.dibujables.length; i++) {
            if (LineaRecta.comprobarInterseccionLineaModelo(rayoClick, this.dibujables[i])) {
                if (this.dibujables[i].seleccionable == true) {
                    return this.dibujables[i];
                }
            }
        }
        return false;
    }

    serializar () {
        
    }
    
}