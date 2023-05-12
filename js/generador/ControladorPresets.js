window.addEventListener("load", () => {
    let presets = document.querySelectorAll(".preset");
    for (let i = 0; i < presets.length; i++) {
        presets[i].addEventListener("click", () => {
            let id = presets[i].id;
            //let modelo2D = new Modelo2D(0, 0, 0, 0, 0, 0, 20, 20, "/bloomJS/img/fondoHeader.png", VERTEX_SHADER_IMAGEN, FRAGMENT_SHADER_IMAGEN, Color.AZUL);
            let ondaEsferica = new OndaEsferica();
        });
    }
});