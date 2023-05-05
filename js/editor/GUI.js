class GUI {

    static nodo = null;
    static menuSeleccion = null;

    static crearInterfaz (principal, secundario) {
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
                ["Añadir Modelo3D", "Modelos"],
                ["anadirModelo3D", "crearMenuModelos"]
            ]),
            new Boton("Editor", "desplegar", [
                ["Ajustes", "Controles"],
                ["crearMenuAjustesEditor", "crearMenuControles"]
            ])
        ]);

        barraVentana.appendChild(barraHerramientas.nodo);
        barraVentana.appendChild(controlesVentana);
        gui.appendChild(barraVentana);

        //contenedor de menus que esten sobre el canvas
        let menuCanvas = document.createElement("div");

        //menu global
        GUI.crearMenuGlobal(secundario);

        //menu de seleccion de objeto
        this.menuSeleccion = new MenuSeleccion(principal);
        menuCanvas.appendChild(this.menuSeleccion.nodo);
        menuCanvas.id = "menuCanvas";
        gui.appendChild(menuCanvas);

        //iniciar nodo y añadirlo al DOM
        this.nodo = gui;
        principal.appendChild(this.nodo);
    }

    static crearMenuGlobal (contenedor) {
        let menuGlobal = document.createElement("div");
        menuGlobal.id = "menuGlobal";

        let tituloMenuGlobal = document.createElement("h1");
        tituloMenuGlobal.textContent = "Global";
        menuGlobal.appendChild(tituloMenuGlobal);

        let objetosDibujables = document.createElement("div");
        objetosDibujables.id = "objetosDibujables";
        objetosDibujables.className = "menuSubcontenedor";
        menuGlobal.appendChild(objetosDibujables);

        contenedor.appendChild(menuGlobal);
    }

    static actualizarMenuGlobal () {
        let objetosDibujables = document.getElementById("objetosDibujables");
        
        //vaciar nodo
        objetosDibujables.innerHTML = "";

        //volver a cargarlo
        for (let i = 0; i < Renderer.dibujables.length; i++) {

            let tipo = document.createElement("p");
            tipo.textContent = Renderer.dibujables[i].constructor.name;

            let nombre = document.createElement("p");
            nombre.textContent = "Ejemplo";

            let objetoDibujable = document.createElement("div");
            objetoDibujable.className = "objetoDibujable";

            objetoDibujable.objeto = Renderer.dibujables[i];

            if (Renderer.dibujables[i].constructor.name != "Grid") {
                objetoDibujable.addEventListener("click", () => {
                    VentanaCanvas.seleccionarObjeto(Renderer.dibujables[i], objetoDibujable);
                });
            } else {
                objetoDibujable.style.pointerEvents = "none";
                objetoDibujable.style.backgroundColor = "#170817";
                objetoDibujable.style.boxShadow = "inset 0 0 2px black";
            }


            objetoDibujable.appendChild(tipo);
            objetoDibujable.appendChild(nombre);
            objetosDibujables.appendChild(objetoDibujable);
        }
    }

    static agregarCampo (contenedor, nombre) {
        let div = document.createElement("div");
        div.className = "campo";

        let p = document.createElement("p");
        p.textContent = nombre;
        div.appendChild(p);

        let input = document.createElement("input");
        input.type = "number";
        div.appendChild(input);

        contenedor.appendChild(div);
    }

    static agregarCampoNoEditable (contenedor, nombre, valor) {
        let div = document.createElement("div");
        div.className = "campo";

        let p = document.createElement("p");
        p.textContent = nombre;
        div.appendChild(p);

        let input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        input.disabled = true;
        div.appendChild(input);

        contenedor.appendChild(div);
    }

    //par nombre - valor donde el valor no es editable
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

    //par nombre valor donde el valor es editable
    static anadirNombreValorEditable (contenedor, nombre, valor) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        let p = document.createElement("p");
        p.textContent = nombre;

        nodo.appendChild(p);

        let input = document.createElement("input");
        input.type = "text";
        input.value = valor;

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

    static anadirLineaNombresValoresEditablesModelo (contenedor, modelo, nombres, valores, atributos, clase, tipo = "number", step, botonEnlazar) {
        let nodo = document.createElement("div");
        nodo.className = clase;

        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValorEditableModelo(nodo, modelo, nombres[i], valores[i], atributos[i], tipo, step);
        }

        if (botonEnlazar) {
            let boton = new BotonBooleano("activar", "desactivar", true, nodo.querySelectorAll("div.nombreValor"));
            nodo.appendChild(boton.nodo);
        }

        contenedor.appendChild(nodo);
    }

    static anadirNombreValorEditableModelo (contenedor, modelo, nombre, valor, atributo, tipo = "number", step) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        let p = document.createElement("p");
        p.textContent = nombre;
        nodo.appendChild(p);

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

    static ocultarMenuAjustesEditor () {
        let menu = document.getElementById("menuAjustesEditor");
        menu.style.opacity = 0;
        menu.style.pointerEvents = "none";
    }

    static crearBarraCierre (contenedor, titulo) {
        let nodo = document.createElement("div");
        nodo.className = "barraCierre";

        let h2 = document.createElement("h2");
        h2.textContent = titulo;
        nodo.appendChild(h2);

        let iconos = document.createElement("div");
        iconos.className = "grupoIconos";

        let img = document.createElement("img");
        img.className = "iconoCierre";
        img.src = "/bloomJS/img/iconos/cerrar.png";

        img.addEventListener("click", () => {
            contenedor.parentNode.removeChild(contenedor);
        });
        iconos.appendChild(img);
        nodo.appendChild(iconos);
        contenedor.appendChild(nodo);
    }

}