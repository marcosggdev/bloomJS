//añade controles al boton de comentario
window.addEventListener("load", () => {
    //en algunos casos podemos tener varias entradas impresas => varios botones.
    let menusComentar = document.querySelectorAll(".menuComentar");
    for (let i = 0; i < menusComentar.length; i++) {
        let boton = menusComentar[i].querySelector(".botonComentarEntrada");
        let id_target = menusComentar[i].querySelector("#id_entrada").value;

        boton.addEventListener("click", () => {
            let textarea = menusComentar[i].querySelector("textarea");
            let texto = textarea.value;
            let gif = menusComentar[i].querySelector(".cajaControles").querySelector("img");

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
    }
});

//para ver el nuevo comentario añadido
function anadirComentarioNuevo (id_entrada, texto, nuevoId) {
    let entrada = document.querySelector("#entrada_" + id_entrada);
    let comentarios = entrada.querySelector("div.comentarios");
    let comentarioEjemplo = entrada.querySelector("div.comentarios div.comentario");
    let comentario = comentarioEjemplo.cloneNode(true);
    let p = comentario.querySelector("p");
    p.textContent = texto;
    comentario.id = nuevoId;
    comentarios.appendChild(comentario);
}