//ejecuta animacion de fondo de los elementos con clase .animDinamica-onscroll. cuando aparecen en pantalla, y la resetea
//y pausa cuando no estan en pantalla

window.addEventListener("load", () => {
    let elementos = document.querySelectorAll(".animDinamica-onscroll");

    var scrollTopPrevio = 0;

    window.addEventListener("scroll", (e) => {

        let direccion = window.scrollY - scrollTopPrevio;
        scrollTopPrevio = window.scrollY;

        for (let i = 0; i < elementos.length; i++) {

            if (direccion > 0) {

                //bajando: cuando bajamos si el top aparece en inferior de window, empezar anim
                //y si bottom desaparece por encima de window, pausar

                let topElemento = elementos[i].getBoundingClientRect().top;
                let bottomElemento = elementos[i].getBoundingClientRect().bottom;

                console.log(bottomElemento);

                if (topElemento - window.innerHeight < 0) {
                    elementos[i].classList.add("animado");
                    elementos[i].style.animationPlayState = "running";
                }
                if (bottomElemento < 0) {
                    elementos[i].classList.remove("animado");
                    elementos[i].style.animationPlayState = "pause";
                }

            } else {

                //subiendo: cuando subimos si el bottom aparece en top window, empezar anim
                //si el top desaparece por debajo del window parar animacion

                let topElemento = elementos[i].getBoundingClientRect().top;
                let bottomElemento = elementos[i].getBoundingClientRect().bottom;

                if (bottomElemento > 0) {
                    elementos[i].classList.add("animado");
                    elementos[i].style.animationPlayState = "running";
                }
                if (topElemento > window.innerHeight) {
                    elementos[i].classList.remove("animado");
                    elementos[i].style.animationPlayState = "pause";
                }

            }

        }
    });
});