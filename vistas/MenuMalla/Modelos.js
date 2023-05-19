let malla = document.querySelector(".mallaModelos");
let plantillas = malla.querySelectorAll(".plantilla.modelo");
for (let i = 0; i < plantillas.length; i++) {

    let rutaModelo = plantillas[i].querySelector("#rutaModelo").value;
    let rutaTextura = plantillas[i].querySelector("#rutaTextura").value;

    plantillas[i].addEventListener("click", () => {
        //click en una plantilla
        Modelo3D.crearModelo(0,0,0,0,0,0,1,1,1,"T",rutaModelo,null,rutaTextura,null)
        .then(
            function (modelo) {
                RendererRefactor.escena.anadirDibujable(modelo);
            }
        );
    });
}