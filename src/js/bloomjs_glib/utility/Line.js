export default class Line {

    constructor (xgl, ygl) {
        this.xgl = xgl;
        this.ygl = ygl;
        this.VSHADER_SOURCE = VERTEX_SHADER_LINE;
        this.FSHADER_SOURCE = FRAGMENT_SHADER_LINE;

        //accuracy en pasos al convertir la linea a puntos
        this.accuracy = 100;

        this.createVertices(this.xgl, this.ygl);
        this.init();
    }

    createVertices (xgl, ygl) {

        //inversas de matrices
        let inverseP = Matriz4X4.obtenerInversa(RendererRefactor.matrizP);
        let inverseV = Matriz4X4.obtenerInversa(RendererRefactor.camara.matrizV);

        //linea recta que une camara con centro
        let v1 = RendererRefactor.camara.obtenerPosicionCamara();

        //obtener vector director de la linea
        let vectorClickV = new Vector4X1([xgl, ygl, -1.0, 1.0]);
        let vectorClick = inverseP.multiplicarVector(vectorClickV);
        vectorClick.datos[2] =-1.0;
        vectorClick.datos[3] = 0.0;
        vectorClick = inverseV.multiplicarVector(vectorClick);
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

        //aprovechamos para obtener malla de vertices
        this.createVerticesInterseccion(v1, v2);
    }

    createVerticesInterseccion (v1, v2) {
        let vectorDirector = Vector4X1.restarVectores(v2, v1);
        vectorDirector.normalizar();
        let origen = v1;

        let verticesInterseccion = [];

        let accuracy = this.accuracy;
        for (let i = 0; i < accuracy; i++) {
            let punto = Vector4X1.sumarVectores(origen, Vector4X1.multiplicarVectorPorEscalar(vectorDirector, i/accuracy * RendererRefactor.camara.radio));
            for (let j = 0; j < 3; j++) {
                verticesInterseccion.push(punto.datos[j]);
            }
        }

        this.verticesInterseccion = verticesInterseccion;
    }

    init () {
        if (this.visible == true) {
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
            gl.uniformMatrix4fv(this.v, false, RendererRefactor.camara.matrizV.obtenerArrayPorColumnas());
            this.p = gl.getUniformLocation(this.programa, "p");
            gl.uniformMatrix4fv(this.p, false, RendererRefactor.matrizP.obtenerArrayPorColumnas());
        }
    }

    actualizar () {

    }

    dibujar () {
        if (this.visible) {
            gl.useProgram(this.programa);

            gl.uniformMatrix4fv(this.v, false, RendererRefactor.camara.matrizV.obtenerArrayPorColumnas());
    
            //atributos
            gl.enableVertexAttribArray(this.aPosLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);
    
            gl.lineWidth(10.0);
            gl.drawArrays(gl.LINES, 0, this.vertices.length / 3);
        }
    }

    static comprobarInterseccionLineaModelo (linea, modelo) {
        //return this.comprobarInterseccionLineaHitbox (linea, modelo.hitbox);
        if (modelo.hitbox != null) {
            return this.interseccionLineaHitboxPorCercaniaAlCentro(linea, modelo.hitbox);
        } else {
            //no hitbox => no colisionable/seleccionable
            return false;
        }
        
    }

    static comprobarInterseccionLineaHitbox (linea, hitbox) {
        for (let i = 0; i < linea.verticesInterseccion.length / 3; i++) {
            let puntoLinea = new Vector4X1([linea.verticesInterseccion[3*i], 
                linea.verticesInterseccion[3*i+1], linea.verticesInterseccion[3*i+2], 1.0]);
            if (Hitbox.comprobarPuntoContenidoEnHitbox(puntoLinea, hitbox)) {
                return true;
            }
        }
        return false;
    }

    static interseccionLineaHitboxPorCercaniaAlCentro (linea, hitbox) {
        for (let i = 0; i < linea.verticesInterseccion.length / 3; i++) {
            let punto = new Vector4X1([
                linea.verticesInterseccion[3*i], linea.verticesInterseccion[3*i+1], linea.verticesInterseccion[3*i+2], 1]);
            let vectorDistancia = Vector4X1.restarVectores(punto, new Vector4X1([hitbox.posX, hitbox.posY, hitbox.posZ, 1]));
            let distancia = Vector4X1.obtenerModulo(vectorDistancia);
            if (distancia < hitbox.longitud) {
                return true;
            }
        }
        return false;
    }

}