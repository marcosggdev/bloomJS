class PuntoLuz extends Modelo3D {

    static colorR = 1.0;
    static colorG = 1.0;
    static colorB = 0.0;
    static colorA = 1.0;

    constructor (posX, posY, posZ) {
        super(posX, posY, posZ, 0, 0, 0, 0.5, 0.5, 0.5, "/assets/preformas/esfera.dae",
            VERTEX_SHADER_SIMPLE_COLOR, FRAGMENT_SHADER_SIMPLE_COLOR);
    }

    async cargar () {
        const respuestaArchivoXML = await fetch(this.rutaArchivoDae)
            .then( response => {
                return response.text();
            })
            .then( texto => {
                this.procesarDae(new DOMParser().parseFromString(texto, "application/xml"));
            })
            .then( () => {
                this.iniciar();
            });
    }

    actualizarMatrizM () {
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);
    }

    iniciar () {
        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.actualizarMatrizM();

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

        //uniforms matrices
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        this.v = gl.getUniformLocation(this.programa, "v");
        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

        //color
        this.uColor = gl.getUniformLocation(this.programa, "uColor");
        gl.uniform4f(this.uColor, PuntoLuz.colorR, PuntoLuz.colorG, PuntoLuz.colorB, PuntoLuz.colorA);

        //crear HITBOX
        let factoresHitbox = this.calcularFactoresHitbox(this.vertices);
        this.hitbox = new Hitbox(this.posX, this.posY, this.posZ,
            this.anguloX, this.anguloY, this.anguloZ, 
            this.factorX, this.factorY, this.factorZ, factoresHitbox);

        Renderer.anadirGraficoDibujable(this);
    }

    dibujar () {
        gl.useProgram(this.programa);

        //matriz del modelo
        this.actualizarMatrizM();

        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

}