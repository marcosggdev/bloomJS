class GUIGenerador  extends GUI {

    static crearInterfaz (contenedor) {
        GUIGenerador.crearBarraVentana(contenedor);
        let gui = document.getElementById("gui");
        UI.crearMenuDesplegableIzquierda(gui, "Parámetros");
    }

    static crearBarraVentana (contenedor) {
        //contenedor de barras de opciones
        let barraVentana = document.createElement("div");
        barraVentana.id = "barraVentana";

        //barra con controles para maximizar/minimizar
        let controlesVentana = document.createElement("div");
        controlesVentana.id = "controlesVentana";

        let iconos = document.createElement("div");
        iconos.id = "iconos";

        let botonMinimizar = new BotonIcono("/img/iconos/minimizar.png", minimizar, false, "minimizar");
        let botonMaximizar = new BotonIcono("/img/iconos/maximizar.png", maximizar, true, "maximizar");
    
        VentanaCanvas.botones.push(botonMinimizar);
        VentanaCanvas.botones.push(botonMaximizar);

        for (let i = 0; i < VentanaCanvas.botones.length; i++) {
            let icono = VentanaCanvas.botones[i];
            iconos.appendChild(icono.nodo);
        }

        controlesVentana.appendChild(iconos);
                //barra de herramientas
                let barraHerramientas = new BarraHerramientas([
                    new Boton("Archivo", "desplegar", [
                        ["Crear Imagen"],
                        ["crearImagenGenerador"]
                    ]),
                    new Boton("Generador", "desplegar", [
                        ["Ajustes", "Controles", "Guía de uso"],
                        ["crearMenuAjustesGenerador", "crearMenuControlesGenerador", "crearMenuGuiaUso"]
                    ]),
                    new Boton("Exportar", "desplegar", [
                        ["Imagen"],
                        ["exportarImagenGenerador"]
                    ]),
                ]);
        
        barraVentana.appendChild(barraHerramientas.nodo);
        barraVentana.appendChild(controlesVentana);

        contenedor.appendChild(barraVentana);
    }

    static crearMenuElegirPreset () {

        //nodo base
        let menu = document.createElement("div");
        menu.id = "menuElegirPreset";
        menu.className = "menu";

        //añadimos barra de cierre y estructura basica
        GUI.crearBarraCierre(menu, "Presets");

        let contenido = document.createElement("div");
        contenido.className = "contenido";
        menu.appendChild(contenido);

        //el menu presentara una grid con templates de los presets
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText);
                contenido.innerHTML += this.responseText;

                //Añadir listeners
                let presets = document.querySelectorAll(".preset");
                for (let i = 0; i < presets.length; i++) {
                    presets[i].addEventListener("click", () => {
                        //crear forma
                        let id = presets[i].id;
                        let grupoFormas = null;

                        switch (id) {
                            case "ondaEsferica":
                                grupoFormas = new OndasEsfericas();
                                break;
                            case "ondasSenoidalesDesfasadas":
                                grupoFormas = new OndasSenoidales();
                                break;
                        }

                        //cerrar menu (eliminarlo)
                        menu.parentNode.removeChild(menu);

                        //pasar datos al menu lateral de parametros

                        //menu con 2 pestañas: parametros de grupo y parametros de forma. En cada uno se muestra el parametro correspondiente
                        //con nombre y valor en un input editable personalizado con las clases de generador->tipos
                        let presentacion = document.createElement("div");
                        presentacion.className = "presentacion";

                        let img = presets[i].querySelector("img").src;
                        let nombre = presets[i].querySelector("p").textContent;
                        let descripcion = presets[i].querySelector("small").textContent;
                        let menuLateral = document.querySelector("div#gui .menu-desplegable-izquierda");

                        UI.anadirImagen(presentacion, img);
                        UI.anadirValor(presentacion, nombre);
                        UI.anadirValor(presentacion, descripcion);
                        menuLateral.appendChild(presentacion);

                        //submenu en funcion de pestaña
                        let submenu = document.createElement("div");
                        submenu.className = "submenu";

                        let ul = document.createElement("ul");
                        let li = document.createElement("li");
                        li.textContent = "Grupo";
                        li.className = "activo";
                        let li2 = document.createElement("li");
                        li2.textContent = "Forma";
                        ul.appendChild(li);
                        ul.appendChild(li2);

                        let datos = document.createElement("div");
                        datos.className = "datos";
                        //para las formas del grupo
                        for (let i = 0; i < grupoFormas.formas.length; i++) {
                            
                            let forma = grupoFormas.formas[i];

                            //cargar parametros editables de la forma, guardados en cada clase
                            for (let j = 0; j < forma.nombres.length; j++) {
                                GUI.anadirInputEditable(forma, datos, forma.nombres[j]);
                            }
                        }

                        submenu.appendChild(ul);
                        submenu.appendChild(datos);
                        menuLateral.appendChild(submenu);
                    });
                }
            }
        };
        req.open("GET", "/vistas/generador/MallaPresets.php");
        req.send();

        return menu;
    }

}