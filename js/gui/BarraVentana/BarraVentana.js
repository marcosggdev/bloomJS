/**
 * Barra horizontal con solo iconos alineados a la derecha para funciones relacionadas
 * con el elemento contenedor de la barra
 */
class BarraVentana {

    /*
        <link rel="stylesheet" href="js/gui/BarraVentana/BarraVentana.css">
        <script src="js/gui/BarraVentana/BotonImagen.js"></script>
        <script src="js/gui/BarraVentana/BarraVentana.js"></script>
        <script>
            let barra = new BarraVentana("Titulo",["/bloomJS/img/iconos/minimizar.png", "/bloomJS/img/iconos/maximizar.png"], 
            [BarraVentana.minimizar, BarraVentana.maximizar]);
        </script>
    */

    constructor (titulo, rutas, callbacks) {

        this.titulo = titulo;
        this.rutas = rutas;
        this.callbacks = callbacks;

        this.botonesImagen = this.crearBotonesImagen(rutas, callbacks);
        this.nodo = this.crearNodo(this.titulo, this.botonesImagen);

    }

    crearBotonesImagen (rutas, callbacks) {
        let botonesImagen = [];
        for (let i = 0; i < rutas.length; i++) {
            let boton = new BotonImagen(rutas[i], callbacks[i]);
            botonesImagen.push(boton);
        }
        return botonesImagen;
    }

    crearNodo (titulo, botonesImagen) {
        let nodo = document.createElement("div");
        nodo.className = "BarraVentana";

        let h1 = document.createElement("h1");
        h1.textContent = titulo;
        nodo.appendChild(h1);

        let botones = document.createElement("div");
        botones.className = "botones";

        for (let i = 0; i < botonesImagen.length; i++) {
            botones.appendChild(botonesImagen[i].nodo);
        }
        nodo.appendChild(botones);
        return nodo;
    }

    static maximizar () {
        console.log("maximizar");
    }

    static minimizar () {
        console.log("minimizar");
    }

}