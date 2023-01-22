class Imagen2D {

    constructor (posX = 0, posY = 0, posZ = 0, ancho = 500, alto = 500, anguloX = 0, anguloY = 0, anguloZ = 0, escalarX = 1, 
        escalarY = 1, ruta = "../img/render/fondoAlfa.jpg") {
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
    }

    static async crearImagen2D (posX, posY, posZ, ancho, alto, anguloX, anguloY, anguloZ, escalarX, escalarY, ruta) {
        let imagen2D = new Imagen2D(posX, posY, posZ, ancho, alto, anguloX, anguloY, anguloZ, escalarX, escalarY, ruta);
        await imagen2D.iniciar();
        return imagen2D;
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

    async iniciar () {
        //matriz Model
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        /*this.matrizM.rotar(this.anguloX, this.anguloY, 0);
        this.matrizM.escalar(this.factorX, this.factorY, 1);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);*/

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

        //textura
        this.aTexLoc = gl.getAttribLocation(this.programa, "aTex");
        this.aTexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);
        await this.cargarTextura();
    }

    async cargarTextura () {
        var textura = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textura);
        //precargar en azul
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]));

        await this.cargarImagen(this.ruta)
            .then(imagen => {
                gl.bindTexture(gl.TEXTURE_2D, textura);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
                if (!dimensionesPotenciaDeDos(imagen)) {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
                gl.generateMipmap(gl.TEXTURE_2D);
            });

        this.textura = textura; //guardamos el objeto textura en el objeto
        this.samplerLoc = gl.getUniformLocation(this.programa, "sampler");
        gl.uniform1i(this.samplerLoc, 0);

        //uniforms matrices
        this.v = gl.getUniformLocation(this.programa, "v");
        gl.uniformMatrix4fv(this.v, false, renderer.matrizV.obtenerArrayPorColumnas());
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
    }

    async cargarImagen (ruta) {
        return new Promise((resolve) => {
            let imagen = new Image();
            imagen.addEventListener('load', () => {
                resolve(imagen);
            });
            imagen.src = ruta;
        });
    }

    dibujar () {
        gl.useProgram(this.programa);
        
        gl.uniformMatrix4fv(this.v, false, renderer.matrizV.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //textura
        gl.enableVertexAttribArray(this.aTexLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.textura);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}