class Utilidades {

    //comprobar si una imagen tiene ancho y alto como potencias de 2
    static dimensionesPotenciaDeDos (imagen) {
        let ancho = imagen.width;
        let alto = imagen.height;
        let anchoValido = false;
        let altoValido = false;
    
        if (ancho % 2 == 0) {
            while (ancho > 1) {
                ancho /= 2;
            }
            if (ancho == 1) {
                anchoValido = true;
            }
        }
    
        if (alto % 2 == 0) {
            while (alto > 1) {
                alto /= 2;
            }
            if (alto == 1) {
                alto = true;
            }
        }
        return (anchoValido && altoValido);
    }

    //convertir grados a radianes
    static toRadians (grados) {
        //360º = 2pi rad, xº = yrad => yrad = 360x/2pi = 180x/pi
        let resultado = Math.PI * grados / 180.0;
        return resultado;
    }

    static toDegrees (radians) {
        let resultado = 180.0 * radians / Math.PI;
        return resultado;
    }

    //crear una matriz de perspectiva
    static crearMatrizPerspectiva (fovy, aspecto, n, f) {
        let q = 1.0 / Math.tan(Utilidades.toRadians(0.5 * fovy));
        let A = q / aspecto;
        let B = (n + f) / (n - f);
        let C = (2.0 * n * f) / (n - f);
        let datos = [
            [A,0,0,0],
            [0,q,0,0],
            [0,0,B,C],
            [0,0,-1.0,0]
        ];
        let matriz = new Matriz4X4(datos);
        return matriz;
    }

    static obtenerMayor (array) {
        let mayor = -1000;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > mayor) {
                mayor = array[i];
            }
        }
        return mayor;
    }

    /**
     * Carga del servidor el contenido html, css y js de una plantilla, de forma que sea funcional (el codigo) y el diseño aplique
     * de forma modularizada en plantillas guardadas en la carpeta vista del servidor. De esta forma podemos construir elementos
     * de forma modularizada utilizando js pero escribiendo los nodos con html
     */
    static cargarPlantilla (contenedor, plantilla, parametros) {

        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                //PLANTILLAS DE LA FORMA PLANTILLA {estilo <link>? plantilla <html> <input hidden scriptsrc>?
                let respuestaDOM = document.createElement("div");
                respuestaDOM.innerHTML += this.responseText;

                if (respuestaDOM.querySelector("input#script") != null) {

                    //scripts externos a la plantilla
                    let scriptRuta = respuestaDOM.querySelector("input#script").value;
                    let script = document.createElement("script");
                    script.src = scriptRuta;
                    document.body.insertAdjacentElement("beforeend", script);

                }

                let nodosScript = respuestaDOM.querySelectorAll("script");
                respuestaDOM.querySelectorAll("script").forEach((s) => {s.remove()});
                contenedor.insertAdjacentHTML("beforeend", respuestaDOM.innerHTML);

                if (nodosScript.length > 0) {
                    Array.from(nodosScript).forEach((s) => {
                        let script = document.createElement("script");
                        script.innerHTML = s.innerHTML;
                        script.className = s.className;
                        script.id = s.id;
                        document.body.appendChild(script);
                    });
                }
                
            }
            
        };
        let formData = new FormData();
        let keys = Object.keys(parametros);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let valor = parametros[key];
            formData.append(key, valor);
        }
        req.open("POST", plantilla);
        req.send(formData);
        
    }

}