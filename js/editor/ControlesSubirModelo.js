class ControlesSubirModelo {

    static crearControles(dialog) {

        //cerrar ventana
        let img = dialog.querySelector("img");
        img.addEventListener("click", () => {
            dialog.remove();
        });

        //input de archivos
        let inputNombre = dialog.querySelector("#nombre");
        let inputDescripcion = dialog.querySelector("#descripcion");
        let inputDae = dialog.querySelector("#dae");
        let inputTextura = dialog.querySelector("#textura");
        let inputPrevisualizacion = dialog.querySelector("#previsualizacion");

        let archivoDae = null;
        let textura = null;
        let previsualizacion = null;

        inputDae.addEventListener('input', (e) => {
            archivoDae = e.target.files[0];
        });

        inputTextura.addEventListener("input", (e) => {
            textura = e.target.files[0];
        });

        inputPrevisualizacion.addEventListener("input", (e) => {
            previsualizacion = e.target.files[0];
        });

        //boton enviar
        let boton = dialog.querySelector("input[type=button]");
        boton.addEventListener("click", () => {

            let nombre = inputNombre.value;
            let descripcion = inputDescripcion.value;

            //si se han añanido ambos
            if (archivoDae != null && textura != null && previsualizacion != null) {

                let formData = new FormData();
                formData.append("nombre", nombre);
                formData.append("descripcion", descripcion);
                formData.append("archivoDae", archivoDae);
                formData.append("textura", textura);
                formData.append("previsualizacion", previsualizacion);
    
                let req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        dialog.remove();
                    }
                }
                req.open("POST", "/bloomJS/php/backend/scripts/ProcesarArchivoSubido.php");
                req.send(formData);

            } else {

                alert("No puede dejar el archivo .dae o la textura sin incluir, vuelva a intentarlo");

            }
        });

    }

    static subirModelo () {
        
        let dialog = document.createElement("dialog");

        //cargar html del dialog
        let promise = fetch("../vistas/recursos/form/subirVideo.php");
        promise
        .then(
            function (respuesta) {
                return respuesta.text();
            }
        )
        .then(
            function (texto) {
                //usar html el dialog
                dialog.innerHTML = texto;
        
                //variables
                let input = dialog.querySelector("input#recurso");
                let recurso = null;
        
                //codificar recurso seleccionado en el input type file en base64
                input.addEventListener('input', (e) => {
                    recurso = e.target.files[0];
                });
        
                //control del boton aceptar
                let aceptar = dialog.querySelector("button#aceptar");
                aceptar.addEventListener('click', () => {

                    let titulo = dialog.querySelector("#titulo").value;

                    let formData = new FormData();
                    formData.append("recurso", recurso);
                    formData.append("titulo", titulo);
                    formData.append("id_seccion", seccion.id);
                    formData.append("tipo", "video");
                    formData.append("visibilidad", "1");

                    let req = new XMLHttpRequest();
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            $(dialog).remove();
                            location.reload();
                        }
                    }
                    req.open("POST", "/bloomJS/php/backend/scripts/procesarRecursoSubido.php");
                    req.send(formData);
                    aceptar.disabled = true;
                });
        
        
                let cancelar = dialog.querySelector("button#cancelar");
                cancelar.addEventListener('click', () => {
                    dialog.close();
                    $(dialog).remove();
                });

                $("body").append($(dialog));
                dialog.showModal();
            }
        );

    }

    static cargarModelosDefecto (contenedor) {
        let malla = contenedor.querySelector("div.malla");
        contenedor.removeChild(malla);
        GUI.generarMalla(contenedor, "/bloomJS/vistas/editor/modelo.php", "defecto", "0", null, 3);
    }

    static cargarModelosUsuario (contenedor) {
        let malla = contenedor.querySelector("div.malla");
        contenedor.removeChild(malla);
        GUI.generarMalla(contenedor, "/bloomJS/vistas/editor/modelo.php", "usuario", "0", null, 3);
    }

    static cargarModelosComunidad (contenedor) {
        let malla = contenedor.querySelector("div.malla");
        contenedor.removeChild(malla);
        GUI.generarMalla(contenedor, "/bloomJS/vistas/editor/modelo.php", "comunidad", "0", null, 3);
    }

}