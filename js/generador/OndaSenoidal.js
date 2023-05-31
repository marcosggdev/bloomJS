class OndaSenoidal extends Forma {

    //parametros = [[nombre,identificador,tipo,valor_por_defecto],...]
    static parametros = [
        ["Amplitud", "amplitud", "NumericoPositivo", 0.55],
        ["Desfase X", "desfaseX", "Numerico", 0],
        ["Desfase Y", "desfaseY", "Numerico", 0],
        ["Periodo", "periodo", "Periodo", 9.89],
        ["Relleno inferior", "rellenoInferior", "Booleano", true],
        ["Color de relleno", "colorRelleno", "Color", Color.NARANJA],
        ["Color de borde", "colorBorde", "Color", Color.ROJO]
    ];

    constructor (z) {
        super(0,0,z,1,1,VERTEX_SHADER_ONDAS_SENOIDALES, FRAGMENT_SHADER_ONDAS_SENOIDALES, Color.AZUL, OndaSenoidal.parametros);
    }

    static async crear (z) {
        return new Promise(resolve => {
            let forma = new OndaSenoidal(z);
            forma.iniciar()
            .then(
                function () {
                    resolve(forma);
                }
            );
        });
    }

    iniciar () {
        return new Promise(resolve => {
            //manejamos capa a traves de la posicion Z

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
            gl.enableVertexAttribArray(this.aPosLoc);

            //uniforms matrices
            this.m = gl.getUniformLocation(this.programa, "m");
            this.v = gl.getUniformLocation(this.programa, "v");

            //color, amplitud, desfases
            this.amplitudLoc = gl.getUniformLocation(this.programa, "amplitud");
            gl.uniform1f(this.amplitudLoc, this.amplitud.valor);
            this.desfaseXLoc = gl.getUniformLocation(this.programa, "desfaseX");
            gl.uniform1f(this.desfaseXLoc, this.desfaseX.valor);
            this.desfaseYLoc = gl.getUniformLocation(this.programa, "desfaseY");
            gl.uniform1f(this.desfaseYLoc, this.desfaseY.valor);
            this.periodoLoc = gl.getUniformLocation(this.programa, "periodo");
            gl.uniform1f(this.periodoLoc, this.periodo.valor);

            this.uColor = gl.getUniformLocation(this.programa, "uColor");
            gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
            this.colorRellenoLoc = gl.getUniformLocation(this.programa, "colorRelleno");
            gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.valor.R, this.colorRelleno.valor.G, this.colorRelleno.valor.B, this.colorRelleno.valor.A);
            this.rellenoInferiorLoc = gl.getUniformLocation(this.programa, "rellenoInferior");
            gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior.valor == true) ? 1.0: 0.0);
            this.colorBordeLoc = gl.getUniformLocation(this.programa, "colorBorde");
            gl.uniform4f(this.colorBordeLoc, this.colorBorde.valor.R, this.colorBorde.valor.G, this.colorBorde.valor.B, this.colorBorde.valor.A);
            resolve();
        });
    }

    dibujar () {

        gl.useProgram(this.programa);

        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, 1.0);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        //actualizar matrices M y V
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.v, false, RendererRefactor.camara.matrizV.obtenerArrayPorColumnas());

        //ACTUALIZAR: color, amplitud, desfases
        gl.uniform1f(this.amplitudLoc, this.amplitud.valor);
        gl.uniform1f(this.desfaseXLoc, this.desfaseX.valor);
        gl.uniform1f(this.desfaseYLoc, this.desfaseY.valor);
        gl.uniform1f(this.periodoLoc, this.periodo.valor);

        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior.valor == true) ? 1.0: 0.0);
        gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.valor.R, this.colorRelleno.valor.G, this.colorRelleno.valor.B, this.colorRelleno.valor.A);
        gl.uniform4f(this.colorBordeLoc, this.colorBorde.valor.R, this.colorBorde.valor.G, this.colorBorde.valor.B, this.colorBorde.valor.A);

        //atributos
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    
    actualizarValor (tipo, identificador, valor) {

        switch (tipo) {
            case "Numerico":
                this[identificador].valor = valor; break;
            case "NumericoPositivo":
                this[identificador].valor = valor; break;
            case "Periodo":
                this[identificador].valor = valor; break;
            case "Booleano":
                this[identificador].valor = valor; break;
            case "Color":
                let colorHexa = valor + "ff";
                let r255 = parseInt(colorHexa[1] + colorHexa[2], 16);
                let g255 = parseInt(colorHexa[3] + colorHexa[4], 16);
                let b255 = parseInt(colorHexa[5] + colorHexa[6], 16);
                let a255 = parseInt("ff", 16);
                let color = new Color(r255,g255,b255,a255);
                this[identificador].valor = color;
                break;
        }

    }
    

}