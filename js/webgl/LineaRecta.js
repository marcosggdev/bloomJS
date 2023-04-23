class LineaRecta {

    constructor (coordXGL, coordYGL) {
        this.coordXGL = coordXGL;
        this.coordYGL = coordYGL;
        this.VSHADER_SOURCE = VERTEX_SHADER_LINEA_RECTA;
        this.FSHADER_SOURCE = FRAGMENT_SHADER_LINEA_RECTA;

        let posCamara = Renderer.camara.obtenerPosicionCamara();
        posCamara.normalizar();

        //en coords p v
        let posPunto = new Vector4X1([this.coordXGL, this.coordYGL, 0.0, 1.0]);

        let pInversa = Matriz4X4.obtenerInversa(Renderer.matrizP);
        let vInversa = Matriz4X4.obtenerInversa(Renderer.camara.matrizV);

        //en coords world space
        let posPuntoWorldSpace = vInversa.multiplicarVector(pInversa.multiplicarVector(posPunto));

        this.crearVertices(posPuntoWorldSpace);
        //malla de puntos que se utilizaran para comprobar colisiones
        this.crearVerticesMalla(posPuntoWorldSpace);
        this.iniciar();
    }

    crearVerticesMalla (posCamara) {
        let verticesMalla = [];
        let longitud = 2 * Renderer.camara.radio;
        for (let i = 0; i < 100; i++) {
            let vectorPuntoRecta = Vector4X1.multiplicarVectorPorEscalar(posCamara, i / 100 * longitud);
            verticesMalla.push(vectorPuntoRecta.datos[0]);
            verticesMalla.push(vectorPuntoRecta.datos[1]);
            verticesMalla.push(vectorPuntoRecta.datos[2]);
        }
        this.verticesMalla = verticesMalla;
    }

    crearVertices (posPunto) {
        //puntos: -punto y punto => pasa por el centro 0
        this.vertices = [  
            -posPunto.datos[0], -posPunto.datos[1], -posPunto.datos[2],
            posPunto.datos[0], posPunto.datos[1], posPunto.datos[2]
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
        console.log("dibujando linea");
    }

}