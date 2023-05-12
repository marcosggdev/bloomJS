window.addEventListener("load", () => {
    let presets = document.querySelectorAll(".preset");
    for (let i = 0; i < presets.length; i++) {
        presets[i].addEventListener("click", () => {
            let id = presets[i].id;
            switch (id) {
                case "ondaEsferica": let ondaEsferica = new OndaEsferica(); break;
                case "ondasSenoidalesDesfasadas": let ondasSenoidalesDesfasadas = new OndasSenoidalesDesfasadas(); break;
            }
            
        });
    }
});