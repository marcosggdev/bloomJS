/*
Ejemplo: mostrar nav fixed cuando el nav normal ya no esta presente
*/
var scrollTopPrevio = 0;
window.addEventListener('scroll', manejarRenderizado);

function manejarRenderizado (e) {
    let scrollActual = window.scrollY;
    let nav = document.querySelector("nav:not(#estatico)");
    let navBottom = nav.getBoundingClientRect().bottom;
    let margenRevelar = -40;

    let direccion = scrollTopPrevio - scrollActual;
    scrollTopPrevio = scrollActual;
    //el top del inactivo esta por encima de la altura de la ventana bajando margenRevelar
    if (navBottom < margenRevelar && direccion > 0) {
        document.querySelector("nav#estatico").classList.add("activo");
    } else {
        document.querySelector("nav#estatico").classList.remove("activo");
    }
}