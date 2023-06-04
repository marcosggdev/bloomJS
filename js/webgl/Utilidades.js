class Utilidades {

    static asociacionMimeExtension = {
        'audio/x-mpeg': 'mpega',
        'application/postscript': 'ps',
        'audio/x-aiff': 'aiff',
        'application/x-aim': 'aim',
        'image/x-jg': 'art',
        'video/x-ms-asf': 'asx',
        'audio/basic': 'ulw',
        'video/x-msvideo': 'avi',
        'video/x-rad-screenplay': 'avx',
        'application/x-bcpio': 'bcpio',
        'application/octet-stream': 'exe',
        'image/bmp': 'dib',
        'text/html': 'html',
        'application/x-cdf': 'cdf',
        'application/pkix-cert': 'cer',
        'application/java': 'class',
        'application/x-cpio': 'cpio',
        'application/x-csh': 'csh',
        'text/css': 'css',
        'application/msword': 'doc',
        'application/xml-dtd': 'dtd',
        'video/x-dv': 'dv',
        'application/x-dvi': 'dvi',
        'application/vnd.ms-fontobject': 'eot',
        'text/x-setext': 'etx',
        'image/gif': 'gif',
        'application/x-gtar': 'gtar',
        'application/x-gzip': 'gz',
        'application/x-hdf': 'hdf',
        'application/mac-binhex40': 'hqx',
        'text/x-component': 'htc',
        'image/ief': 'ief',
        'text/vnd.sun.j2me.app-descriptor': 'jad',
        'application/java-archive': 'jar',
        'text/x-java-source': 'java',
        'application/x-java-jnlp-file': 'jnlp',
        'image/jpeg': 'jpg',
        'application/javascript': 'js',
        'text/plain': 'txt',
        'application/json': 'json',
        'audio/midi': 'midi',
        'application/x-latex': 'latex',
        'audio/x-mpegurl': 'm3u',
        'image/x-macpaint': 'pnt',
        'text/troff': 'tr',
        'application/mathml+xml': 'mathml',
        'application/x-mif': 'mif',
        'video/quicktime': 'qt',
        'video/x-sgi-movie': 'movie',
        'audio/mpeg': 'mpa',
        'video/mp4': 'mp4',
        'video/mpeg': 'mpg',
        'video/mpeg2': 'mpv2',
        'application/x-wais-source': 'src',
        'application/x-netcdf': 'nc',
        'application/oda': 'oda',
        'application/vnd.oasis.opendocument.database': 'odb',
        'application/vnd.oasis.opendocument.chart': 'odc',
        'application/vnd.oasis.opendocument.formula': 'odf',
        'application/vnd.oasis.opendocument.graphics': 'odg',
        'application/vnd.oasis.opendocument.image': 'odi',
        'application/vnd.oasis.opendocument.text-master': 'odm',
        'application/vnd.oasis.opendocument.presentation': 'odp',
        'application/vnd.oasis.opendocument.spreadsheet': 'ods',
        'application/vnd.oasis.opendocument.text': 'odt',
        'application/vnd.oasis.opendocument.graphics-template': 'otg',
        'application/vnd.oasis.opendocument.text-web': 'oth',
        'application/vnd.oasis.opendocument.presentation-template': 'otp',
        'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
        'application/vnd.oasis.opendocument.text-template': 'ott',
        'application/ogg': 'ogx',
        'video/ogg': 'ogv',
        'audio/ogg': 'spx',
        'application/x-font-opentype': 'otf',
        'audio/flac': 'flac',
        'application/annodex': 'anx',
        'audio/annodex': 'axa',
        'video/annodex': 'axv',
        'application/xspf+xml': 'xspf',
        'image/x-portable-bitmap': 'pbm',
        'image/pict': 'pict',
        'application/pdf': 'pdf',
        'image/x-portable-graymap': 'pgm',
        'audio/x-scpls': 'pls',
        'image/png': 'png',
        'image/x-portable-anymap': 'pnm',
        'image/x-portable-pixmap': 'ppm',
        'application/vnd.ms-powerpoint': 'pps',
        'image/vnd.adobe.photoshop': 'psd',
        'image/x-quicktime': 'qtif',
        'image/x-cmu-raster': 'ras',
        'application/rdf+xml': 'rdf',
        'image/x-rgb': 'rgb',
        'application/vnd.rn-realmedia': 'rm',
        'application/rtf': 'rtf',
        'text/richtext': 'rtx',
        'application/font-sfnt': 'sfnt',
        'application/x-sh': 'sh',
        'application/x-shar': 'shar',
        'application/x-stuffit': 'sit',
        'application/x-sv4cpio': 'sv4cpio',
        'application/x-sv4crc': 'sv4crc',
        'image/svg+xml': 'svgz',
        'application/x-shockwave-flash': 'swf',
        'application/x-tar': 'tar',
        'application/x-tcl': 'tcl',
        'application/x-tex': 'tex',
        'application/x-texinfo': 'texinfo',
        'image/tiff': 'tiff',
        'text/tab-separated-values': 'tsv',
        'application/x-font-ttf': 'ttf',
        'application/x-ustar': 'ustar',
        'application/voicexml+xml': 'vxml',
        'image/x-xbitmap': 'xbm',
        'application/xhtml+xml': 'xhtml',
        'application/vnd.ms-excel': 'xls',
        'application/xml': 'xsl',
        'image/x-xpixmap': 'xpm',
        'application/xslt+xml': 'xslt',
        'application/vnd.mozilla.xul+xml': 'xul',
        'image/x-xwindowdump': 'xwd',
        'application/vnd.visio': 'vsd',
        'audio/x-wav': 'wav',
        'image/vnd.wap.wbmp': 'wbmp',
        'text/vnd.wap.wml': 'wml',
        'application/vnd.wap.wmlc': 'wmlc',
        'text/vnd.wap.wmlsc': 'wmls',
        'application/vnd.wap.wmlscriptc': 'wmlscriptc',
        'video/x-ms-wmv': 'wmv',
        'application/font-woff': 'woff',
        'application/font-woff2': 'woff2',
        'model/vrml': 'wrl',
        'application/wspolicy+xml': 'wspolicy',
        'application/x-compress': 'z',
        'application/zip': 'zip'
      };

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

                        //limpiar script del DOM
                        let scriptsBorrar = document.querySelectorAll("script[class='"+s.className+"']");
                        Array.from(scriptsBorrar).forEach((s) => {s.remove()});

                        //reañadir, con clase e id
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

    static descargarDesdeUrl (url) {
        return new Promise(resolve => {

            let subpartes = url.split("/");
            let ultimaParte = subpartes[subpartes.length - 1];
            let extension = ultimaParte.split(".")[1];
            let mime = Utilidades.convertirExtensionAMime(extension);

            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.response);
                }
            };
            req.responseType = "blob";
            req.open("GET", url);
            req.send();
        });
    }

    static async blobABase64 (blob) {
        return new Promise( resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
    }

    static convertirExtensionAMime (extension) {
        let llaves = Object.keys(Utilidades.asociacionMimeExtension);
        for (let i = 0; i < llaves.length; i++) {
            if (Utilidades.asociacionMimeExtension[llaves[i]] == extension) {
                return llaves[i];
            }
        }
    }

}