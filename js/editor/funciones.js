//funciones menu archivo
async function crear () {
    //dibujar lienzo en el canvas
    let fondo = await Imagen2D.crearImagen2D();
    graficos2D.insertarGrafico2D(fondo);
}

function abrir () {
    console.log("abrir");
}

//funciones menu html
function anadirHtml () {
    let menu = document.createElement("div");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.textContent = "Body";
    li.id = "body";
    li.addEventListener('click', () => {
        crearBody();
    });
    ul.appendChild(li);
    menu.appendChild(ul);
    menu.style.display = "inline-block";
    console.log("anadir html");
}

function abrirHtml () {
    console.log("abrir html");
}