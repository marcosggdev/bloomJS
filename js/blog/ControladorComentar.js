//añade controles al boton de comentario
window.addEventListener("load", () => {
    //en algunos casos podemos tener varias entradas impresas => varios botones
    let contenedorComentarios = document.querySelectorAll(".contenedorComentarios");
    for (let i = 0; i < contenedorComentarios.length; i++) {
        let menuComentar = contenedorComentarios[i].querySelector(".menuComentar");
        let comentarios = contenedorComentarios[i].querySelector(".comentarios");

        let boton = menuComentar.querySelector(".botonComentarEntrada");
        let id_target = menuComentar.querySelector("#id_entrada").value;
    }
    let menusComentar = document.querySelectorAll(".menuComentar");
    let comentarios = document.querySelectorAll(".comentarios");

    let boton = menuComentar.querySelector(".botonComentarEntrada");
    let id_target = menuComentar.querySelector("#id_entrada").value;

    boton.addEventListener("click", () => {
        let textarea = menuComentar.querySelector("textarea");
        let texto = textarea.value;
        let gif = menuComentar.querySelector(".cajaControles").querySelector("img");

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                gif.style.opacity = "1";
                setTimeout(()=>{gif.style.opacity="0"}, 3000);
                let nuevoId = this.responseText;
                anadirComentarioNuevo(id_target, texto, nuevoId);
                textarea.value = "";
            }
        }
        let formData = new FormData();
        formData.append("id_target", id_target);
        formData.append("texto", texto);
        req.open("POST", "/bloomJS/php/backend/scripts/ProcesarComentario.php");
        req.send(formData);
    });
});

//para ver el nuevo comentario añadido
function anadirComentarioNuevo (id_entrada, texto, nuevoId) {
    
}