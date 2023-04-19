var pasos = [
    "Haga click en cualquier punto del lienzo que desee utilizar como origen",
    "Seleccione la forma que desee"
];

var tooltips = [
    "Haga click izquierdo en cualquier lugar del lienzo de color blanco, hasta que vea una marca en el lugar donde se ha hecho el click",
    "Seleccione con click izquierdo una de las imágenes que aparecen en el menú que se ve en pantalla"
];

var pasoActual = 0;
var origenX = null;
var origenY = null;

window.addEventListener('load', () => {

    //click en siguiente
    document.getElementById("siguiente").addEventListener('click', () => {
        if (comprobarPasoCompletado(pasoActual)) {
            pasoActual++;
            mostrarMensaje(pasoActual);
            moverBoton();
        } else {
            alert(tooltips[pasoActual]);
        }
    });


    //colocar origen
    document.getElementById("lienzo").addEventListener('click', (e) => {
        let lienzo = document.getElementById("lienzo");
        let xLienzo = lienzo.getBoundingClientRect().left;
        let yLienzo = lienzo.getBoundingClientRect().top;

        origenX = e.clientX - xLienzo;
        origenY = e.clientY - yLienzo;

        let origen = document.getElementById("origen");
        if (origen != null) {
            //actualizarlo
            origen.style.left = origenX + "px";
            origen.style.top = origenY + "px";
        } else {
            //crearlo
            let origen = document.createElement("div");
            origen.id = "origen";
            origen.style.left = origenX + "px";
            origen.style.top = origenY + "px";
            let lienzo = document.getElementById("lienzo");
            lienzo.appendChild(origen);
        }
    });
});

function mostrarMensaje (indice) {
    let li = document.createElement("li");
    li.textContent = pasos[indice];

    switch (indice) {
        case 0:
            document.getElementById("listaPasos").appendChild(li);
            break;
        case 1:
            document.getElementById("listaPasos").appendChild(li);
            let div = document.createElement("div");
            div.id = "formas";
            let forma1 = document.createElement("img");
            forma1.src = "/bloomJS/img/iconos/forma1.png";
            forma1.alt = "Forma";
            div.appendChild(forma1);
            document.getElementById("listaPasos").appendChild(div);
            break;
    }
}

function moverBoton () {
    let boton = document.getElementById("siguiente");
    let ul = document.getElementById("listaPasos");
    boton.remove();
    ul.appendChild(boton);
}

function comprobarPasoCompletado (indice) {
    let comprobacion = false;
    switch (indice) {
        case 0:
            if (origenX != null && origenY != null) {
                comprobacion = true;
            }
            break;
        case 1: 
 
            break;
    }
    return comprobacion;
}