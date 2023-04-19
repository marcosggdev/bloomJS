class ControladorHerramientas {

    static iniciar () {

        let menuHerramientas = new MenuHerramientas();
    }

    static maximizar () {
        console.log("maximizar");
    }

    static desplegarSubmenuAnadir () {
        let submenu = document.getElementById("anadir");
        if (submenu.classList.contains("visible")) {
            submenu.classList.remove("visible");
        } else {
            ControladorHerramientas.ocultarSubmenus();
            submenu.classList.add("visible");
        }
    }

    static ocultarSubmenus () {
        let submenus = document.querySelectorAll("div#menuHerramientas ul");
        Array.from(submenus).forEach((submenu) => {
            submenu.classList.remove("visible");
        });
    }

    static anadir(html) {
        let contenedor = new Contenedor(html);
        Lienzo.anadirContenedor(contenedor);
    }

    static anadirPlantilla () {
        console.log("plantilla");
    }

    static anadirControlesSubmenu (ul) {
        let lis = ul.querySelectorAll("li");
        for (let i = 0; i < lis.length; i++) {
            let callback = lis[i].id;
            lis[i].addEventListener('click', this[callback]());
        }
    }

}