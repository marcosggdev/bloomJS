window.addEventListener("load", () => {
    let editarPagina = document.getElementById("editarPaginaPersonal");
    editarPagina.addEventListener("click", () => {
        
        //contenedor entrada
        let contenido = document.querySelector(".paginaPersonal");

        let subElementos = contenido.childNodes;
        let subContenido = contenido.outerHTML;
        
        contenido.innerHTML = "";
        console.log(subContenido);        
        //escribimos y añadimos subcontenido en un textarea
        let textarea = document.createElement("textarea");
        textarea.value = subContenido;
        contenido.appendChild(textarea);

        let botonera = document.createElement("div");
        botonera.className = "botonera";

        let guardar = document.createElement("button");
        guardar.className = "boton-neon-verde";
        guardar.textContent = "Guardar";
        guardar.addEventListener("click", () => {
            //script php editarPaginaPersonal.php se encargara de editar el archivo con el nuevo contenido en el sistema de archivos
            //del servidor
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //una vez editado actualizamos la entrada recargando la pagina
                    window.location.reload();
                }
            };
            let formData = new FormData();
            let texto = sanearScripts(textarea.value);
            formData.append("texto", texto);
            req.open("POST", "/bloomJS/php/backend/scripts/editarPaginaPersonal.php");
            req.send(formData);
        });

        let cancelar = document.createElement("button");
        cancelar.className = "boton-neon-rojo";
        cancelar.textContent = "Cancelar";
        cancelar.addEventListener("click", () => {
            //recuperar contenido previo del div
            contenido.outerHTML = subContenido;
        });

        botonera.appendChild(guardar);
        botonera.appendChild(cancelar);
        textarea.after(botonera);
    });
});

function sanearScripts (texto) {
    //eliminar posibles scripts js que haya insertados en el string texto para mejorar la seguridad (cliente)
    let temp = document.createElement("div");
    temp.innerHTML += texto;
    let scripts = temp.querySelectorAll("script");
    Array.from(scripts).forEach((e) => {
        e.parentNode.removeChild(e);
        e = null;
    });
    let resultado = temp.innerHTML;
    temp = null;
    return resultado;
}