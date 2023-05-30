class OndaSenoidal extends Forma {

    constructor (z) {

        super(0,0,z,1,1,VERTEX_SHADER_ONDAS_SENOIDALES, FRAGMENT_SHADER_ONDAS_SENOIDALES, Color.AZUL);

        this.amplitud = 0;
        this.desfaseX = 0;
        this.desfaseY = 0;
        this.periodo = 0;
        this.rellenoInferior = true;
        this.colorRelleno = new Color(255,0,0,255);
        this.colorBorde = new Color(0,255,0,255);

        this.parametros = [
            ["Amplitud", "amplitud", "NumericoDOM"],
            ["Desfase X", "desfaseX", "NumericoDOM"],
            ["Desfase Y", "desfaseY", "NumericoDOM"],
            ["Periodo", "periodo", "NumericoDOM"],
            ["Relleno inferior", "rellenoInferior", "BooleanoDOM"],
            ["Color de relleno", "colorRelleno", "ColorDOM"],
            ["Color de borde", "colorBorde", "ColorDOM"]
        ];
        
        this.crearSupervalores();
    }

    crearSupervalores () {
        //objeto (editables)
        this.supervaloresObjeto = [];
        for (let i = 0; i < this.parametros.length; i++) {
            this.supervaloresObjeto.push(new Supervalor(this, this.parametros[i][0], this.parametros[i][1], this.parametros[i][2], this[this.parametros[i][1]]));
        }
        //adicionales (no editables)
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

            //parametros onda
            this.amplitud = new NumericoDOM(0.3, -100, 100, 0.1);
            this.desfaseX = new NumericoDOM(0, -20000, 20000, 0.1);
            this.desfaseY = new NumericoDOM(0, -20000, 20000, 0.1);
            this.periodo = new NumericoDOM(7, -20000, 20000, 0.3);
            //colores onda
            this.rellenoInferior = new BooleanoDOM(true);
            this.colorRelleno = new ColorDOM(new Color(255,151,66,255));
            this.colorBorde = new ColorDOM(new Color(255, 136, 0, 255));

            this.parametros = [
                "amplitud",
                "desfaseX",
                "desfaseY",
                "periodo",
                "rellenoInferior",
                "colorRelleno",
                "colorBorde"
            ];

            this.nombres = [
                "Amplitud",
                "Desfase X",
                "Desfase Y",
                "Periodo",
                "Relleno Inferior",
                "Color de relleno",
                "Color del borde"
            ];

            this.asociacionNombresParametros = {
                "Amplitud": "amplitud",
                "Desfase X": "desfaseX",
                "Desfase Y": "desfaseY",
                "Periodo": "periodo",
                "Relleno Inferior": "rellenoInferior",
                "Color de relleno": "colorRelleno",
                "Color del borde": "colorBorde"
            };

            //declaramos como se va a representar estos datos en el DOM. Numerico, Booleano... etc son tipos de datos. Por ejemplo queremos que
            //los numericos aparezcan como una barra deslizable y los booleanos con un checkbox
            this.asociacionParametrosTipo = {
                "amplitud": "NumericoDOM",
                "desfaseX": "NumericoDOM",
                "desfaseY": "NumericoDOM",
                "periodo": "NumericoDOM",
                "rellenoInferior": "BooleanoDOM",
                "colorRelleno": "ColorDOM",
                "colorBorde": "ColorDOM"
            }

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
            gl.uniform1f(this.amplitudLoc, this.amplitud.numero);
            this.desfaseXLoc = gl.getUniformLocation(this.programa, "desfaseX");
            gl.uniform1f(this.desfaseXLoc, this.desfaseX.numero);
            this.desfaseYLoc = gl.getUniformLocation(this.programa, "desfaseY");
            gl.uniform1f(this.desfaseYLoc, this.desfaseY.numero);
            this.periodoLoc = gl.getUniformLocation(this.programa, "periodo");
            gl.uniform1f(this.periodoLoc, this.periodo.numero);

            this.uColor = gl.getUniformLocation(this.programa, "uColor");
            gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
            this.colorRellenoLoc = gl.getUniformLocation(this.programa, "colorRelleno");
            gl.uniform4f(this.colorRellenoLoc, this.color.R, this.color.G, this.color.B, this.color.A);
            this.rellenoInferiorLoc = gl.getUniformLocation(this.programa, "rellenoInferior");
            gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior.booleano == true) ? 1.0: 0.0);
            this.colorBordeLoc = gl.getUniformLocation(this.programa, "colorBorde");
            gl.uniform4f(this.colorBordeLoc, this.color.R, this.color.G, this.color.B, this.color.A);
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
        gl.uniform1f(this.amplitudLoc, this.amplitud.numero);
        gl.uniform1f(this.desfaseXLoc, this.desfaseX.numero);
        gl.uniform1f(this.desfaseYLoc, this.desfaseY.numero);
        gl.uniform1f(this.periodoLoc, this.periodo.numero);

        gl.uniform4f(this.uColor, this.color.R, this.color.G, this.color.B, this.color.A);
        gl.uniform1f(this.rellenoInferiorLoc, (this.rellenoInferior.booleano == true) ? 1.0: 0.0);
        gl.uniform4f(this.colorRellenoLoc, this.colorRelleno.color.R, this.colorRelleno.color.G, this.colorRelleno.color.B, this.colorRelleno.color.A);
        gl.uniform4f(this.colorBordeLoc, this.colorBorde.color.R, this.colorBorde.color.G, this.colorBorde.color.B, this.colorBorde.color.A);

        //atributos
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        //dibujado
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    actualizarParametros (cambiosOBJ) {
        //console.dir(cambiosOBJ);
        //actualizar valores. Nota: las variables son objetos del DOM, por lo que hay que modificar su valor
        let parametros = Object.keys(cambiosOBJ);

        //para ello separamos en tipos
        for (let i = 0; i < parametros.length; i++) {

            switch (this[parametros[i]].constructor.name) {

                case "NumericoDOM":
                    this[parametros[i]].numero = cambiosOBJ[parametros[i]];
                    break;

                case "BooleanoDOM":
                    if (cambiosOBJ[parametros[i]] == "true") {
                        this[parametros[i]].booleano = true;
                    } else {
                        this[parametros[i]].booleano = false;
                    }
                    break;

                case "ColorDOM":
                    //el input type color no tiene soporte para alpha => concatenar ff
                    //colorhexa viene en formato de 6 digitos donde max = ff para cada par => 255 en rgb
                    let colorHexa = cambiosOBJ[parametros[i]] + "ff";
                    let r255 = parseInt(colorHexa[1] + colorHexa[2], 16);
                    let g255 = parseInt(colorHexa[3] + colorHexa[4], 16);
                    let b255 = parseInt(colorHexa[5] + colorHexa[6], 16);
                    let a255 = parseInt("ff", 16);
                    let color = new Color(r255,g255,b255,a255);
                    this[parametros[i]].color = color;
                    break;
            }
            
        }

    }

}