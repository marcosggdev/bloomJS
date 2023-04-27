class GUI {

    static nodo = null;
    static menuSeleccion = null;

    static crearInterfaz (lienzo) {
        let gui = document.createElement("div");
        gui.id = "gui";

        //contenedor de barras de opciones
        let barraVentana = document.createElement("div");
        barraVentana.id = "barraVentana";

        //barra con controles para maximizar/minimizar
        let controlesVentana = document.createElement("div");
        controlesVentana.id = "controlesVentana";

        let iconos = document.createElement("div");
        iconos.id = "iconos";

        let botonMinimizar = new BotonIcono("/bloomJS/img/iconos/minimizar.png", minimizar, false, "minimizar");
        let botonMaximizar = new BotonIcono("/bloomJS/img/iconos/maximizar.png", maximizar, true, "maximizar");
    
        VentanaCanvas.botones.push(botonMinimizar);
        VentanaCanvas.botones.push(botonMaximizar);

        for (let i = 0; i < VentanaCanvas.botones.length; i++) {
            let icono = VentanaCanvas.botones[i];
            iconos.appendChild(icono.nodo);
        }
        controlesVentana.appendChild(iconos);

        //barra de herramientas
        let barraHerramientas = new BarraHerramientas([
            new Boton("Escena", "desplegar", [
                ["Añadir Modelo3D"],
                ["anadirModelo3D"]
            ]),
            new Boton("Desplegable", "desplegar", [
                ["boton1", "boton2"],
                ["c1", "c2"]
            ])
        ]);

        barraVentana.appendChild(controlesVentana);
        barraVentana.appendChild(barraHerramientas.nodo);
        gui.appendChild(controlesVentana);
        gui.appendChild(barraHerramientas.nodo);

        //contenedor de menus que esten sobre el canvas
        let menuCanvas = document.createElement("div");

        //menu global
        let menuGlobal = document.createElement("div");
        menuGlobal.id = "menuGlobal";
        let tituloMenuGlobal = document.createElement("h1");
        tituloMenuGlobal.textContent = "Menú global";
        menuGlobal.appendChild(tituloMenuGlobal);
        menuCanvas.appendChild(menuGlobal);

        //menu de seleccion de objeto
        this.menuSeleccion = new MenuSeleccion(lienzo);
        menuCanvas.appendChild(this.menuSeleccion.nodo);
        menuCanvas.id = "menuCanvas";
        gui.appendChild(menuCanvas);

        //iniciar nodo y añadirlo al DOM
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