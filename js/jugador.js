class Jugador extends Modelo3D {
    constructor () {
        super(0, 0, 0, 0, 0, 0, 10, 10, 10, "assets/modelos/dae/jugador.dae", VERTEX_SHADER_JUGADOR_GOURAUD, FRAGMENT_SHADER_JUGADOR_GOURAUD);
        this.posicion = [this.posX, this.posY, this.posZ];
        this.velocidad = 0.1;
    }

    static async generarJugador () {
            let jugador = new Jugador();
            await jugador.cargar();
            return jugador;
    }

    iniciar () {
        this.cargado = true;

        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

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

        //attribute aNorm
        this.aNormLoc = gl.getAttribLocation(this.programa, "aNorm");
        this.aNormBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aNormBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.coordsNormales), gl.STATIC_DRAW);

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

        //uniforms matrices
        this.mv = gl.getUniformLocation(this.programa, "mv");
        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, renderer.matrizP.obtenerArrayPorColumnas());
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
    }

    //OVERRIDE DE INICIAR Y DIBUJAR DE LA CLASE MODELO3D (pos jugador estatica en 0,0,0)
    dibujar () {
        if (this.cargado) {
            gl.useProgram(this.programa);
            //matriz del modelo
            this.matrizM.identidad();
            this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
            this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
            this.matrizM.trasladar(this.posX, this.posY, this.posZ);
    
            this.matrizMV = renderer.matrizV.multiplicar(this.matrizM);
    
            gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
            gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
    
            //atributos
            gl.enableVertexAttribArray(this.aPosLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
            gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);
    
            gl.enableVertexAttribArray(this.aNormLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aNormBuffer);
            gl.vertexAttribPointer(this.aNormLoc, 3, gl.FLOAT, false, 0, 0);
    
            gl.enableVertexAttribArray(this.aTexLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
            gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
    
            gl.bindTexture(gl.TEXTURE_2D, this.textura);    //para que cada objeto se dibuje con su textura
    
            gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
        }
    }

    //en funcion de la direccion, se cambia posicionXYZ de jugador (no confundir con la del modelo, que siempre sera 0,0,0)
    //en funcion de este cambio, se cambia por shader la posicion del resto de objetos
    mover (direccion) {
        switch(direccion) {
            case "w": this.posicion[2] -= this.velocidad; break;
            case "a": this.posicion[0] -= this.velocidad; break;
            case "s": this.posicion[2] += this.velocidad; break;
            case "d": this.posicion[0] += this.velocidad; break;
        }
    }
}