class Modelo2D {

    constructor (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, rutaTextura,
         VSHADER_SOURCE = VERTEX_SHADER_IMAGEN, FSHADER_SOURCE = FRAGMENT_SHADER_IMAGEN, color = null) {
        //constructor con parametros sincronos. Se llama desde generarModelo
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.anguloX = anguloX;
        this.anguloY = anguloY;
        this.anguloZ = anguloZ;
        this.factorX = factorX;
        this.factorY = factorY;
        this.rutaTextura = rutaTextura;
        this.VSHADER_SOURCE = VSHADER_SOURCE;
        this.FSHADER_SOURCE = FSHADER_SOURCE;
        this.color = color;
        this.crearVertices();
        this.crearCoordsUV();
        this.iniciar();
    }

    crearVertices () {
        
        //vertices de un cuadrado separado en 2 triangulos
        this.vertices = [
            -1,-1,0,
            1,-1,0,
            1,1,0,
            -1,-1,0,
            1,1,0,
            -1,1,0
        ];

    }

    crearCoordsUV () {

        //coordenadas UV para una textura que se situe invertida verticalmente en el cuadrado definido por this.vertices
        //Nota: de la inversión vertical posterior ya se encarga WebGL. Ver clase Renderer metodo habilitarPropiedades
        //Nota: las coords UV van de 0 a 1 desde la esquina inferior izquierda

        this.coordsUV = [
            0,0,
            1,0,
            1,1,
            0,0,
            1,1,
            0,1    
        ];

    }

    async iniciar () {

        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        //matriz modeloVista
        this.matrizMV = Renderer.matrizV.multiplicar(this.matrizM);

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
        gl.enableVertexAttribArray(this.aPosLoc);

        //textura
        this.aTexLoc = gl.getAttribLocation(this.programa, "aTex");
        this.aTexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.coordsUV), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.aTexLoc);

        var textura = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textura);
        if (this.color != null) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([this.color.R, this.color.G, 
                this.color.B, this.color.A]));
        }

        //si se pasa una textura, se carga. En caso contrario se ignora la textura
        if (this.rutaTextura !== "") {
            await this.cargarTextura(this.rutaTextura)
            .then((imagen) => {
    
                gl.bindTexture(gl.TEXTURE_2D, textura);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
                if (Utilidades.dimensionesPotenciaDeDos(imagen)) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.generateMipmap(gl.TEXTURE_2D);
                }
                
    
            });
        }

        this.textura = textura; //guardamos el objeto textura en el objeto
        this.samplerLoc = gl.getUniformLocation(this.programa, "sampler");
        gl.uniform1i(this.samplerLoc, 0);

        //uniforms matrices
        this.mv = gl.getUniformLocation(this.programa, "mv");
        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        Renderer.anadirGraficoDibujable(this);
    }

    cargarTextura (url) {
        return new Promise(resolve => {
            let image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.src = url;
        });
    }

    actualizar () {
        //this.anguloX += 0.0001;
        //this.anguloY += 1;
        //this.anguloZ += 0.0001;
    }

    dibujar () {

        gl.useProgram(this.programa);

        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, 1.0);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        this.matrizMV = Renderer.matrizV.multiplicar(this.matrizM);

        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.textura);    //para que cada objeto se dibuje con su textura

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    serializar () {
        //posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial
        return "posX:"+this.posX+";posY:"+this.posY+";posZ:"+this.posZ+";anguloX:"+this.anguloX+";anguloY:"
        +this.anguloY+";anguloZ:"+this.anguloZ+";factorX:"+this.factorX+";factorY:"+this.factorY+";factorZ:"+this.factorZ+";modo:"+this.modo+
        ";rutaArchivoDae:"+this.rutaArchivoDae+";color:"+this.color+";rutaTextura:"+this.rutaTextura+";rutaMaterial:"+this.rutaMaterial;
    }
}