presets = document.querySelectorAll(".mallaPresets .preset");
Array.from(presets).forEach((p) => {

    p.addEventListener("click", () => {
        //el id del preset "p" coincide con el nombre de la clase js. La funcion de Preformas se encargara de la creacion del objeto
        Preformas.crearPreforma(p.id)
        .then(
            function (forma) {
                RendererRefactor.escena.anadirDibujable(forma);
                console.log(RendererRefactor.escena);
            }
        );
    });

});