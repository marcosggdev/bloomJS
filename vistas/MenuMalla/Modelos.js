Array.from(document.querySelectorAll(".mallaModelos .plantilla.modelo")).forEach(plantilla => {

    plantilla.addEventListener("click", () => {
        //click en una plantilla
        if (RendererRefactor.escena != null) {
            Modelo3D.crearModelo(0,0,0,0,0,0,1,1,1,"T",
            plantilla.querySelector("#rutaModelo").value,null,
            plantilla.querySelector("#rutaTextura").value,null)
            .then(
                function (modelo) {
                    RendererRefactor.escena.anadirDibujable(modelo);
                }
            )
            .then(
                function () {
                    document.querySelector(".MenuGeneral:has(.mallaModelos .plantilla.modelo)").remove();
                }
            );
        } else {
            alert("Primero crea una escena");
        }
    });

});