dialog = document.getElementById("crearEscenaDialog");
dialog.showModal();

sustituir = dialog.querySelector("#sustituir").value;

if (sustituir) {
    //crear
    crear = dialog.querySelector("#crear");
    crear.addEventListener("click", () => {

        //crear escena
        titulo = dialog.querySelector("#titulo").value;
        descripcion = dialog.querySelector("#descripcion").value;
        escena = new Escena(null);
        escena.titulo = titulo;
        escena.descripcion = descripcion;
        RendererRefactor.escena = escena;

        //borrar nodos
        scripts = document.querySelectorAll("script[src='/bloomJS/vistas/editor/crearEscena/crearEscena.js']");
        Array.from(scripts).forEach((s) => {s.remove()});
        links = document.querySelectorAll("link[href='/bloomJS/vistas/editor/crearEscena/crearEscena.css']");
        Array.from(links).forEach((l) => {l.remove()});

        dialog.close();
        dialog.remove();
    });

    //cancelar
    cancelar = dialog.querySelector("#cancelar");
    cancelar.addEventListener("click", () => {

        //crear escena
        titulo = dialog.querySelector("#titulo").value;
        descripcion = dialog.querySelector("#descripcion").value;
        escena = new Escena(null);
        escena.titulo = titulo;
        escena.descripcion = descripcion;
        RendererRefactor.escena = escena;

        //borrar nodos
        scripts = document.querySelectorAll("script[src='/bloomJS/vistas/editor/crearEscena/crearEscena.js']");
        Array.from(scripts).forEach((s) => {s.remove()});
        links = document.querySelectorAll("link[href='/bloomJS/vistas/editor/crearEscena/crearEscena.css']");
        Array.from(links).forEach((l) => {l.remove()});

        dialog.close();
        dialog.remove();
    });

} else {

    //crear
    crear = dialog.querySelector("#crear");
    crear.addEventListener("click", () => {
        titulo = dialog.querySelector("#titulo").value;
        descripcion = dialog.querySelector("#descripcion").value;
        escena = new Escena(null);
        escena.titulo = titulo;
        escena.descripcion = descripcion;
        RendererRefactor.escena = escena;

        //borrar nodos
        scripts = document.querySelectorAll("script[src='/bloomJS/vistas/editor/crearEscena/crearEscena.js']");
        Array.from(scripts).forEach((s) => { s.remove() });
        links = document.querySelectorAll("link[href='/bloomJS/vistas/editor/crearEscena/crearEscena.css']");
        Array.from(links).forEach((l) => { l.remove() });

        dialog.close();
        dialog.remove();
    });

    //cancelar
    cancelar = dialog.querySelector("#cancelar");
    cancelar.addEventListener("click", () => {

        //borrar nodos
        scripts = document.querySelectorAll("script[src='/bloomJS/vistas/editor/crearEscena/crearEscena.js']");
        Array.from(scripts).forEach((s) => { s.remove() });
        links = document.querySelectorAll("link[href='/bloomJS/vistas/editor/crearEscena/crearEscena.css']");
        Array.from(links).forEach((l) => { l.remove() });

        dialog.close();
        dialog.remove();
    });

}