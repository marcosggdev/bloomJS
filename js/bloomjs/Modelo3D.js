class Modelo3D {

    static modos = {
        "C": "cargarModoC",
        "T": "cargarModoT",
        "TM": "cargarModoTM",
        "TMI": "cargarModoTMI"
    };

    static formasDibujo = {
        "C": "dibujarC",
        "T": "dibujarT",
        "TM": "dibujarTM",
        "TMI": "dibujarTMI"
    }
    
    constructor (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial) {
        //constructor con parametros sincronos. Se llama desde generarModelo
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.anguloX = anguloX;
        this.anguloY = anguloY;
        this.anguloZ = anguloZ;
        this.factorX = factorX;
        this.factorY = factorY;
        this.factorZ = factorZ;

        this.modo = modo;
        this.rutaArchivoDae = rutaArchivoDae;
        this.color = color;
        this.rutaTextura = rutaTextura;
        this.rutaMaterial = rutaMaterial;

        //carga de forma distinta en funcion del modo de shader
        this.cargar(modo);
    }

    cargar (modo) {
        //shaders
        this[Modelo3D.modos[modo]]();
    }

    dibujar () {
        this[Modelo3D.formasDibujo[this.modo]]();
    }   

    dibujarC () {
        gl.useProgram(this.programa);

        //matriz del modelo
        this.actualizarMatrizM();

        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    dibujarT () {
        gl.useProgram(this.programa);

        //matriz del modelo
        this.actualizarMatrizM();

        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(this.aTexLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
        gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.textura);    //para que cada objeto se dibuje con su textura

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    /* 
    * Solo necesitamos cargar aPos y uColor
    */
    cargarModoC () {
        let promesa = new Promise(resolve => {
            let self = this;
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    self.procesarDae(new DOMParser().parseFromString(this.responseText, "application/xml"));
    
                    self.VSHADER_SOURCE = VERTEX_SHADER_COLOR;
                    self.FSHADER_SOURCE = FRAGMENT_SHADER_COLOR;
                    //shaders y programa
                    self.VSHADER = crearShader(gl, gl.VERTEX_SHADER, self.VSHADER_SOURCE);
                    self.FSHADER = crearShader(gl, gl.FRAGMENT_SHADER, self.FSHADER_SOURCE);
                    self.programa = crearPrograma(gl, self.VSHADER, self.FSHADER);
                    gl.useProgram(self.programa);
        
                    //attribute aPos
                    self.aPosLoc = gl.getAttribLocation(self.programa, "aPos");
                    self.aPosBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, self.aPosBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(self.vertices), gl.STATIC_DRAW);
        
                    //uniform uColor
                    self.uColorLoc = gl.getUniformLocation(self.programa, "uColor");
                    gl.uniform4f(self.uColorLoc, self.color.R, self.color.G, self.color.B, self.color.A);

                    resolve();
                }
            };
            req.open("GET", self.rutaArchivoDae);
            req.send();
        });

        promesa
        .then(
            () => {
                //matrices
                this.matrizM = new Matriz4X4();
                this.actualizarMatrizM();
                //uniforms matrices
                this.m = gl.getUniformLocation(this.programa, "m");
                gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
                this.v = gl.getUniformLocation(this.programa, "v");
                gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
                this.p = gl.getUniformLocation(this.programa, "p");
                gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

                //crear HITBOX
                let factoresHitbox = this.calcularFactoresHitbox(this.vertices);
                this.hitbox = new Hitbox(this.posX, this.posY, this.posZ,
                    this.anguloX, this.anguloY, this.anguloZ, 
                    this.factorX, this.factorY, this.factorZ, factoresHitbox);

                Renderer.anadirGraficoDibujable(this);
            }
        );

    }

    cargarModoT () {

        let self = this;

        const promesaDae = new Promise(resolve => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            req.open("GET", self.rutaArchivoDae);
            req.send();
        });

        const promesaTextura = new Promise(resolve => {
            var imagen = new Image();
            imagen.crossOrigin = "anonymous";
            imagen.src = self.rutaTextura;
            imagen.addEventListener('load', function () {
                resolve(imagen);
            });
        });

        let promesa = Promise.all([promesaDae, promesaTextura]);
        promesa
        .then(
            (values) => {
                this.procesarDae(new DOMParser().parseFromString(values[0], "application/xml"));

                //matriz del modelo
                this.matrizM = new Matriz4X4();
                this.actualizarMatrizM();

                this.VSHADER_SOURCE = VERTEX_SHADER_T;
                this.FSHADER_SOURCE = FRAGMENT_SHADER_T;
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

                //textura
                this.aTexLoc = gl.getAttribLocation(this.programa, "aTex");
                this.aTexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);

                var textura = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, textura);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
                var imagen = values[1];
                imagen.crossOrigin = "anonymous";
                imagen.src = this.rutaTextura;

                imagen.addEventListener('load', function () {
                    gl.bindTexture(gl.TEXTURE_2D, textura);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
                    if (Utilidades.dimensionesPotenciaDeDos(imagen)) {
                        gl.generateMipmap(gl.TEXTURE_2D);
                    } else {
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    }
                    gl.generateMipmap(gl.TEXTURE_2D);
                });

                this.textura = textura; //guardamos el objeto textura en el objeto
                this.samplerLoc = gl.getUniformLocation(this.programa, "sampler");
                gl.uniform1i(this.samplerLoc, 0);

                //uniforms matrices
                this.m = gl.getUniformLocation(this.programa, "m");
                gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
                this.v = gl.getUniformLocation(this.programa, "v");
                gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
                this.p = gl.getUniformLocation(this.programa, "p");
                gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

                //crear HITBOX
                let factoresHitbox = this.calcularFactoresHitbox(this.vertices);
                this.hitbox = new Hitbox(this.posX, this.posY, this.posZ,
                    this.anguloX, this.anguloY, this.anguloZ,
                    this.factorX, this.factorY, this.factorZ, factoresHitbox);

                Renderer.anadirGraficoDibujable(this);
            }
        );
    }

    cargarModoTM () {

    }

    cargarModoTMI () {

    }

    /*async cargar () {
        //obligatorio
        const respuestaArchivoXML = await fetch(this.rutaArchivoDae)
            .then( response => {
                return response.text();
            })
            .then( texto => {
                this.procesarDae(new DOMParser().parseFromString(texto, "application/xml"));
            });

        //cargar archivo del material
        if (this.rutaMaterial != null) {
            const respuestaMaterial = await fetch(this.rutaMaterial)
            .then( response => {
                return response.text();
            })
            .then( texto => {
                this.material = new Material(texto);
            });
        }

        //cargar imagen de la textura
        if (this.rutaTextura != null) {
            var imagen = new Image();
            imagen.crossOrigin = "anonymous";
            imagen.src = this.rutaTextura;
            imagen.addEventListener('load', () => {
                this.imagen = imagen;
            });
        }

        const cargados = await Promise.all([respuestaArchivoXML])
            .then( response => {
                this.iniciar();
            });
    }*/ 

    procesarDae (archivoXML) {
        this.archivoXML = archivoXML;
        console.log(archivoXML);
            //vertices, normales y uv
            let datosProcesados = [[],[],[]];
            
            let library_geometries = archivoXML.getElementsByTagName("library_geometries")[0];
            let geometries = library_geometries.getElementsByTagName("geometry");

            for (let i = 0; i < geometries.length; i++) {
                let mesh = geometries[i].getElementsByTagName("mesh")[0];   //mesh compuesto de sources, vertices y triangles
    
                //sources
                let sources = mesh.getElementsByTagName("source");
                let datosSources = [];
                for (let j = 0; j < sources.length; j++) {
                    let source = sources[j];
                    let objSource = new Recurso("#" + source.getAttribute("id"), source.getElementsByTagName("float_array")[0].textContent.split(" "),
                    source.getElementsByTagName("accessor")[0].getAttribute("stride"));
                    datosSources.push(objSource);
                }
    
                //vertices
                let objVertices = new Vertices("#" + mesh.getElementsByTagName("vertices")[0].getAttribute("id"), 
                mesh.getElementsByTagName("vertices")[0].getElementsByTagName("input")[0].getAttribute("source"));
    
                //triangles
                let triangulos = [];
                let triangles = mesh.getElementsByTagName("triangles");
                for (let j = 0; j < triangles.length; j++) {
                    let triangle = triangles[j];
                    let inputs = triangle.getElementsByTagName("input");
                    let inputsTriangulo = [];
                    for (let k = 0; k < inputs.length; k++) {
                        let input = inputs[k];
                        let objInput = new Input(input.getAttribute("semantic"), input.getAttribute("source"), Number(input.getAttribute("offset")));
                        inputsTriangulo.push(objInput);
                    }
                    let objTriangulo = new Triangulos(inputsTriangulo, triangle.getElementsByTagName("p")[0].textContent.split(" "));
                    triangulos.push(objTriangulo);
                }
    
                /*todos los datos del mesh actual estan recogidos en los siguientes objetos:
                datosSources (multiples)
                objVertices (supuesto unico)
                triangulos  (multiples)
                */
                /*algoritmo: usar los indices de triangulos para mapear los vertices, normales y uv en el orden correcto*/
            
                for (let j = 0; j < triangulos.length; j++) {
                    //para cada triangulo, tenemos indices y pusheamos los datos de vertices normales y uv
                    //para procesar los indices hay que tener en cuenta los inputs y sus offset
                    let triangulo = triangulos[j];
                    let indices = triangulo.indices;
                    let numeroInputs = triangulo.inputs.length;

                    for (let k = 0; k < numeroInputs; k++) {
                        //cada input tiene asociado un array de datos
                        let input = triangulo.inputs[k];
                        let datosOrigen = [];
                        let sourceAsociado = new Recurso();
                        switch (input.semantic) {
                            case "VERTEX":
                                //input.recurso apunta a vertices.id, que tiene de pointer el array de datos sources
                                for (let l = 0; l < datosSources.length; l++) {
                                    if (datosSources[l].id == objVertices.pointer) {
                                        datosOrigen = datosSources[l].datos;
                                        sourceAsociado  = datosSources[l];
                                        //guardamos la geometria (vertices independientes ordenados como indica skinning)
                                        this.geometriaInicial = sourceAsociado.datos; //geometria inicial
                                        this.geometria = sourceAsociado.datos; //modificable a traves de cambios en huesos
                                        let indicesGeometria = [];
                                        for (let k = 0; k < indices.length/numeroInputs; k++) {
                                            indicesGeometria.push(Number(indices[numeroInputs * k]));
                                        }
                                        //indices que usar para obtener vertices.
                                        this.indicesGeometria = indicesGeometria;
                                    }
                                }
                                break;
                            default:
                                //input.recurso apunta a array de dentro de datos sources (id)
                                for (let l = 0; l < datosSources.length; l++) {
                                    if (datosSources[l].id == input.recurso) {
                                        datosOrigen = datosSources[l].datos;
                                        sourceAsociado = datosSources[l];
                                    }
                                }
                                break;
                        }
                        //ahora datos origen esta definido. puede ser array de vertices, normales, colores, cualquier cosa que indiquen los inputs
                        //hay que leer los indices correctamente y añadir a datos mapeados los del origen que indiquen los indices, en el orden correcto
                        let datosInputMapeados = [];
                        let stride = sourceAsociado.stride;
                        for (let m = 0; m < indices.length/numeroInputs; m++) {
                            for (let n = 0; n < stride; n++) {
                                datosInputMapeados.push(Number(datosOrigen[stride * indices[input.offset + numeroInputs * m] + n]));
                            }
                        }

                        switch (input.semantic) {
                            case "VERTEX": datosProcesados[0] = datosProcesados[0].concat(datosInputMapeados); break;
                            case "NORMAL": datosProcesados[1] = datosProcesados[1].concat(datosInputMapeados); break;
                            case "TEXCOORD": datosProcesados[2] = datosProcesados[2].concat(datosInputMapeados); break;
                        }
                    }
                }
            }

            //------------------------TEXTURA------------------------------------
            /* let library_images = archivoXML.getElementsByTagName("library_images")[0];
            if (typeof library_images.getElementsByTagName("init_from")[0] !== "undefined") {
                let nombreTextura = library_images.getElementsByTagName("init_from")[0].textContent;
                this.rutaTextura = "/bloomJS/assets/texturas/" + nombreTextura;
                this.texturizado = 1.0;
            }*/

            //-------------------------nodos------------------------------
            let library_visual_scenes = archivoXML.getElementsByTagName("library_visual_scenes")[0];
            if (typeof archivoXML.getElementsByTagName("skeleton")[0] !== "undefined") {
                let esqueleto = new Esqueleto(library_visual_scenes);
                this.esqueleto = esqueleto;

                //-----------------------LIBRARY_CONTROLLER (SKINNING - Union de huesos a vertices y pesos)-------------------------------------
                let library_controllers = archivoXML.getElementsByTagName("library_controllers")[0];
                if (typeof archivoXML.getElementsByTagName("library_controllers")[0] !== "undefined") {
                    let skinXML = library_controllers.getElementsByTagName("skin")[0];
                    let skin = new Skin(skinXML, esqueleto);
                    this.skin = skin;
                }
            }

            //---------------------------Transformacion inicial------------------------------------------------------------------------------
            let visual_scene = library_visual_scenes.getElementsByTagName("visual_scene")[0];
            let arrayMatriz = visual_scene.getElementsByTagName("node")[0].getElementsByTagName("matrix")[0].textContent.split(" ");
            let m = new Matriz4X4();
            m.identidad();
            m.leerArray(arrayMatriz);

            //--------------------------animaciones--------------------------------
            if (typeof archivoXML.getElementsByTagName("library_animations")[0] !== "undefined") {
                let library_animations = archivoXML.getElementsByTagName("library_animations")[0];
                let animacionesXML = library_animations;
                /*
                animation
                    source pose matrix input = tiempos de cada frame en s
                    source pose matrix output = matrices de transformacion de los bones en el tiempo
                    source pose matrix interpolation
                    sampler (sampler y channel manejan el target de animacion)
                    channel
                */

                let animaciones = []; //animaciones procesadas
                let nodosAnimacion = animacionesXML.children;    //animaciones XML

                //lista de XML de animaciones independientes
                for (let i = 0; i < nodosAnimacion.length; i++) {
                    let huesosAnimadosXML = nodosAnimacion[i].getElementsByTagName("animation");
                    let id = nodosAnimacion[i].getAttribute("id")
                    let huesosAnimados = [];
                    for (let j = 0; j < huesosAnimadosXML.length; j++) {
                        let sources = huesosAnimadosXML[j].getElementsByTagName("source");
                        let channel = huesosAnimadosXML[j].getElementsByTagName("channel")[0];
                        let huesoAnimado = {
                            tiempos: sources[0].getElementsByTagName("float_array")[0].textContent.split(" "),
                            matricesOutput: Matriz4X4.crearMatrices4X4(sources[1].getElementsByTagName("float_array")[0].textContent.split(" ")),
                            arrayMatrixInterpolation: sources[2].getElementsByTagName("Name_array")[0].textContent.split(" "),
                            target: channel.getAttribute("target")
                        }
                        huesosAnimados.push(huesoAnimado);
                    }
                    let animacion = new Animacion(id, huesosAnimados, this.esqueleto, this.skin, this);
                    animaciones.push(animacion);
                }
                this.animaciones = animaciones;
            }

            //informacion que iniciaremos de forma secuencial en el constructor con await y otra func auxiliar
            this.construirVertices(m);
            //this.vertices = datosProcesados[0];
            this.coordsNormales = datosProcesados[1];
            this.texCoords = datosProcesados[2];                                        
            //this.transformarVertices(m);
    }

    construirVertices (transformacionInicial) {
        //construye vertices en base a los vertices de geometria y los indices geometria
        let vertices = [];
        for (let i = 0; i < this.indicesGeometria.length; i++) {
            for (let j = 0; j < 3; j++) {
                vertices.push(this.geometria[3 * this.indicesGeometria[i] + j]);
            }
        }
        for (let i = 0; i < vertices.length / 3; i++) {
            let vector = new Vector4X1([vertices[3*i], vertices[3*i+1], vertices[3*i+2], 1]);
            let nuevoVector = transformacionInicial.multiplicarVector(vector);
            vertices[3*i] = nuevoVector.datos[0];
            vertices[3*i+1] = nuevoVector.datos[1];
            vertices[3*i+2] = nuevoVector.datos[2];
        }
        this.vertices = vertices;
    }

    reiniciarGeometria () {
        for (let i = 0; i < this.geometriaInicial.length; i++) {
            this.geometria[i] = this.geometriaInicial[i];
        }
    }

    transformarVertices (transformacion) {
        //permite aplicar una matriz al array de vertices. Similar a GLSL
        for (let i = 0; i < this.geometria.length/3; i++) {
            let vector = new Vector4X1(this.geometria.slice(3*i, 3*(i+1)));
            vector.datos.push(1);
            let nuevoVector = transformacion.multiplicarVector(vector);
            for (let j = 0; j < 3; j++) {
                this.geometria[3 * i] = nuevoVector.datos[j];
            }
        }
        this.construirVertices();
    }

    transformarVertice (transformaciones, indice) {
        //permite aplicar una matriz a un vertice particular, indice=0,1...=vertice 0, vertice 1...
        let vertice = new Vector4X1(this.geometria.slice(3*indice, 3*(indice+1)));
        let matrizSuma = Matriz4X4.sumar(transformaciones);
        vertice.datos.push(1);
        let nuevoVertice = matrizSuma.multiplicarVector(vertice);
        for (let i = 0; i < nuevoVertice.datos.length-1; i++) {
            this.geometria[3*indice+i] = nuevoVertice.datos[i];
        }
    }

    iniciar () {
        //matriz del modelo
        this.matrizM = new Matriz4X4();
        this.actualizarMatrizM();

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

        //attribute aNorm
        this.aNormLoc = gl.getAttribLocation(this.programa, "aNorm");
        this.aNormBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aNormBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.coordsNormales), gl.STATIC_DRAW);

        if (this.rutaTextura != null) {
            this.texturizado = 1.0;
            //textura
            this.aTexLoc = gl.getAttribLocation(this.programa, "aTex");
            this.aTexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);

            var textura = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textura);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]));
            var imagen = new Image();
            imagen.crossOrigin = "anonymous";
            //imagen.src = "https://webglfundamentals.org/webgl/resources/f-texture.png";
            imagen.src = this.rutaTextura;
            imagen.addEventListener('load', function () {
                gl.bindTexture(gl.TEXTURE_2D, textura);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
                if (Utilidades.dimensionesPotenciaDeDos(imagen)) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
                gl.generateMipmap(gl.TEXTURE_2D);
            });

            this.textura = textura; //guardamos el objeto textura en el objeto
            this.samplerLoc = gl.getUniformLocation(this.programa, "sampler");
            gl.uniform1i(this.samplerLoc, 0);
        }

        //uniforms matrices
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        this.v = gl.getUniformLocation(this.programa, "v");
        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, Renderer.matrizP.obtenerArrayPorColumnas());

        this.texturizadoLoc = gl.getUniformLocation(this.programa, "texturizado");
        gl.uniform1f(this.texturizadoLoc, this.texturizado);

        //material
        if (this.material != null) {
            this.nsLoc = gl.getUniformLocation(this.programa, "ns");
            gl.uniform1f(this.nsLoc, this.material.ns);
            this.kaLoc = gl.getUniformLocation(this.programa, "ka");
            gl.uniform3fv(this.kaLoc, [0.2,0.2,0.2]);
            this.kdLoc = gl.getUniformLocation(this.programa, "kd");
            if (this.kd != null) {
                gl.uniform3fv(this.kdLoc, this.material.kd);
            } else {
                gl.uniform3fv(this.kdLoc, [0.2,0.2,0.2]);
            }
            this.ksLoc = gl.getUniformLocation(this.programa, "ks");
            gl.uniform3fv(this.ksLoc, this.material.ks);
            this.keLoc = gl.getUniformLocation(this.programa, "ke");
            gl.uniform3fv(this.keLoc, this.material.ke);
            this.niLoc = gl.getUniformLocation(this.programa, "ni");
            gl.uniform1f(this.niLoc, this.material.ni);
            this.dLoc = gl.getUniformLocation(this.programa, "d");
            gl.uniform1f(this.dLoc, this.material.d);
        }

        //crear HITBOX
        let factoresHitbox = this.calcularFactoresHitbox(this.vertices);
        this.hitbox = new Hitbox(this.posX, this.posY, this.posZ,
            this.anguloX, this.anguloY, this.anguloZ, 
            this.factorX, this.factorY, this.factorZ, factoresHitbox);

        Renderer.anadirGraficoDibujable(this);
    }

    calcularFactoresHitbox (vertices) {
        //calcular escala de la hitbox para que contenga el modelo de forma minima y cubica
        let xMinima = 1000;
        let yMinima = 1000;
        let zMinima = 1000;
        let xMaxima = -1000;
        let yMaxima = -1000;
        let zMaxima = -1000;
        
        for (let i = 0; i < vertices.length / 3; i++) {
            
            //nota: convertir a number porque sino comparara strings con resultados extraños
            let x = Number(vertices[3*i]);
            let y = Number(vertices[3*i+1]);
            let z = Number(vertices[3*i+2]);

            if (x < xMinima) {
                xMinima = x;
            }
            if (x > xMaxima) {
                xMaxima = x;
            }

            if (y < yMinima) {
                yMinima = y;
            }
            if (y > yMaxima) {
                yMaxima = y;
            }

            if (z < zMinima) {
                zMinima = z;
            }
            if (z > zMaxima) {
                zMaxima = z;
            }
        }
        return [xMinima, xMaxima, yMinima, yMaxima, zMinima, zMaxima];
    }

    actualizar () {
        if (this.funcionActualizar != null) {
            this.funcionActualizar(this);
        } else {
            //actualizando sin funcion definida
        }
    }
