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
            ]),
            new Boton("Exportar", "desplegar", [
                ["Imagen", "Escena", "Canvas"],
                ["exportarImagen", "exportarEscena", "exportarCanvas"]
            ]),
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

            if (Renderer.dibujables[i] instanceof Modelo3D || Renderer.dibujables[i].constructor.name == "Grid") {

                let tipo = document.createElement("p");
                tipo.textContent = Renderer.dibujables[i].constructor.name;
    
                let nombre = document.createElement("p");
                nombre.textContent = "Ejemplo";
    
                let objetoDibujable = document.createElement("div");
                objetoDibujable.className = "objetoDibujable";
    
                objetoDibujable.objeto = Renderer.dibujables[i];
    
                if (Renderer.dibujables[i].constructor.name != "Grid") {
                    objetoDibujable.addEventListener("click", () => {
                        VentanaCanvas.deseleccionarObjeto();
                        VentanaCanvas.seleccionarObjeto(Renderer.dibujables[i]);
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

    //par nombre valor donde el valor es editable
    static anadirNombreValorNumericoEditable (objeto, contenedor, nombre, valor) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        let p = document.createElement("p");
        p.textContent = nombre;

        nodo.appendChild(p);

        let input = document.createElement("input");
        input.type = "number";
        input.step = 0.1;
        input.min = -9000;
        input.max = 9000;
        input.value = valor;
        input.addEventListener("input", () => {
            let parametros = contenedor.querySelectorAll(".nombreValor");
            
            let cambiosOBJ = {};

            for (let i = 0; i < parametros.length; i++) {
                //nombre a mostrar de la variable
                let nombre = parametros[i].querySelector("p").textContent;
                //nombre de la variable
                let parametro = objeto.asociacionNombresParametros[nombre];
                let valor = parametros[i].querySelector("input").value;
                cambiosOBJ[parametro] = valor; 
            }
            objeto.actualizarParametros(cambiosOBJ);
        });

        nodo.appendChild(input);

        contenedor.appendChild(nodo);
    }

        //par nombre valor donde el valor es editable pero de tipos definidos, como BooleanoDOM o ColorDOM. Se trata de utilizar
        //esas clases para obtener la representacion DOM del input, guardado dentro del objeto por el tipo de dato y su nodo
        static anadirInputEditable (objeto, contenedor, nombre) {

            //nodo padre
            let nodo = document.createElement("div");
            nodo.className = "nombreValor";
    
            //nombre del atributo
            let p = document.createElement("p");
            p.textContent = nombre;
            nodo.appendChild(p);
            let input = objeto[objeto.asociacionNombresParametros[nombre]].nodo;

            input.addEventListener("input", () => {
                let parametros = contenedor.querySelectorAll(".nombreValor");
                
                let cambiosOBJ = {};
    
                for (let i = 0; i < parametros.length; i++) {
                    //nombre a mostrar de la variable
                    let nombre = parametros[i].querySelector("p").textContent;
                    //nombre de la variable
                    let parametro = objeto.asociacionNombresParametros[nombre];
                    let valor = parametros[i].querySelector("input").value;
                    cambiosOBJ[parametro] = valor; 
                }
                objeto.actualizarParametros(cambiosOBJ);
            });
    
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

    static anadirGrupoNombresValoresEditablesModelo (contenedor, modelo, nombres, valores, atributos, clase, tipo = "number", step, botonEnlazar) {
        let nodo = document.createElement("div");
        if (!botonEnlazar) {
            nodo.className = clase;
        } else {
            nodo.className = clase + "ConIconos";
        }

        let nombresValores = document.createElement("div");
        nombresValores.className = "contenedorNombresValores";
        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValorEditableModelo(nombresValores, modelo, nombres[i], valores[i], atributos[i], tipo, step);
        }
        nodo.appendChild(nombresValores);

        let iconos = document.createElement("div");
        iconos.className = "iconos";

        if (botonEnlazar) {
            let boton = new BotonBooleano("activar", "desactivar", true, nombresValores.querySelectorAll("div.nombreValor"));
            iconos.appendChild(boton.nodo);
        }
        nodo.appendChild(iconos);

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
            let controlador = contenedor.parentNode.querySelector("div.iconos img.enlazar");
            console.dir(controlador);
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
        let hijos = contenedor.querySelectorAll("div.contenedorNombresValores div.nombreValor input");
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

    //borra el nodo
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
            //si el contenedor tenia algun elemento con event listeners, debemos paralos tambien, porque sino 
            //el garbage collector no podra eliminarlos por si mismo de la memoria, aunque se borren del DOM
            contenedor.parentNode.removeChild(contenedor);
        });
        iconos.appendChild(img);
        nodo.appendChild(iconos);
        contenedor.appendChild(nodo);
    }

    //como barra cierre pero sin boton de cierre
    static crearBarraTitulo (contenedor, titulo) {
        let nodo = document.createElement("div");
        nodo.className = "barraCierre";

        let h2 = document.createElement("h2");
        h2.textContent = titulo;
        nodo.appendChild(h2);

        contenedor.appendChild(nodo);
    }

    //oculta el nodo
    static crearBarraCierreOcultar (contenedor, titulo) {
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
            contenedor.style.opacity = "0";
            contenedor.style.pointerEvents = "none";
        });
        iconos.appendChild(img);
        nodo.appendChild(iconos);
        contenedor.appendChild(nodo);
    }

    /**
     * Carga una plantilla generada por php. la ruta indica el archivo php que procesa la peticion, el tipo indica que tipo de 
     * modelo obtener de la base de datos y el numero indica cuantos
     * resultados obtenemos.
     */
    static obtenerPlantilla (ruta, tipo, numero) {
        return new Promise(resolve => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            let formData = new FormData();
            formData.append("tipo", tipo);
            formData.append("numero", numero);
            req.open("POST", ruta);
            req.send(formData);
        });
    }

    static generarMalla (contenedor, ruta, tipo, numero, filas, columnas) {

        let malla = document.createElement("div");
        malla.className = "malla";

        let plantilla = GUI.obtenerPlantilla(ruta, tipo, numero);
        plantilla
        .then(
            function (html) {
                
                //1 contenedor y 1 script
                let contenido = document.createElement("div");
                contenido.innerHTML += html;

                let plantillas = contenido.querySelectorAll(".plantilla");
                let scriptPlantilla = contenido.querySelector("script");
                let script = document.createElement("script");
                script.textContent = scriptPlantilla.textContent;

                for (let i = 0; i < plantillas.length; i++) {
                    malla.appendChild(plantillas[i]);
                }
                malla.appendChild(script);

                malla.style.display = "grid";

                if (filas != null) {
                    malla.style.gridTemplateRows = "repeat(" + filas + ", 1fr)";
                }
                if (columnas != null) {
                    malla.style.gridTemplateColumns = "repeat(" + columnas + ", 1fr)";
                }

                contenedor.appendChild(malla);
            }
        );
    }

    static anadirIconoFuncional (contenedor, rutaImg, funcion) {
        let img = document.createElement("img");
        img.className = "iconoFuncional";
        img.addEventListener("click", funcion);
        img.src = rutaImg;
        contenedor.appendChild(img);
    }

    static anadirNombreSelect (contenedor, texto, nombres, acciones) {
        let p = document.createElement("p");
        p.textContent = texto;
        let select = document.createElement("select");
        let defecto = document.createElement("option");
        defecto.selected = true;
        defecto.textContent = "---";
        defecto.value = -1;
        select.appendChild(defecto);
        for (let i = 0; i < nombres.length; i++) {
            let op = document.createElement("option");
            op.textContent = nombres[i];
            op.value = i;
            select.appendChild(op);
        }
        select.addEventListener("change", () => {
            let seleccionado = select[select.selectedIndex];
            let indice = seleccionado.value;
            if (indice == -1) {
                if (VentanaCanvas.objetoSeleccionado != null) {
                    VentanaCanvas.objetoSeleccionado.funcionActualizar = function () {};
                }
            } else if (indice >= 0) {
                acciones[indice]();
            }
        });

        contenedor.appendChild(p);
        contenedor.appendChild(select);
    }

    static crearBarraPestanas (contenedor, indiceActual, nombres, callbacks) {
        let div = document.createElement("div");
        div.className = "barraPestanas";

        let ul = document.createElement("ul");
        for (let i = 0; i < nombres.length; i++) {
            let li = document.createElement("li");
            if (i == indiceActual) {
                li.id = "actual";
            }
            li.textContent = nombres[i];
            ul.appendChild(li);
            li.addEventListener("click", () => {
                if (li.id != "actual") {
                    ControlesSubirModelo[callbacks[i]](contenedor, li);
                    let actualPrevio = contenedor.querySelector("li#actual");
                    actualPrevio.id = "";
                    li.id = "actual";
                }
            });
        }

        div.appendChild(ul);
        contenedor.appendChild(div);
    }

}