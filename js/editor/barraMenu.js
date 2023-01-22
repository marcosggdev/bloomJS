window.addEventListener('load', () => {
    anadirListenersBotones();
    anadirListenerBarraMenus();
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