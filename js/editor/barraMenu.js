var maximizado = false;
var estiloHeader = "";
var estiloNav = "";
var estiloFooter = "";
var estiloMain = "";
var estiloBarraContexto = "";
var estiloContenido = "";

window.addEventListener('load', () => {
    anadirListenersBotones();
    anadirListenerBarraMenus();
    anadirListenersIconos();
    guardarEstilos(); //seran modificados por codigo y interesa guardar los originales
    anadirListenersSubmenu();
});

function anadirListenersBotones () {
    let botones = document.querySelectorAll("div#barraMenus ul li button");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', () => {
            let menu = document.querySelector("div#barraMenus ul li button#" + botones[i].id + " ~ div");
            mostrarOcultarMenu(menu);
        });
    }
}

function mostrarOcultarMenu (menu) {
    (menu.style.display == "block") ? menu.style.display = "none" : menu.style.display = "block";
}

function anadirListenerBarraMenus () {
    let barraMenu = document.querySelector("div#barraMenus");
    barraMenu.addEventListener('focus', () => {
        console.log("focus");
    });
    barraMenu.addEventListener('blur', () => {
        console.log("focus perdido");
    });
}

function anadirListenersIconos () {
    let imagenes = document.querySelectorAll("div#barraMenus ul li img");
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('click', controladorImagen);
    }
}

function controladorImagen (click) {
    let imagen = click.target;
    switch (imagen.id) {
        case "maximizar":
            maximizarEditor();
            break;
        case "minimizar":
            minimizarEditor();
            break;
    }
}

function guardarEstilos () {
    estiloHeader = document.querySelector("header").style.display;
    estiloNav = document.querySelector("nav").style.display;
    estiloFooter = document.querySelector("footer").style.display;
    estiloMain = document.querySelector("main").style.height;
    estiloBarraContexto = document.querySelector("div#barraContexto").style.height;
    estiloContenido = document.querySelector("div#contenido").style.height;
}

function maximizarEditor () {
    document.querySelector("header").style.display = "none";
    document.querySelector("nav").style.display = "none";
    document.querySelector("footer").style.display = "none";

    document.querySelector("main").style.height = "100vh";

    document.querySelector("div#barraContexto").style.height = "10vh";
    document.querySelector("div#contenido").style.height = "90vh";
}

function minimizarEditor () {
    document.querySelector("header").style.display = estiloHeader;
    document.querySelector("nav").style.display = estiloNav;
    document.querySelector("footer").style.display = estiloFooter;

    document.querySelector("main").style.height = estiloMain;

    document.querySelector("div#barraContexto").style.height = estiloBarraContexto;
    document.querySelector("div#contenido").style.height = estiloContenido;
}

function anadirListenersSubmenu () {
    //submenus
    let submenus = document.querySelectorAll("div#barraMenus ul li div");
    for (let i = 0; i < submenus.length; i++) {
        //cada submenu tiene varias opciones en forma de li
        let opciones = submenus[i].querySelectorAll("ul li");
        let idSubmenu = submenus[i].id;
        for (let j = 0; j < opciones.length; j++) {
            //para cada opcion del submenu
            //pasamos id del submenu para ocultarlo facilmente tras hacer click
            opciones[j].addEventListener('click', () => {
                switch (opciones[j].id) {
                    case "crear":
                        crear();
                        break;
                    case "abrir":
                        abrir();
                        break;
                }
                ocultarSubmenu(idSubmenu);
            });
        }
    }
}

function crear () {
    console.log("crear");
}

function abrir () {
    console.log("abrir");
}

function ocultarSubmenu (idSubmenu) {
    //oculta el submenu de una opcion que se clickeó
    let submenu = document.querySelector("div#"+idSubmenu);
    submenu.style.display = "none";
}