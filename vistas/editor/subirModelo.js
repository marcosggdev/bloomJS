//control cerrar
dialog = document.getElementById("dialogSubirModelo");
botonCerrar = document.getElementById("cerrarSubirModelo");
botonCerrar.addEventListener("click", () => {
    dialog.close();
    dialog.remove();

    //por ahora eliminamos nodo. Podria dar problemas en el futuro. Lo ideal seria que el script estuviera dentro del nodo
    //que eliminamos, pero esta es otra manera de hacer eso debido a que parece que no sse pueden insertar nodos script dentro de
    //elementos dialog, por ejemplo
    document.querySelectorAll("script[href='/bloomJS/vistas/editor/subirModelo.js']").forEach((s) => {
        s.remove();
    });
});

//controles de input de archivos
inputNombre = dialog.querySelector("#nombre");
inputDescripcion = dialog.querySelector("#descripcion");
inputDae = dialog.querySelector("#dae");
inputTextura = dialog.querySelector("#textura");
inputPrevisualizacion = dialog.querySelector("#previsualizacion");

archivoDae = null;
textura = null;
previsualizacion = null;

inputDae.addEventListener('input', (e) => {
    archivoDae = e.target.files[0];
});

inputTextura.addEventListener("input", (e) => {
    textura = e.target.files[0];
});

inputPrevisualizacion.addEventListener("input", (e) => {
    previsualizacion = e.target.files[0];
});

//control subir
botonSubir = document.getElementById("botonSubirModelo");
botonSubir.addEventListener("click", () => {

    nombre = inputNombre.value;
    descripcion = inputDescripcion.value;

    //si se han añanido ambos
    if (archivoDae != null && textura != null && previsualizacion != null) {
        formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("archivoDae", archivoDae);
        formData.append("textura", textura);
        formData.append("previsualizacion", previsualizacion);

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                console.log(this.responseText);
                dialog.remove();
            }
        }
        req.open("POST", "/bloomJS/php/backend/scripts/ProcesarArchivoSubido.php");
        req.send(formData);
    } else {
        alert("No puede dejar el archivo .dae o la textura sin incluir, vuelva a intentarlo");
    }
});

document.getElementById("dialogSubirModelo").showModal();