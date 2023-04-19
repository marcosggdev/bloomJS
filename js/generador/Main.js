window.addEventListener('load', () => {
    Lienzo.iniciar();
    document.querySelector("#frame").appendChild(Lienzo.nodo);
    ControladorLienzo.iniciar();
    ControladorHerramientas.iniciar();
});