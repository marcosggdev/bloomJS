//funciones menu archivo
async function crear () {
    //dibujar lienzo en el canvas
    if (Editor.lienzo == null) {
        let lienzo = await Elemento.crearElemento("lienzo", canvas.clientWidth, canvas.clientHeight, 0, "../img/render/fondoAlfa.jpg");
        Editor.setLienzo(lienzo);
        renderer.dibujar();
    } else {
        alert("Lienzo ya existente");
    }
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

function guardar () {
    console.log("guardar");
}