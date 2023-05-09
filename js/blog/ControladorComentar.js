//añade controles al boton de comentario
window.addEventListener("load", () => {
    //en algunos casos podemos tener varias entradas impresas => varios botones.
    let menusComentar = document.querySelectorAll(".menuComentar");
    for (let i = 0; i < menusComentar.length; i++) {
        let boton = menusComentar[i].querySelector(".botonComentarEntrada");
        let id_target = menusComentar[i].querySelector("#id_entrada");

        boton.addEventListener("click", () => {
            let textarea = menusComentar[i].querySelector("textarea");
            let texto = textarea.textContent;

            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                }
            }
            let formData = new FormData();
            formData.append("id_target", id_target);
            formData.append("texto", texto);
            req.open("POST", "/bloomJS/php/procesarComentario.php");
            req.send(formData);
        });
    }
});