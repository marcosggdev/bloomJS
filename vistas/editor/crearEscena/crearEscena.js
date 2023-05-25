dialog = document.getElementById("crearEscenaDialog");
dialog.showModal();

sustituir = adicional.querySelector("#sustituir").value;


if (sustituir) {

    //crear
    crear = dialog.querySelector("#crear");
    crear.addEventListener("click", () => {

        titulo = dialog.querySelector("#titulo");
        descripcion = dialog.querySelector("#descripcion");
        escena = new Escena(null);
        escena.titulo = titulo;
        escena.descripcion = descripcion;
        RendererRefactor.escena = escena;
        dialog.close();
        dialog.remove();
    });

    //cancelar
    cancelar = dialog.querySelector("#cancelar");
    cancelar.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    });

} else {

    //crear
    crear = dialog.querySelector("#crear");
    crear.addEventListener("click", () => {
        titulo = dialog.querySelector("#titulo");
        descripcion = dialog.querySelector("#descripcion");
        escena = new Escena(null);
        escena.titulo = titulo;
        escena.descripcion = descripcion;
        RendererRefactor.escena = escena;
        dialog.close();
        dialog.remove();
    });

    //cancelar
    cancelar = dialog.querySelector("#cancelar");
    cancelar.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    });

}