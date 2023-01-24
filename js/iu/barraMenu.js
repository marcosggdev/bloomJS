var maximizado = false;
var estiloHeader = "";
var estiloNav = "";
var estiloFooter = "";
var estiloMain = "";
var estiloBarraContexto = "";
var estiloContenido = "";

window.addEventListener('load', () => {
    anadirBotonDesplegable("archivo", "Archivo", ["Crear nuevo", "Abrir", "Guardar"], [crear, abrir, guardar]);
    anadirBotonDesplegable("html", "HTML", ["Añadir elemento", "Abrir HTML"], [anadirHtml, abrirHtml]);
    anadirBotonIcono("../img/iconos/iconoMaximizar.png", 20, 20, maximizarEditor);
    anadirBotonIcono("../img/iconos/iconoMinimizar.png", 20, 20, minimizarEditor);
    maximizarEditor();
    /*anadirListenersBotones();
    anadirListenerBarraMenus();
    anadirListenersIconos();
    guardarEstilos(); //seran modificados por codigo y interesa guardar los originales
    anadirListenersSubmenu();
    maximizarEditor();
    anadirBoton("pruebaId", "botonNuevo", hola);
    anadirBotonDesplegable("id2", "nombre2", ["op1", "op2"], [hola, hola]);
    anadirBotonDesplegable("archivo2", "Archivo2", ["Crear nuevo", "Abrir"], [crear, abrir]);
    anadirBotonIcono("../img/fondo.jpg", 25, 25, hola);*/
});

function hola () {
    console.log("hola");
}

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
        case "crear": crear(); break;
        case "abrir": abrir(); break;
    }
}

function controladorMenuHtml (evento) {
    let li = evento.target;
    switch (li.id) {
        case "anadirHtml": anadirHtml(); break;
        case "abrirHtml": abrirHtml(); break;
    }
}

function anadirBoton (id, texto, callback) {
    let barraMenusUl = document.querySelector("div#barraMenus ul li");
    let boton = new Boton("id", "nombre", callback);
    barraMenusUl.appendChild(boton.nodoBoton);
}

function anadirBotonDesplegable (id, texto, opciones, callbacks) {
    let barraMenusUl = document.querySelector("div#barraMenus ul");
    let li = document.createElement("li");
    let botonDesplegable = new BotonDesplegable(id, texto, opciones, callbacks);
    li.appendChild(botonDesplegable.nodoBoton);
    barraMenusUl.appendChild(li);
}

function anadirBotonIcono (ruta, ancho, alto, callback) {
    let barraMenusUl = document.querySelector("div#barraMenus ul");
    let li = document.createElement("li");
    let botonIcono = new BotonIcono(ruta, ancho, alto, callback);
    li.appendChild(botonIcono.nodoImagen);
    barraMenusUl.appendChild(li);
}