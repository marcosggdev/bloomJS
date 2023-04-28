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
                ["Añadir Modelo3D"],
                ["anadirModelo3D"]
            ]),
            new Boton("Desplegable", "desplegar", [
                ["boton1", "boton2"],
                ["c1", "c2"]
            ]),
            new Boton("WebGL", "desplegar", [
                ["Ajustes"],
                ["mostrarMenuAjustesWebGL"]
            ])
        ]);

        barraVentana.appendChild(barraHerramientas.nodo);
        barraVentana.appendChild(controlesVentana);
        gui.appendChild(barraVentana);

        //contenedor de menus que esten sobre el canvas
        let menuCanvas = document.createElement("div");

        //menu global
        let menuGlobal = document.createElement("div");
        menuGlobal.id = "menuGlobal";
        let tituloMenuGlobal = document.createElement("h1");
        tituloMenuGlobal.textContent = "Menú global";
        menuGlobal.appendChild(tituloMenuGlobal);
        secundario.appendChild(menuGlobal);

        //menu ajustes de webgl
        let menuAjustesWebGL = document.createElement("div");
        menuAjustesWebGL.id = "menuAjustesWebGL";
        GUI.crearBarraCierre(menuAjustesWebGL);
        let tituloMenuAjustesWebGL = document.createElement("h1");
        tituloMenuAjustesWebGL.textContent = "Menú Ajustes de WebGL";
        menuAjustesWebGL.appendChild(tituloMenuAjustesWebGL);
        GUI.agregarCampo(menuAjustesWebGL, "Renderer ancho");
        GUI.agregarCampo(menuAjustesWebGL, "Renderer alto");
        let botonGuardar = document.createElement("button");
        botonGuardar.id = "guardarMenuAjustesWebGL";
        botonGuardar.textContent = "Guardar";
        botonGuardar.addEventListener("click", () => {
            let campos = menuAjustesWebGL.querySelectorAll(".campo");
            let configuraciones = [[],[]];
            for (let i = 0; i < campos.length; i++) {
                configuraciones[0].push(campos[i].textContent);
                configuraciones[1].push(campos[i].querySelector("input").value);
            }
            //matriz de forma: [ [nombres] [valores] ]
            Renderer.aplicarConfiguracion(configuraciones);
        });
        menuAjustesWebGL.appendChild(botonGuardar);
        principal.appendChild(menuAjustesWebGL);

        //menu de seleccion de objeto
        this.menuSeleccion = new MenuSeleccion(principal);
        menuCanvas.appendChild(this.menuSeleccion.nodo);
        menuCanvas.id = "menuCanvas";
        gui.appendChild(menuCanvas);

        //iniciar nodo y añadirlo al DOM
        this.nodo = gui;
        principal.appendChild(this.nodo);
    }

    static agregarCampo (contenedor, nombre) {
        let div = document.createElement("div");
        div.className = "campo";

        div.textContent = nombre;

        let input = document.createElement("input");
        input.type = "number";

        div.appendChild(input);
        contenedor.appendChild(div);
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

    static mostrarMenuAjustesWebGL () {
        let menu = document.getElementById("menuAjustesWebGL");
        menu.style.opacity = 1;
        menu.style.pointerEvents = "all";
    }

    static crearBarraCierre (contenedor) {
        let nodo = document.createElement("div");
        nodo.className = "barraCierre";

        let img = document.createElement("img");
        img.className = "iconoCierre";
        img.src = "/bloomJS/img/iconos/cerrar.png";

        img.addEventListener("click", () => {
            contenedor.style.opacity = 0;
            contenedor.style.pointerEvents = "none";
        });

        nodo.appendChild(img);
        contenedor.appendChild(nodo);
    }

}