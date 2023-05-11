//añade controles al boton de comentario
window.addEventListener("load", () => {
    //en algunos casos podemos tener varias entradas impresas => varios botones
    let contenedorComentarios = document.querySelectorAll(".contenedorComentarios");
    for (let i = 0; i < contenedorComentarios.length; i++) {
        let menuComentar = contenedorComentarios[i].querySelector(".menuComentar");
        let comentarios = contenedorComentarios[i].querySelector(".comentarios");

        let boton = menuComentar.querySelector(".botonComentarEntrada");
        let id_target = menuComentar.querySelector("#id_entrada").value;
        let textarea = menuComentar.querySelector("textarea");
        textarea.value = "";

        let max = 200;
        textarea.maxLength = max;

        textarea.addEventListener("input", (e) => {
            //crear / leer parrafo
            let p = menuComentar.querySelector("#numeroInputs");
            if (p == null) {
                p = document.createElement("p");
                p.id = "numeroInputs";
                textarea.after(p);
            }
            //actualizar
            p.textContent = textarea.value.length + " / " + "" + max;
            if (textarea.value.length == max) {
                p.style.color = "red";
            } else {
                p.style.color = "black";
            }
        });

        boton.addEventListener("click", () => {
            let texto = textarea.value;
            let gif = menuComentar.querySelector(".cajaControles").querySelector("img");

            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    gif.style.opacity = "1";
                    setTimeout(()=>{
                        gif.style.opacity="0";
                        let afterTextarea = menuComentar.querySelector("#numeroInputs");
                        if (afterTextarea != null) {
                            afterTextarea.parentNode.removeChild(afterTextarea);
                        }
                        textarea.value = "";
                    }, 3000);
                    let nuevoId = this.responseText;
                    anadirComentarioNuevo(comentarios, texto, id_target, nuevoId);
                }
            }
            let formData = new FormData();
            formData.append("id_target", id_target);
            formData.append("texto", texto);
            req.open("POST", "/bloomJS/php/backend/scripts/ProcesarComentario.php");
            req.send(formData);
        });
    }
});

//para ver el nuevo comentario añadido
function anadirComentarioNuevo (contenedor, texto, id_target, nuevoId) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            contenedor.innerHTML += this.responseText;
        }
    };
    let formData = new FormData();
    let comentario = {
        texto: ""+texto,
        id_target: ""+id_target,
        nuevoId: ""+nuevoId
    };
    formData.append("comentario", JSON.stringify(comentario));
    req.open("POST", "/bloomJS/vistas/blog/Comentario.php");
    req.send(formData);
}