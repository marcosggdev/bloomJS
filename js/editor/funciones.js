//funciones menu archivo
async function crear () {
    //dibujar lienzo en el canvas
    if (editor.lienzo == null) {
        let lienzo = await Elemento.crearElemento("lienzo", canvas.clientWidth, canvas.clientHeight, 0, "../img/render/fondoAlfa.jpg");
        editor.setLienzo(lienzo);
        renderer.dibujar();
        document.querySelector("#nombreArchivo").textContent = "sin_guardar.bloom";
    } else {
        alert("Lienzo ya existente");
    }
}

function abrir () {
    console.log("abrir");
}

//funciones menu html

async function crearPagina () {
    if (editor.lienzo == null) {
       /* let lienzo = await Elemento.crearElemento("lienzo", canvas.clientWidth, canvas.clientHeight, 0, "../img/render/fondoAlfa.jpg");
        editor.setLienzo(lienzo);*/
        document.querySelector("#nombreArchivo").textContent = "sin_guardar.bloom";
        let pagina = await Html.crearHtml(500, 1000, "div");
        editor.elementos.push(pagina);
        renderer.dibujar();
    } else {
        let pagina = await Html.crearHtml(100, 100, "div");
        editor.elementos.push(pagina);
        renderer.dibujar();
    }
}

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