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
    maximizarEditor();
});

function anadirListenersBotones () {
    let botones = document.querySelectorAll("div#barraMenus ul li button");
    for (let i = 0; i < botones.length; i++) {
        let menu = document.querySelector("div#barraMenus ul li button#" + botones[i].id + " div");
        botones[i].addEventListener('click', () => {
            mostrarOcultarMenu(menu);
        });
        botones[i].addEventListener('blur', () => {
            menu.style.display = "none";
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
        imagenes[i].addEventListener('click', controladorIcono);
    }
}

function controladorIcono (click) {
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
    //botones
    let botones = document.querySelectorAll("div#barraMenus ul li button");
    for (let i = 0; i < botones.length; i++) {
        let submenu = document.querySelector("div#barraMenus ul li button#" + botones[i].id + " div");
        //cada submenu tiene varias opciones en forma de li
        let opciones = submenu.querySelectorAll("ul li");
        for (let j = 0; j < opciones.length; j++) {
            switch (submenu.id) {
                case "menuArchivo": opciones[j].addEventListener('click', controladorMenuArchivo); break;
                case "menuHtml": opciones[j].addEventListener('click', controladorMenuHtml); break;
            }
        }
    }
}

function controladorMenuArchivo (evento) {
    let li = evento.target;
    switch (li.id) {
        case "crear":
            crear();
            break;
        case "abrir":
            abrir();
            break;
    }
}

function controladorMenuHtml (evento) {
    let li = evento.target;
    switch (li.id) {
        case "crearHtml": console.log("html"); break;
        case "abrirHtml": console.log("abrir html"); break;
    }
}

async function crear () {
    //dibujar lienzo en el canvas
    let fondo = await Imagen2D.crearImagen2D();
    graficos2D.insertarGrafico2D(fondo);
}

function abrir () {
    console.log("abrir");
}