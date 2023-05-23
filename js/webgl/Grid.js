class Grid extends Modelo2D {

    constructor () {
        //se crea un modelo2D de escala ancho y alto, en el plano XZ, con shaders de grid sin color
        super(0, 0, 0, -90, 0, 0, 100, 100, null, VERTEX_SHADER_GRID, FRAGMENT_SHADER_GRID, null);
        this.seleccionable = false;
    }

    async iniciar () {

        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
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
        gl.enableVertexAttribArray(this.aPosLoc);

        //uniforms matrices
        this.m = gl.getUniformLocation(this.programa, "m");
        this.v = gl.getUniformLocation(this.programa, "v");
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, RendererRefactor.matrizP.obtenerArrayPorColumnas());

        //inversas
        this.mInversa = gl.getUniformLocation(this.programa, "mInversa");
        this.vInversa = gl.getUniformLocation(this.programa, "vInversa");
        this.pInversa = gl.getUniformLocation(this.programa, "pInversa");
        gl.uniformMatrix4fv(this.pInversa, false, Matriz4X4.obtenerInversa(RendererRefactor.matrizP).obtenerArrayPorColumnas());
    }

    dibujar () {

        if (RendererRefactor.dibujarGrid) {
            gl.useProgram(this.programa);

            //matriz del modelo
            this.matrizM.identidad();
            this.matrizM.escalar(this.factorX, this.factorY, 1.0);
            this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
            this.matrizM.trasladar(this.posX, this.posY, this.posZ);
    
            gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
            gl.uniformMatrix4fv(this.v, false, RendererRefactor.camara.matrizV.obtenerArrayPorColumnas());
            gl.uniformMatrix4fv(this.mInversa, false, Matriz4X4.obtenerInversa(this.matrizM).obtenerArrayPorColumnas());
            gl.uniformMatrix4fv(this.vInversa, false, Matriz4X4.obtenerInversa(RendererRefactor.camara.matrizV).obtenerArrayPorColumnas());
    
            //atributos
            //gl.enableVertexAttribArray(this.aPosLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
            //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);
    
            //deshabilitamos cull face para que se vea el plano por ambas caras
            gl.disable(gl.CULL_FACE);
    
            //dibujado
            gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    
            //anulamos los cambios despues del dibujo para no afectar al resto
            gl.enable(gl.CULL_FACE);
        }

    }

    serializar () {
        let jsonOBJ = {
            "clase": "Grid",
            "parametros": {}
        };
        return jsonOBJ;
    }

}