class Imagen2D {

    constructor (posX = 0, posY = 0, posZ = 0, ancho = 500, alto = 500, anguloX = 0, anguloY = 0, anguloZ = 0, escalarX = 1, 
        escalarY = 1, ruta = "img/render/fondoAlfa.jpg") {
            this.posX = posX;
            this.posY = posY;
            this.posZ = posZ;
            this.ancho = ancho;
            this.alto = alto;
            this.anguloX = anguloX;
            this.anguloY = anguloY;
            this.anguloZ = anguloZ;
            this.escalarX = escalarX;
            this.escalarY = escalarY;
            this.ruta = ruta;
            this.VSHADER_SOURCE = VERTEX_IMAGEN_2D;
            this.FSHADER_SOURCE = FRAGMENT_IMAGEN_2D;
            this.crearVertices();
            this.crearUV();
            this.iniciar();
    }

    crearVertices () {
        this.vertices = [
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0,
            1, 1, 0,
            -1, 1, 0,
            -1, -1, 0
        ];
    }

    crearUV () {
        this.texCoords = [
            0, 0,
            1, 0,
            1, 1, 
            1, 1,
            0, 1,
            0, 0
        ];
    }

    iniciar () {
        //matriz Model
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        this.matrizM.rotar(this.anguloX, this.anguloY, 0);
        this.matrizM.escalar(this.factorX, this.factorY, 1);
        this.matrizM.trasladar(this.posX, this.posY, this.capa);

        //matriz modeloVista
        this.matrizMV = renderer.matrizV.multiplicar(this.matrizM);

        //shaders y programa
        this.VSHADER = crearShader(gl, gl.VERTEX_SHADER, this.VSHADER_SOURCE);
        this.FSHADER = crearShader(gl, gl.FRAGMENT_SHADER, this.FSHADER_SOURCE);
        this.programa = crearPrograma(gl, this.VSHADER, this.FSHADER);
        gl.useProgram(this.programa);    

        //attribute aPos
        this.aPosLoc = gl.getAttribLocation(this.programa, "aPos");
        this.aPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        if (this.rutaTextura != null) {
            //textura
            this.aTexLoc = gl.getAttribLocation(this.programa, "aTex");
            this.aTexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);

            var textura = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textura);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]));
            var imagen = new Image();
            imagen.crossOrigin = "anonymous";
            //imagen.src = "https://webglfundamentals.org/webgl/resources/f-texture.png";
            imagen.src = this.rutaTextura;
            imagen.addEventListener('load', function () {
                gl.bindTexture(gl.TEXTURE_2D, textura);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
                if (dimensionesPotenciaDeDos(imagen)) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
                gl.generateMipmap(gl.TEXTURE_2D);
            });

            this.textura = textura; //guardamos el objeto textura en el objeto
            this.samplerLoc = gl.getUniformLocation(this.programa, "sampler");
            gl.uniform1i(this.samplerLoc, 0);
        }

        //uniforms matrices
        this.mv = gl.getUniformLocation(this.programa, "mv");
        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
    }

    dibujar () {
        gl.useProgram(this.programa);
        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.escalarX, this.escalarY, 1);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        this.matrizMV = renderer.matrizV.multiplicar(this.matrizM);

        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //textura
        gl.enableVertexAttribArray(this.aTexLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.textura);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}