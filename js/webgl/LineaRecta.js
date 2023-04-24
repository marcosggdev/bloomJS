class LineaRecta {

    constructor (coordXGL, coordYGL) {
        this.coordXGL = coordXGL;
        this.coordYGL = coordYGL;
        this.VSHADER_SOURCE = VERTEX_SHADER_LINEA_RECTA;
        this.FSHADER_SOURCE = FRAGMENT_SHADER_LINEA_RECTA;

       /* let posCamara = Renderer.camara.obtenerPosicionCamara();
        //posCamara = Vector4X1.sumarVectores(posCamara, new Vector4X1([1,0,0,0]));
        let posRelativaPuntoVP = new Vector4X1([this.coordXGL, this.coordYGL, 0.0, 1.0]);
        let posRelativaPuntoW = vInversa.multiplicarVector(pInversa.multiplicarVector(posRelativaPuntoVP));
        let posPuntoW = Vector4X1.sumarVectores(posCamara, posRelativaPuntoVP);

        let vectorDirectorW = Vector4X1.invertirVector(posCamara);
        vectorDirectorW.normalizar();

        let destino = Vector4X1.sumarVectores(posPuntoW, Vector4X1.multiplicarVectorPorEscalar(vectorDirectorW, 2000 * Renderer.camara.radio));
*/
        this.crearVertices(this.coordXGL, this.coordYGL);
        this.iniciar();
    }

    crearVertices (coordXGL, coordYGL) {

        //inversas de matrices
        let pInversa = Matriz4X4.obtenerInversa(Renderer.matrizP);
        let vInversa = Matriz4X4.obtenerInversa(Renderer.camara.matrizV);

        //camara
        let v1 = Renderer.camara.obtenerPosicionCamara();
        //origen
        let v2 = Vector4X1.invertirVector(v1);

        //recta k pasa por v1 y v2 pasa por el origen. Hay que hacerle una traslacion en funcion del click del raton
        let vectorClickVP = new Vector4X1([coordXGL, coordYGL, 0.0, 1.0]);
        //las coords de la camara estan sujetas a la traslacion y rotacion de la camara. Si invertimos esas coordenadas,
        //obtendremos las coordenadas relativas al origen donde estaba la camara, en 0,0,0, pero entonces 1 de camara = 1 de world

        //con camara en 0, coord camara 1 = coord world 1.
        //con camara en d, coord camara 1 = ?
        let factor = 1;

        //enviar a origen y cancelar rotaciones => vector en coords world space
        let vectorClick = vInversa.multiplicarVector(vectorClickVP);

        let traslacion = new Matriz4X4();
        traslacion.identidad();
        traslacion.trasladar(vectorClick.datos[0], vectorClick.datos[1], vectorClick.datos[2]);

        v1 = traslacion.multiplicarVector(v1);
        v2 = traslacion.multiplicarVector(v2);


        //puntos: -punto y punto => pasa por el centro 0
        this.vertices = [  
            v1.datos[0], v1.datos[1], v1.datos[2],
            v2.datos[0], v2.datos[1], v2.datos[2]
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