presets = document.querySelectorAll(".mallaPresets .preset");
Array.from(presets).forEach((p) => {

    //limpiar scripts del DOM
    scripts = document.querySelectorAll("script[src='/bloomJS/vistas/generador/presets/malla/MallaPresets.js']");
    Array.from(scripts).forEach((s) => {
        s.remove();
    });

    p.addEventListener("click", () => {
        //el id del preset "p" coincide con el nombre de la clase js. La funcion de Preformas se encargara de la creacion del objeto
        Preformas.crearPreforma(p.id)
        .then(
            function (forma) {
                
                RendererRefactor.escena.anadirDibujable(forma);

                //crear menu preformas (malla)
                menu = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Preformas");
                VentanaCanvas.interfazCanvas.eliminarMenu(menu.nodo);

                //crear menu edicion sin boton de cierre
                let menuImagen = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Preforma");
                if (menuImagen == null) {
                    menuImagen = new MenuEdicion("Preforma", forma);
                    let botonCierre = menuImagen.nodo.querySelector(".BarraCierre img");
                    botonCierre.remove();
                    VentanaCanvas.interfazCanvas.anadirMenu(menuImagen);
                }

                let menuGlobal = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Global");
                if (menuGlobal != null) {
                    menuGlobal.seleccionarObjeto(forma);
                    menuGlobal.actualizarNodo();
                }

                //limpiar scripts del DOM
                scripts = document.querySelectorAll("script[src='/bloomJS/vistas/generador/presets/malla/MallaPresets.js']");
                Array.from(scripts).forEach((s) => {
                    s.remove();
                });
            }
        );
    });

});