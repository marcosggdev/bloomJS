class ControlesSubirModelo {

    static crearControles() {
        //controles de ventana modal preañadida
        let modal = document.getElementById("subirModelo");

        //cerrar ventana
        let img = modal.querySelector("img");
        img.addEventListener("click", () => {
            modal.close();
            canvas.focus();
        });

        let boton = modal.querySelector("input[type=button]");
        boton.addEventListener("click", () => {
            //enviar el .dae y la imagen append en un formdata con inputs type file
        });

    }

}