/*
    dibujar () {
        gl.useProgram(this.programa);

        //matriz del modelo
        this.actualizarMatrizM();

        gl.uniformMatrix4fv(this.v, false, Renderer.camara.matrizV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        //atributos
        gl.enableVertexAttribArray(this.aPosLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.aPosLoc, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(this.aNormLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aNormBuffer);
        gl.vertexAttribPointer(this.aNormLoc, 3, gl.FLOAT, false, 0, 0);

        if (this.rutaTextura != null) {
            gl.enableVertexAttribArray(this.aTexLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aTexBuffer);
            gl.vertexAttribPointer(this.aTexLoc, 2, gl.FLOAT, false, 0, 0);
            gl.bindTexture(gl.TEXTURE_2D, this.textura);    //para que cada objeto se dibuje con su textura
        }

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }*/ 

    actualizarMatrizM () {
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.rotarConRespectoAWorld(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);
    }

    mover (atributo, valor) {
        this[atributo] = valor;
        this.actualizarMatrizM();
        this.hitbox.actualizarPosicion(this.posX, this.posY, this.posZ);
    }

    //buscamos rotaciones con respecto a ejes x,y,z de world space, no de local space
    rotar (atributo, valor) {
        this[atributo] = valor;
        this.actualizarMatrizM();
        this.hitbox.actualizarRotacion(this.anguloX, this.anguloY, this.anguloZ);
    }

    escalar (atributo, valor) {
        this[atributo] = valor;
        this[atributo+"Inicial"] = valor;
        this.actualizarMatrizM();
        this.hitbox.actualizarEscala(this.factorX, this.factorY, this.factorZ);
    }

    funcionSeleccion () {
        if (this.contador == null) {
            this.factorXInicial = this.factorX;
            this.factorYInicial = this.factorY;
            this.factorZInicial = this.factorZ;
            this.contador = 0;
        }
        let factor = 1 + Math.cos(Utilidades.toRadians(this.contador)) / 24;
        this.factorX = this.factorXInicial * factor;
        this.factorY = this.factorYInicial * factor;
        this.factorZ = this.factorZInicial * factor;
        this.contador+=1;
    };

    funcionRotarX () {
        if (this.contador == null) {
            this.contador = 0;
        }
        this.anguloX = this.contador;
        this.contador++;
    }

    funcionRotarY () {
        if (this.contador == null) {
            this.contador = 0;
        }
        this.anguloY = this.contador;
        this.contador++;
    }

    funcionRotarZ () {
        if (this.contador == null) {
            this.contador = 0;
        }
        this.anguloZ = this.contador;
        this.contador++;
    }

    resetearFactores () {
        if (this.factorXInicial != null) {
            this.factorX = this.factorXInicial;
        }
        if (this.factorYInicial != null) {
            this.factorY = this.factorYInicial;
        }
        if (this.factorZInicial != null) {
            this.factorZ = this.factorZInicial;
        }
    }

    /**
     * permite rotar el modelo despues de pulsar la tecla r con el teclado.
     * Para ello calculamos un eje de rotacion perpendicular a un plano imaginario perpendicular a la camara y que contenga
     * el centro del objeto
     */
    static rotarObjetoTecla (modelo) {
        //eje: vector director camara-objeto
        let posCamara = Renderer.camara.obtenerPosicionCamara();
        let posObjeto = new Vector4X1([modelo.posX, modelo.posY, modelo.posZ, 1]);
        let vectorDirector = Vector4X1.restarVectores(posCamara, posObjeto);
        vectorDirector.normalizar();

        //como influye el mouse en la rotacion: indicara el angulo de rotacion como si se tratase de la aguja de un reloj.
        //calcularemos el angulo con trigonometria. obtenemos coords de forma estatica desde VentanaCanvas

        //sabemos coords del mouse respecto al centro visible del canvas
        let centroX = VentanaCanvas.mouseX;
        let centroY = VentanaCanvas.mouseY;
        let vectorCentro = new Vector4X1([centroX, centroY, 0, 1]);

        //computar coord screen del centro del modelo
        let coordScreen = Renderer.matrizP.multiplicarVector(Renderer.camara.matrizV.multiplicarVector(modelo.matrizM.multiplicarVector
            (new Vector4X1([modelo.posX, modelo.posY, modelo.posZ, 1]))));
        
        let coordsRespectoAObjeto = Vector4X1.restarVectores(vectorCentro, coordScreen);
        let angulo = Math.atan2(coordsRespectoAObjeto.datos[1], coordsRespectoAObjeto.datos[0]);
        angulo = Utilidades.toDegrees(angulo);

       //por ultimo Descomponer el angulo que hemos obtenido a los 3 ejes para pasarlo a modelo.factorXYZ
        let rotacion = Matriz4X4.crearMatrizRotacionConRespectoAVectorUnitario(vectorDirector, angulo);
        let angulos = Matriz4X4.obtenerAngulosDeMatrizRotacion(rotacion);
        modelo.anguloX = angulos["anguloX"];
        modelo.anguloY = angulos["anguloY"];
        modelo.anguloZ = angulos["anguloZ"];
        modelo.hitbox.actualizarRotacion(modelo.anguloX, modelo.anguloY, modelo.anguloZ);
    }

    /**
     * Permite trasladar un objeto al pulsar la tecla t del teclado.
     * Para ello, calculamos un plano imaginario perpendicular a la camara que contenga el centro del objeto y lo
     * trasladamos por el plano
     */
    static trasladarObjetoTecla (modelo) {
        //obtenemos las coords del raton en coordenadas de screen
        //sabemos coords del mouse respecto al centro visible del canvas
        let centroX = VentanaCanvas.mouseX;
        let centroY = VentanaCanvas.mouseY;

        let centroXGL = 2 * centroX / Renderer.ancho;
        let centroYGL = 2 * centroY / Renderer.alto;

        let vInversa = Matriz4X4.obtenerInversa(Renderer.camara.matrizV);
        let pInversa = Matriz4X4.obtenerInversa(Renderer.matrizP);

        let coordScreenModelo = new Vector4X1([centroXGL, centroYGL, 0.0, 1]);
        coordScreenModelo = pInversa.multiplicarVector(coordScreenModelo);
        coordScreenModelo.datos[2] = -1.0;
        coordScreenModelo.datos[3] = 0.0;
        coordScreenModelo = vInversa.multiplicarVector(coordScreenModelo);
        coordScreenModelo.normalizar();

        let posCamara = Renderer.camara.obtenerPosicionCamara();
        let posModelo = new Vector4X1([modelo.posX, modelo.posY, modelo.posZ, 1]);
        let distancia = Vector4X1.obtenerModulo(Vector4X1.restarVectores(posCamara, posModelo));

        let coordModelo = Vector4X1.sumarVectores(posCamara, Vector4X1.multiplicarVectorPorEscalar(coordScreenModelo, distancia));

       // let coordsModelo = vInversa.multiplicarVector(pInversa.multiplicarVector(coordScreenModelo));
        modelo.posX = coordModelo.datos[0];
        modelo.posY = coordModelo.datos[1];
        modelo.posZ = coordModelo.datos[2];
        modelo.hitbox.actualizarPosicion(modelo.posX, modelo.posY, modelo.posZ);
    }

    /**
     * Permite escalar un objeto al pulsar la tecla s del teclado
     * Para ello, calculamos el factor de escala proporcional a la distancia en screen del raton al centro del objeto.
     * Esta escala es la por defecto y escala xyz. 
     */
    static escalarObjetoTecla (modelo) {
        //distancia en screen space entre raton y modelo => factor exponencial para escalar.

        //pos el raton cuando se pulso la tecla t (referencia porque en ese punto, tamaño = tamaño inicial)
        let posInicial = new Vector4X1([VentanaCanvas.mouseXTecla *2 / Renderer.ancho, VentanaCanvas.mouseYTecla * 2 / Renderer.alto, -1, 1]);
        //pos modelo en screenSpace
        let posModelo = Renderer.matrizP.multiplicarVector(Renderer.camara.matrizV.multiplicarVector(modelo.matrizM.multiplicarVector
            (new Vector4X1([modelo.posX, modelo.posY, modelo.posZ, 1]))));
        //distancia inicial
        let distanciaInicial = Vector4X1.obtenerModulo(Vector4X1.restarVectores(posInicial, posModelo));


        //pos actual del mouse
        let posActual = new Vector4X1([VentanaCanvas.mouseX*2 / Renderer.ancho, VentanaCanvas.mouseY* 2 / Renderer.alto, -1, 1]);
        //distancia screen mouse - screen modelo
        let distanciaActual = Vector4X1.obtenerModulo(Vector4X1.restarVectores(posActual, posModelo));

        // > 0 si actual > inicial; < 0 si actua < inicial. => mayor si mas lejos del modelo con respecto a inicial
        let deltaDistancia = distanciaActual - distanciaInicial;
        
        //en delta = 0, escala no modificada. Despues aumenta/decrece exponencialmente
        modelo.factorX = Modelo3D.escala(VentanaCanvas.factorXInicial, deltaDistancia, distanciaInicial);
        modelo.factorY = Modelo3D.escala(VentanaCanvas.factorYInicial, deltaDistancia, distanciaInicial);
        modelo.factorZ = Modelo3D.escala(VentanaCanvas.factorZInicial, deltaDistancia, distanciaInicial);
        modelo.hitbox.actualizarEscala(modelo.factorX, modelo.factorY, modelo.factorZ, distanciaInicial);

        //reset de contador para que se tome nuevos factores como punto de partida en animacion de seleccion
        modelo.contador = null;

    }

    static escala (escalaInicial, distanciaActual, distanciaInicial) {
        //escalado exponencial. Velocidad proporcional a la distanciaInicial
        let resultado = escalaInicial * Math.exp(1500 * distanciaActual / distanciaInicial);
        return resultado;
    }

    eliminar () {
        //borrar de renderer dibujables, igualar a null y hacer lo mismo con su hitbox
        for (let i = 0; i < Renderer.dibujables.length; i++) {
            if (Renderer.dibujables[i] == this) {
                Renderer.dibujables.splice(i, 1);
            }
        }
        this.hitbox.eliminar();
        this.hitbox = null;
    }

    setFuncionActualizar (callback) {
        this.funcionActualizar = this[callback];
    }

    serializar () {
        //posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, modo, rutaArchivoDae, color, rutaTextura, rutaMaterial
        return "posX:"+this.posX+";posY:"+this.posY+";posZ:"+this.posZ+";anguloX:"+this.anguloX+";anguloY:"
        +this.anguloY+";anguloZ:"+this.anguloZ+";factorX:"+this.factorX+";factorY:"+this.factorY+";factorZ:"+this.factorZ+";modo:"+this.modo+
        ";rutaArchivoDae:"+this.rutaArchivoDae+";"+this.color.serializar()+";rutaTextura:"+this.rutaTextura+";rutaMaterial:"+this.rutaMaterial;
    }
}   