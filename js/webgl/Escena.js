/**
 * Encapsula todos los datos necesarios para dibujar la escena: los modelos, iluminacion, camara, etc...
 * por tanto tendra una funcion exportar
 */
class Escena {

    constructor (dibujables) {

        //parametros de BD
        this.id = "";
        this.titulo = "Escena";
        this.descripcion = "";

        //parametros del objeto
        if (dibujables != null) {
            this.dibujables = dibujables;
        } else {
            this.dibujables = [
                new Grid()
            ];
        }
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

    actualizar () {
        for (let i = 0; i < this.dibujables.length; i++) {
            if (this.dibujables[i] != null) {
                this.dibujables[i].actualizar();
            }
        }
    }

    dibujar () {
        for (let i = 0; i < this.dibujables.length; i++) {
            if (this.dibujables[i] != null) {
                this.dibujables[i].dibujar();
            }
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
        //devuelve un string con toda la informacion de la escena de forma que sea legible por la funcion leer deserializar para
        //crear de nuevo la misma escena.
        let dibujables = [];
        for (let i = 0; i < this.dibujables.length; i++) {
            dibujables.push(this.dibujables[i].serializar());
        }

        let iluminacion = [];
        for (let i = 0; i < this.iluminacion.length; i++) {
            iluminacion.push(this.iluminacion[i].serializar());
        }

        let camara = this.camara.serializar();

        let serializacionOBJ = {
            "id": String(this.id),
            "titulo": String(this.titulo),
            "descripcion": String(this.descripcion),
            "dibujables": dibujables,
            "iluminacion": iluminacion,
            "camara": camara
        };

        return serializacionOBJ;
    }

    static leerEscenaSerializada (serializacion) {
  
        let json = JSON.parse(serializacion);

        let escena = new Escena(null);
        escena.id = json.id;
        escena.nombre = json.nombre;
        escena.descripcion = json.descripcion;

        let dibujables = json.dibujables;
        for (let i = 0; i < dibujables.length; i++) {
            let clase = dibujables[i].clase;
            
            switch (clase) {
                case "Modelo3D": 
                    let obj = null;
                    Modelo3D.deserializar(dibujables[i]).then(
                        function (modelo) {
                            obj = modelo;
                            if (obj != null) {
                                escena.anadirDibujable(obj);
                            }
                        }
                    );
                    break;
            }
        }

        let iluminacion = json.iluminacion;
        for (let i = 0; i < iluminacion.length; i++) {
            let clase = iluminacion[i].clase;
            let parametros = iluminacion[i].parametros;
            let obj = new clase(parametros);
            escena.anadirIluminacion(obj);
        }

        let camara = json.camara;
        let clase = camara.clase;
        let obj = null;
        switch (clase) {
            case "ArcballCamera":
                obj = ArcballCamera.deserializar(camara); break;
        }
        RendererRefactor.camara = obj;
        escena.camara = obj;
        RendererRefactor.escena = escena;
    }
    
}