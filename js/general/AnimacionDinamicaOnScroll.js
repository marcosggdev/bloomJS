//ejecuta animacion de fondo de los elementos con clase .animDinamica-onscroll. cuando aparecen en pantalla, y la resetea
//y pausa cuando no estan en pantalla

var scrollTopPrevio = 0;

window.addEventListener("load", () => {
    let elementos = document.querySelectorAll(".animDinamica-onscroll");

    window.addEventListener("scroll", () => {

        let scrollTop = window.scrollY;
        let direccion = scrollTop - scrollTopPrevio;
        scrollTopPrevio = scrollTop;

        for (let i = 0; i < elementos.length; i++) {

            if (direccion > 0) {
                //bajando: cuando bajamos si el top aparece en inferior de window, empezar anim
                let topElemento = elementos[i].getBoundingClientRect().top;
                if (topElemento - window.innerHeight < 0) {
                    elementos[i].classList.add("animado");
                    elementos[i].addEventListener("animationend", () => {
                        elementos[i].classList.remove("animado");
                    });
                }
            } else {
                //subiendo: cuando subimos si el bottom aparece en top window, empezar anim
                let bottomElemento = elementos[i].getBoundingClientRect().bottom;
                if (bottomElemento > 0) {
                    elementos[i].classList.add("animado");
                    elementos[i].addEventListener("animationend", () => {
                        elementos[i].classList.remove("animado");
                    });
                }
            }

        }
    });
});