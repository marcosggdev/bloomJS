class LineaRecta {

    constructor (coordXGL, coordYGL) {
        this.coordXGL = coordXGL;
        this.coordYGL = coordYGL;
        this.VSHADER_SOURCE = VERTEX_SHADER_LINEA_RECTA;
        this.FSHADER_SOURCE = FRAGMENT_SHADER_LINEA_RECTA;

        let pInversa = Matriz4X4.obtenerInversa(Renderer.matrizP);
        let vInversa = Matriz4X4.obtenerInversa(Renderer.camara.matrizV);

       /* let posCamara = Renderer.camara.obtenerPosicionCamara();
        //posCamara = Vector4X1.sumarVectores(posCamara, new Vector4X1([1,0,0,0]));
        let posRelativaPuntoVP = new Vector4X1([this.coordXGL, this.coordYGL, 0.0, 1.0]);
        let posRelativaPuntoW = vInversa.multiplicarVector(pInversa.multiplicarVector(posRelativaPuntoVP));
        let posPuntoW = Vector4X1.sumarVectores(posCamara, posRelativaPuntoVP);

        let vectorDirectorW = Vector4X1.invertirVector(posCamara);
        vectorDirectorW.normalizar();

        let destino = Vector4X1.sumarVectores(posPuntoW, Vector4X1.multiplicarVectorPorEscalar(vectorDirectorW, 2000 * Renderer.camara.radio));
*/
        this.crearVertices(this.coordXGL, this.coordYGL, 0, Renderer.camara.matrizV);
        this.iniciar();
    }

    crearVertices (dx, dy, dz, matriz) {
        
        let v1 = new Vector4X1([0,0,-Renderer.camara.radio,1]);
        let v2 = new Vector4X1([0,0,Renderer.camara.radio,1]);

        let traslacion = new Matriz4X4();
        traslacion.identidad();
        traslacion.trasladar(Renderer.camara.radio+dx,Renderer.camara.radio+dy,Renderer.camara.radio+dz);

        let m = traslacion.multiplicar(matriz);

        let v1Nuevo = m.multiplicarVector(v1);
        let v2Nuevo = m.multiplicarVector(v2);

        //puntos: -punto y punto => pasa por el centro 0
        this.vertices = [  
            v1Nuevo.datos[0], v1Nuevo.datos[1], v1Nuevo.datos[2],
            v2Nuevo.datos[0], v2Nuevo.datos[1], v2Nuevo.datos[2]
        ];
    }

    iniciar () {
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
        this.v = gl.getUniformLocation(this.programa, "v");
        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

        Renderer.anadirGraficoDibujable(this);
    }

    actualizar () {

    }

    dibujar () {
        gl.useProgram(this.programa);

        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.lineWidth(10.0);
        gl.drawArrays(gl.LINES, 0, this.vertices.length / 3);
    }

}