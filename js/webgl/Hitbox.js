class Hitbox {

    static color = [1.0, 1.0, 0.0];

    constructor (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, factoresHitbox) {
        //se crea en misma posicion, angulo y escala que el propio modelo (la escala se calculara mas adelante)
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.anguloX = anguloX;
        this.anguloY = anguloY;
        this.anguloZ = anguloZ;
        this.factorX = factorX;
        this.factorY = factorY;
        this.factorZ = factorZ;
        this.factoresHitbox = factoresHitbox;
        this.VSHADER_SOURCE = VERTEX_SHADER_HITBOX;
        this.FSHADER_SOURCE = FRAGMENT_SHADER_HITBOX;
        this.crearVertices(factoresHitbox[0], factoresHitbox[1], factoresHitbox[2], 
            factoresHitbox[3], factoresHitbox[4], factoresHitbox[5]);
        this.crearTriangulosInterseccion();
        this.iniciar();
    }

    crearTriangulosInterseccion () {

        let triangulosInterseccion = [];

        //malla de triangulos para tratar intersecciones. Usaremos los triangulos de la hitbox en lugar de los del modelo
        for (let i = 0; i < this.vertices.length; i+=9) {

            let v1 = new Vector4X1([this.vertices[i], this.vertices[i+1], this.vertices[i+2], 1.0]);
            let v2 = new Vector4X1([this.vertices[i+3], this.vertices[i+4], this.vertices[i+5], 1.0]);
            let v3 = new Vector4X1([this.vertices[i+6], this.vertices[i+7], this.vertices[i+8], 1.0]);

            let triangulo = new Triangulo(v1, v2, v3);
            triangulosInterseccion.push(triangulo);
        }

        this.triangulosInterseccion = triangulosInterseccion;
    }

    calcularCentro (xMinima, xMaxima, yMinima, yMaxima, zMinima, zMaxima) {
        this.centro = new Vector4X1([(xMaxima - xMinima)/2, (yMaxima - yMinima)/2, (zMaxima - zMinima)/2, 1.0]);
        this.longitudInterseccion = Vector4X1.obtenerModulo(this.centro);
    }

    crearVertices (xMinima, xMaxima, yMinima, yMaxima, zMinima, zMaxima) {

        let vertices = this.crearVerticesCubo();
        for (let i = 0; i < vertices.length; i+=3) {
            (vertices[i] == 1) ? vertices[i] = xMaxima : vertices[i] = xMinima;
            (vertices[i+1] == 1) ? vertices[i+1] = yMaxima : vertices[i+1] = yMinima;
            (vertices[i+2] == 1) ? vertices[i+2] = zMaxima : vertices[i+2] = zMinima;
        }
        this.vertices = vertices;

        this.calcularCentro(xMinima, xMaxima, yMinima, yMaxima, zMinima, zMaxima);

    }

    crearVerticesCubo () {
        let vertices = [
            //cara frontal z = 1
            -1,-1,1,
            1,-1,1,
            1,1,1,
            -1,-1,1,
            1,1,1,
            -1,1,1,

            //cara trasera z = -1
            1,-1,-1,
            -1,-1,-1,
            -1,1,-1,
            1,-1,-1,
            -1,1,-1,
            1,1,-1,

            //cara derecha x=1
            1,-1,1,
            1,-1,-1,
            1,1,-1,
            1,-1,1,
            1,1,-1,
            1,1,1,

            //cara izquierda x=-1
            -1,-1,-1,
            -1,-1,1,
            -1,1,1,
            -1,-1,-1,
            -1,1,1,
            -1,1,-1,

            //cara arriba y=1
            -1,1,1,
            1,1,1,
            1,1,-1,
            -1,1,1,
            1,1,-1,
            -1,1,-1,

            //cara abajo y=-1
            -1,-1,-1,
            1,-1,-1,
            1,-1,1,
            -1,-1,-1,
            1,-1,1,
            -1,-1,1
        ];

        return vertices;
    }

    iniciar () {
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

        //uniforms matrices
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        this.v = gl.getUniformLocation(this.programa, "v");
        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

        //uniforms ancho alto y profundidad
        this.anchoLoc = gl.getUniformLocation(this.programa, "ancho");
        gl.uniform1f(this.anchoLoc, this.ancho);
        this.altoLoc = gl.getUniformLocation(this.programa, "alto");
        gl.uniform1f(this.altoLoc, this.alto);
        this.profundidadLoc = gl.getUniformLocation(this.programa, "profundidad");
        gl.uniform1f(this.profundidadLoc, this.profundidad);

        //xMinima, xMaxima, etc
        this.xMinimaLoc = gl.getUniformLocation(this.programa, "xMinima");
        gl.uniform1f(this.xMinimaLoc, this.factoresHitbox[0]);
        this.xMaximaLoc = gl.getUniformLocation(this.programa, "xMaxima");
        gl.uniform1f(this.xMaximaLoc, this.factoresHitbox[1]);
        this.yMinimaLoc = gl.getUniformLocation(this.programa, "yMinima");
        gl.uniform1f(this.yMinimaLoc, this.factoresHitbox[2]);
        this.yMaximaLoc = gl.getUniformLocation(this.programa, "yMaxima");
        gl.uniform1f(this.yMaximaLoc, this.factoresHitbox[3]);
        this.zMinimaLoc = gl.getUniformLocation(this.programa, "zMinima");
        gl.uniform1f(this.zMinimaLoc, this.factoresHitbox[4]);
        this.zMaximaLoc = gl.getUniformLocation(this.programa, "zMaxima");
        gl.uniform1f(this.zMaximaLoc, this.factoresHitbox[5]);

        //color
        this.uColorLoc = gl.getUniformLocation(this.programa, "uColor");
        gl.uniform3f(this.uColorLoc, Hitbox.color[0], Hitbox.color[1], Hitbox.color[2]);

        Renderer.anadirGraficoDibujable(this);
    }

    actualizar () {

    }

    dibujar () {

        if (Renderer.dibujarHitbox) {
            gl.useProgram(this.programa);

            //matriz del modelo
            this.matrizM.identidad();
            this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
            this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
            this.matrizM.trasladar(this.posX, this.posY, this.posZ);
    
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

    static comprobarPuntoContenidoEnHitbox (punto, hitbox) {
        if (
            (punto.datos[0] > hitbox.factoresHitbox[0] && punto.datos[0]  < hitbox.factoresHitbox[1])
            && (punto.datos[1] > hitbox.factoresHitbox[2] && punto.datos[1]  < hitbox.factoresHitbox[3])
            && (punto.datos[2] > hitbox.factoresHitbox[4] && punto.datos[2]  < hitbox.factoresHitbox[5])
            ) 
        {
            return true;
        } else {
            return false;
        }
    }


}