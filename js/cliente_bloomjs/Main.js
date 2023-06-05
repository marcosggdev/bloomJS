window.addEventListener('load', () => {

    //crear canvas
    canvas = document.createElement("canvas");
    canvas.className = "bloomjs";
    if (!canvas) {
        console.log("Error al obtener el canvas");
        return;
    }
    let atributosContexto = { preserveDrawingBuffer: true};
    gl = canvas.getContext("webgl", atributosContexto);
    if (!gl) {
        console.log("Error al obtener el contexto del canvas");
        return;
    }
    canvas.tabIndex = 0;

    //camara del renderer
    let camara = new ArcballCamera(0, 0, 0, 30, 0, 30);

    //crear renderer
    RendererRefactor.iniciar(1920, 1080, new Color(80,80,80,255), camara, null);

    //crear contenedor DOM. Canvas tendra asociado el renderer y creamos interfaz de usuario. Pasamos el renderer y el canvas asociados
    //ancho y alto de resolucion definidos en Renderer. Despues escalado por js a width 100% height auto.

    let contenedor = document.querySelector("#bloomjs_container");
    if (contenedor != null) {
        contenedor.appendChild(canvas);
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                Escena.leerEscenaSerializada(this.responseText);
            }
        };
        req.open("GET", RUTA_BLOOM + "/Escena/" + NOMBRE_ESCENA);
        req.send();
        window.requestAnimationFrame(RendererRefactor.ciclo);
    } else {
        alert("Error: El contenedor que ha escrito para contener el canvas de BloomJS no existe...");
    }

});