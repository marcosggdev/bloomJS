class GUI {

    static nodo = null;
    static menuSeleccion = null;

    static iniciar () {
        let nodo = document.createElement("div");
    }

    static crearInterfaz (lienzo) {
        let gui = document.createElement("div");
        gui.id = "gui";

        //menu de seleccion de objeto
        this.menuSeleccion = new MenuSeleccion(lienzo);

        gui.appendChild(this.menuSeleccion.nodo);

        this.nodo = gui;

        lienzo.appendChild(this.nodo);
    }

    static anadirNombreValor (contenedor, nombre, valor) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        let p = document.createElement("p");
        p.textContent = nombre;

        nodo.appendChild(p);

        let input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        input.disabled = true;

        nodo.appendChild(input);

        contenedor.appendChild(nodo);
    }

    static anadirLineaNombresValores (contenedor, nombres, valores, clase) {
        let nodo = document.createElement("div");
        nodo.className = clase;

        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValor(nodo, nombres[i], valores[i]);
        }

        contenedor.appendChild(nodo);
    }

    static anadirLineaNombresValoresEditables (contenedor, modelo, nombres, valores, atributos, clase, tipo = "number", step, botonEnlazar) {
        let nodo = document.createElement("div");
        nodo.className = clase;

        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValorEditable(nodo, modelo, nombres[i], valores[i], atributos[i], tipo, step);
        }

        if (botonEnlazar) {
            let boton = new BotonBooleano("activar", "desactivar", true, nodo.querySelectorAll("div.nombreValor"));
            nodo.appendChild(boton.nodo);
        }

        contenedor.appendChild(nodo);
    }

    static anadirNombreValorEditable (contenedor, modelo, nombre, valor, atributo, tipo = "number", step) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        nodo.textContent = nombre;

        let input = document.createElement("input");
        input.type = tipo;
        input.value = valor;
        input.id = atributo;

        if (tipo === "number") {
            input.step = step;
        }
        
        input.addEventListener("change", () => {
            let controlador = contenedor.querySelector("img.enlazar");
            if (controlador != null && controlador.classList.contains("activo")) {
                //copia valores y se encarga de ejecutar las funciones tambien
                this.copiarValorAAdyacentes(contenedor, input.value, modelo);
            }
            this.ejecutarFuncion(input, modelo);
        });

        nodo.appendChild(input);

        contenedor.appendChild(nodo);
    }

    static ejecutarFuncion (input, modelo) {
        switch (input.id) {
            case "posX":
            case "posY":
            case "posZ": 
                modelo.mover(input.id, input.value); break;
            case "anguloX":
            case "anguloY":
            case "anguloZ":
                modelo.rotar(input.id, input.value); break;
            case "factorX":
            case "factorY":
            case "factorZ":
                modelo.escalar(input.id, input.value); break;
        }
    }

    static copiarValorAAdyacentes (contenedor, valor, modelo) {
        let hijos = contenedor.querySelectorAll("div.nombreValor input");
        Array.from(hijos).forEach((input) => {
            input.value = valor;
            this.ejecutarFuncion(input, modelo);
        });
    }

}