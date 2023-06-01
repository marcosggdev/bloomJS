window.addEventListener("load", () => {

    let aside = document.querySelector("aside");
    AsideDinamico.iniciar(aside);

    let ancho = window.innerWidth - 50;

    if (ancho < 401) {
        AsideDinamico.controlesMovil();
    } else if (ancho < 1251) {
        AsideDinamico.controlesTablet();
    } else {
        AsideDinamico.controlesPC();
    }

});