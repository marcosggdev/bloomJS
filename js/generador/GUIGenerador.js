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
                        let forma = null;

                        switch (id) {
                            case "ondaEsferica":
                                forma = new OndaEsferica(); 
                                break;
                            case "ondasSenoidalesDesfasadas":
                                forma = new OndasSenoidalesDesfasadas(); 
                                break;
                        }

                        //cerrar menu (eliminarlo)
                        menu.parentNode.removeChild(menu);

                        //pasar datos al menu lateral de parametros
                        let img = presets[i].querySelector("img").src;
                        let nombre = presets[i].querySelector("p").textContent;
                        let descripcion = presets[i].querySelector("small").textContent;
                        let menuLateral = document.querySelector("div#gui .menu-desplegable-izquierda");
                        UI.anadirImagen(menuLateral, img);
                        UI.anadirValor(menuLateral, nombre);
                        UI.anadirValor(menuLateral, descripcion);

                        //cargar parametros editables de la forma, guardados en cada clase
                        for (let i = 0; i < forma.nombres.length; i++) {
                            GUI.anadirInputEditable(forma, menuLateral, forma.nombres[i]);
                        }
                    });
                }
            }
        };
        req.open("GET", "/bloomJS/vistas/generador/MallaPresets.php");
        req.send();

        return menu;
    }

}