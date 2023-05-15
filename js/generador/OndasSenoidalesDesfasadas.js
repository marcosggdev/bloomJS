class OndasSenoidalesDesfasadas extends Forma {

    constructor () {

        super(0,0,1,1,VERTEX_SHADER_ONDAS_SENOIDALES, FRAGMENT_SHADER_ONDAS_SENOIDALES, Color.BLANCO);

        //parametros especificos de shader (uniforms) => override de iniciar y dibujar
        this.amplitud = new NumericoDOM(0.4, -100, 100, 0.1);
        this.desfaseX = new NumericoDOM(0, -20000, 20000, 0.1);
        this.desfaseY = new NumericoDOM(0, -20000, 20000, 0.1);
        this.periodo = new NumericoDOM(1, 1, 1, 0.1);
        this.anguloZ = new NumericoDOM(1, 1, 1, 0.1);
        this.rellenoInferior = new BooleanoDOM(true);
        this.colorDOM = new ColorDOM(Color.AZUL);

        this.parametros = [
            "amplitud",
            "desfaseX",
            "desfaseY",
            "periodo",
            "anguloZ",
            "rellenoInferior",
            "colorDOM"
        ];

        this.nombres = [
            "Amplitud",
            "Desfase X",
            "Desfase Y",
            "Periodo",
            "Ángulo Z",
            "Relleno Inferior",
            "Color"
        ];

        this.asociacionNombresParametros = {
            "Amplitud": "amplitud",
            "Desfase X": "desfaseX",
            "Desfase Y": "desfaseY",
            "Periodo": "periodo",
            "Ángulo Z": "anguloZ",
            "Relleno Inferior": "rellenoInferior",
            "Color": "colorDOM"
        };

        //declaramos como se va a representar estos datos en el DOM. Numerico, Booleano... etc son tipos de datos. Por ejemplo queremos que
        //los numericos aparezcan como una barra deslizable y los booleanos con un checkbox
        this.asociacionParametrosTipo = {
            "amplitud": "NumericoDOM",
            "desfaseX": "NumericoDOM",
            "desfaseY": "NumericoDOM",
            "periodo": "NumericoDOM",
            "anguloZ": "NumericoDOM",
            "rellenoInferior": "BooleanoDOM",
            "color": "ColorDOM"
        }

    }

    iniciar () {

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

        //color, amplitud, desfases
        this.uColor = gl.getUniformLocation(this.programa, "uColor");
        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        this.amplitudLoc = gl.getUniformLocation(this.programa, "amplitud");
        gl.uniform1f(this.amplitudLoc, this.amplitud);
        this.desfaseXLoc = gl.getUniformLocation(this.programa, "desfaseX");
        gl.uniform1f(this.desfaseXLoc, this.desfaseX);
        this.desfaseYLoc = gl.getUniformLocation(this.programa, "desfaseY");
        gl.uniform1f(this.desfaseYLoc, this.desfaseY);
        this.periodoLoc = gl.getUniformLocation(this.programa, "periodo");
        gl.uniform1f(this.periodoLoc, this.periodo);
        this.rellenoInferiorLoc = gl.getUniformLocation(this.programa, "rellenoInferior");
        gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior == true) ? "1.0": "0.0");
        this.uColor = gl.getUniformLocation(this.programa, "uColor");
        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        this.colorRellenoLoc = gl.getUniformLocation(this.programa, "colorRellenoLoc");
        gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.R, this.color.G, this.color.B, this.color.A);

        Renderer.anadirGraficoDibujable(this);
    }

    dibujar () {

        gl.useProgram(this.programa);

        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, 1.0);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        //actualizar matrices V y M
        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //ACTUALIZAR: color, amplitud, desfases
        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        gl.uniform1f(this.amplitudLoc, this.amplitud);
        gl.uniform1f(this.desfaseXLoc, this.desfaseX);
        gl.uniform1f(this.desfaseYLoc, this.desfaseY);
        gl.uniform1f(this.periodoLoc, this.periodo);
        gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior == true) ? "1.0": "0.0");
        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
        console.dir(this.color.toString());
    }

    actualizarParametros (cambiosOBJ) {
        //actualizar valores. Nota: las variables son objetos del DOM, por lo que hay que modificar su valor
        let parametros = Object.keys(cambiosOBJ);

        //para ello separamos en tipos
        for (let i = 0; i < parametros.length; i++) {
            
            switch (parametros[i].constructor.name) {
                case "NumericoDOM":
                    this[parametros[i]].numero = cambiosOBJ[parametros[i]]; 
                    break;
                case "BooleanoDOM":
                    this[parametros[i]].booleano = cambiosOBJ[parametros[i]]; 
                    break;
                case "ColorDOM":
                    let colorHexa = cambiosOBJ[parametros[i]];
                    let color = Color.convertirHexadecimalRGBA(colorHexa);
                    this[parametros[i]].color = color;
                    break;
            }
            
        }

    }

}