window.addEventListener("load", () => {
    let presets = document.querySelectorAll(".preset");
    for (let i = 0; i < presets.length; i++) {
        presets[i].addEventListener("click", () => {
            let id = presets[i].id;
            let dibujo2D = new Dibujo2D(id);
        });
    }
});