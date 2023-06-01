//titulo = document.querySelector("#mallaModelosTitulo").value;
plantillas = document.querySelectorAll(".mallaModelos" + " .plantilla.modelo");
links = document.querySelectorAll("link[href='/bloomJS/vistas/MenuMalla/Modelos.css']");

Array.from(plantillas).forEach((plantilla) => {

    plantilla.removeEventListener("click", plantilla.onclick);

    plantilla.addEventListener("click", () => {
        //click en una plantilla
        if (RendererRefactor.escena != null) {
            Modelo3D.crearModelo(0,0,0,0,0,0,1,1,1,"T",
            "/bloomJS/"+plantilla.querySelector("#rutaModelo").value,null,
            "/bloomJS/"+plantilla.querySelector("#rutaTextura").value,null)
            .then(
                function (modelo) {
                    RendererRefactor.escena.anadirDibujable(modelo);
                }
            )
            .then(
                function () {
                    menu = document.querySelector(".MenuGeneral:has(.mallaModelos .plantilla.modelo)")
                    if (menu != null) {
                        menu.remove();
                    }
                    Array.from(links).forEach((l) => {l.remove()});
                }
            );
        } else {
            alert("Primero crea una escena");
        }
    });
});

scripts = document.querySelectorAll("script[src='/bloomJS/vistas/MenuMalla/Modelos.js']");
Array.from(scripts).forEach((s) => {s.remove()});