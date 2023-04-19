class ControladorHerramientas {

    static iniciar () {
        let botones = document.querySelectorAll("div#menuHerramientas");
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener('click', () => {
                FuncionesIconos.anadir("<h1>Escriba un titulo...</h1><br>");
            });
        }
    }

}