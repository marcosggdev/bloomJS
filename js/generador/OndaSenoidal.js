class OndaSenoidal extends Forma {

    constructor (z) {

        super(0,0,z,1,1,VERTEX_SHADER_ONDA_SENOIDAL, FRAGMENT_SHADER_ONDA_SENOIDAL, Color.AZUL);

        this.capa = z;
        this.amplitud = 0.55;
        this.desfaseX = 0;
        this.desfaseY = 0;
        this.periodo = 9.89;
        this.rellenoInferior = true;
        this.colorRelleno = Color.NARANJA;
        this.colorBorde = Color.ROJO;

        this.seleccionable = true;

        this.colorRellenoInicial = null;
        this.aumentandoBrillo = true;
        this.aumentos = 0;
        this.aumentosMax = 10;

        this.supervalores = [
            new Numerico("capa", "Capa", this.capa, true, -8, 8, 1),
            new Numerico("amplitud", "Amplitud", this.amplitud, true, 0, 10, 0.1),
            new Numerico("desfaseX", "Desfase X", this.desfaseX, true, -10, 10, 0.1),
            new Numerico("desfaseY", "Desfase Y", this.desfaseY, true, -10, 10, 0.1),
            new Numerico("periodo", "Periodo", this.periodo, true, 0, 30, 0.1),
            new Booleano("rellenoInferior", "Relleno inferior", this.rellenoInferior, true),
            new ColorS("colorRelleno", "Color de relleno", this.colorRelleno, true),
            new ColorS("colorBorde", "Color de borde", this.colorBorde, true),
        ];

    }

    static seleccion () {
        let colorRelleno = this.supervalores.filter((supervalor) => {return (supervalor.variable == "colorRelleno")})[0];
        let color = colorRelleno.valor;

        if (this.colorRellenoInicial == null) {
            this.colorRellenoInicial = color;
            this.aumentos = 0;
            this.aumentandoBrillo = true;   
        }

        if (this.aumentos >= 0) {
            if (this.aumentandoBrillo) {
                color.R += 0.1;
                color.G += 0.1;
                color.B += 0.1;
                this.aumentos++;
                if (this.aumentos >= this.aumentosMax) {
                    this.aumentandoBrillo = false;
                }
            } else {
                color.R -= 0.1;
                color.G -= 0.1;
                color.B -= 0.1;
                this.aumentos--;
            }
        } else {
            let colorRelleno = this.supervalores.filter((supervalor) => {return (supervalor.variable == "colorRelleno")})[0];
            colorRelleno.setValor(this.colorRellenoInicial);
            this.funcionActualizar = null;
        }

        colorRelleno.setValor(color);
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
            this.matrizM.trasladar(this.posX, this.posY, this.capa);

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
            gl.uniform1f(this.amplitudLoc, this.amplitud);
            this.desfaseXLoc = gl.getUniformLocation(this.programa, "desfaseX");
            gl.uniform1f(this.desfaseXLoc, this.desfaseX);
            this.desfaseYLoc = gl.getUniformLocation(this.programa, "desfaseY");
            gl.uniform1f(this.desfaseYLoc, this.desfaseY);
            this.periodoLoc = gl.getUniformLocation(this.programa, "periodo");
            gl.uniform1f(this.periodoLoc, this.periodo);

            this.uColor = gl.getUniformLocation(this.programa, "uColor");
            gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
            this.colorRellenoLoc = gl.getUniformLocation(this.programa, "colorRelleno");
            gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.R, this.colorRelleno.G, this.colorRelleno.B, this.colorRelleno.A);
            this.rellenoInferiorLoc = gl.getUniformLocation(this.programa, "rellenoInferior");
            gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior == true) ? 1.0: 0.0);
            this.colorBordeLoc = gl.getUniformLocation(this.programa, "colorBorde");
            gl.uniform4f(this.colorBordeLoc, this.colorBorde.R, this.colorBorde.G, this.colorBorde.B, this.colorBorde.A);
            resolve();
        });
    }

    dibujar () {
        gl.useProgram(this.programa);
        
        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, 1.0);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, - this.capa / 10);

        //actualizar matrices M y V
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.v, false, RendererRefactor.camara.matrizV.obtenerArrayPorColumnas());

        //ACTUALIZAR: color, amplitud, desfases
        gl.uniform1f(this.amplitudLoc, this.amplitud);
        gl.uniform1f(this.desfaseXLoc, this.desfaseX);
        gl.uniform1f(this.desfaseYLoc, this.desfaseY);
        gl.uniform1f(this.periodoLoc, this.periodo);

        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior == true) ? 1.0: 0.0);
        gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.R, this.colorRelleno.G, this.colorRelleno.B, this.colorRelleno.A);
        gl.uniform4f(this.colorBordeLoc, this.colorBorde.R, this.colorBorde.G, this.colorBorde.B, this.colorBorde.A);

        //atributos
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    actualizar () {
        this.actualizarEstadoConSupervalores();
        if (this.funcionActualizar != null) {
            this.funcionActualizar();
        }
    }

    //los supervalores varian autom. por input del usuario. 60veces por segundo actualizamos las variables de l objeto con las
    //variables de los inputs de supervalores
    actualizarEstadoConSupervalores () {

        for (let i = 0; i < this.supervalores.length; i++) {
            this[this.supervalores[i].variable] = this.supervalores[i].valor;
        }
        
    }
    

}