class Grid extends Modelo2D {

    constructor () {
        //se crea un modelo2D de escala ancho y alto, en el plano XZ, con shaders de grid sin color
        super(0, 0, 0, -90, 0, 0, 1000, 1000, "", VERTEX_SHADER_GRID, FRAGMENT_SHADER_GRID);
    }

    async iniciar () {

        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

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

        Renderer.anadirGraficoDibujable(this);
    }

    dibujar () {

        gl.useProgram(this.programa);

        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, 1.0);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.v, false, Renderer.matrizV.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

}