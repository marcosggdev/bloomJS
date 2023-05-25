/**
 * Barra horizontal con solo iconos alineados a la derecha para funciones relacionadas
 * con el elemento contenedor de la barra
 */
class BarraVentana {

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
        //elementos que no estan dentro de ventana y que no contienen ventana
        let elementos = document.body.querySelectorAll(":not(.VentanaCanvas *):not(.VentanaCanvas):not(*:has(.VentanaCanvas))");
        Array.from(elementos).forEach((elemento) => {
            elemento.classList.add("minimizado");
        });
        let ventanaCanvas = document.querySelector(".VentanaCanvas");
        let barraVentana = document.querySelector(".VentanaCanvas .BarraVentana");
        let menuInterfaz = document.querySelector(".VentanaCanvas .MenuInterfaz");
        let interfazCanvas = document.querySelector(".VentanaCanvas .InterfazCanvas");
        let canvas = document.querySelector("canvas");
        ventanaCanvas.classList.add("maximizado");
        barraVentana.classList.add("maximizado");
        menuInterfaz.classList.add("maximizado");
        interfazCanvas.classList.add("maximizado");
        canvas.classList.add("maximizado");
    }

    static minimizar () {
        let elementos = document.body.querySelectorAll(":not(.VentanaCanvas *):not(.VentanaCanvas):not(*:has(.VentanaCanvas))");
        Array.from(elementos).forEach((elemento) => {
            elemento.classList.remove("minimizado");
        });
        let ventanaCanvas = document.querySelector(".VentanaCanvas");
        let barraVentana = document.querySelector(".VentanaCanvas .BarraVentana");
        let menuInterfaz = document.querySelector(".VentanaCanvas .MenuInterfaz");
        let interfazCanvas = document.querySelector(".VentanaCanvas .InterfazCanvas");
        let canvas = document.querySelector("canvas");
        ventanaCanvas.classList.remove("maximizado");
        barraVentana.classList.remove("maximizado");
        menuInterfaz.classList.remove("maximizado");
        interfazCanvas.classList.remove("maximizado");
        canvas.classList.remove("maximizado");
    }

    //para añadir un menu interfaz a posteriori contenido en el nodo de la barra de la ventana y ahorrar espacio
    setMenuInterfaz (menuInterfaz) {
        this.nodo.querySelector("h1").after(menuInterfaz);
    }

}