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

        //linea recta que une camara con centro
        let v1 = Renderer.camara.obtenerPosicionCamara();

        //obtener vector director de la linea
        let vectorClickV = new Vector4X1([coordXGL, coordYGL, -1.0, 1.0]);
        let vectorClick = pInversa.multiplicarVector(vectorClickV);
        vectorClick.datos[2] =-1.0;
        vectorClick.datos[3] = 0.0;
        vectorClick = vInversa.multiplicarVector(vectorClick);
        vectorClick.normalizar();

        //obtenemos punto 2 usando el vector director y el punto 1
        let longitud = 1000;
        let v2 = Vector4X1.sumarVectores(v1, Vector4X1.multiplicarVectorPorEscalar(vectorClick, longitud));

        //en funcion del click del raton desplazaremos esta linea recta en el eje adecuado
        let matriz = new Matriz4X4();
        matriz.identidad();
        matriz.trasladar(vectorClick.datos[0], vectorClick.datos[1], vectorClick.datos[2]);

        v1 = matriz.multiplicarVector(v1);
        v2 = matriz.multiplicarVector(v2);

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