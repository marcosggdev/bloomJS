class Modelo3D {
    constructor (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, rutaArchivoDae,
         VSHADER_SOURCE = VERTEX_SHADER_GOURAUD2, FSHADER_SOURCE = FRAGMENT_SHADER_GOURAUD2) {
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
        this.rutaArchivoDae = rutaArchivoDae;
        this.rutaTextura = null;
        this.texturizado = 0.0;
        this.VSHADER_SOURCE = VSHADER_SOURCE;
        this.FSHADER_SOURCE = FSHADER_SOURCE;
    }

    //permite generar modelos y esperar a que se ejecuten las funciones asincronas e iniciar(), para que asi el renderer
    //llame a actualizar/dibujar despues de que todos los modelos estan cargados
    static async generarModelo (posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, rutaArchivoDae,
        VSHADER_SOURCE, FSHADER_SOURCE) {
            //constructor asincrono estatico
            let modelo = new Modelo3D(posX, posY, posZ, anguloX, anguloY, anguloZ, factorX, factorY, factorZ, rutaArchivoDae,
                VSHADER_SOURCE, FSHADER_SOURCE);
            await modelo.cargar();
            return modelo;
    }

    async cargar () {
        let p = [];
        const respuestaArchivoXML = await fetch(this.rutaArchivoDae)
            .then( response => {
                return response.text();
            })
            .then( texto => {
                this.procesarDae(new DOMParser().parseFromString(texto, "application/xml"));
            });

        const respuestaMaterial = await fetch("assets/modelos/dae/materiales/esfera.mtl")
            .then( response => {
                return response.text();
            })
            .then( texto => {
                this.material = new Material(texto);
            });

        const cargados = await Promise.all([respuestaArchivoXML, respuestaMaterial])
            .then( response => {
                this.posar();
                this.iniciar();
            });
    }

    procesarDae (archivoXML) {
        this.archivoXML = archivoXML;
        console.log(this.archivoXML);
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
            let library_images = archivoXML.getElementsByTagName("library_images")[0];
            if (typeof library_images.getElementsByTagName("init_from")[0] !== "undefined") {
                let nombreTextura = library_images.getElementsByTagName("init_from")[0].textContent;
                this.rutaTextura = "assets/modelos/dae/texturas/" + nombreTextura;
                this.texturizado = 1.0;
            }

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

            //---------------------------escala------------------------------------------------------------------------------
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
            this.construirVertices();
            //this.vertices = datosProcesados[0];
            this.coordsNormales = datosProcesados[1];
            this.texCoords = datosProcesados[2];                                        
            //this.transformarVertices(m);
    }

    construirVertices () {
        //construye vertices en base a los vertices de geometria y los indices geometria
        let vertices = [];
        for (let i = 0; i < this.indicesGeometria.length; i++) {
            for (let j = 0; j < 3; j++) {
                vertices.push(this.geometria[3 * this.indicesGeometria[i] + j]);
            }
        }
        this.vertices = vertices;
    }

    reiniciarGeometria () {
        for (let i = 0; i < this.geometriaInicial.length; i++) {
            this.geometria[i] = this.geometriaInicial[i];
        }
    }

    posar () {
        //transforma los vertices para adaptarlos a los huesos utilizando el objeto skin y el objeto esqueleto
        //multiplicamos vertices por matriz union forma: transforma el sist ref de la geometria al que usan los huesos 
        this.reiniciarGeometria();
        let transformaciones = this.skin.transformaciones;
        for (let i = 0; i < transformaciones.length; i++) {
            //tranformaciones = [[ts1,ts2,... vert 1], [ts1,ts2... vert 2...]...]
            let transformacionesPorVertice = transformaciones[i];
            //por lo que i es el vertice afectado por las transform, coord primer dato 3*i en array vertices
            //la transformacion es lineal: (am1 + bm2 + ...) * v
            this.transformarVertice(transformacionesPorVertice, i);
        }
        this.construirVertices();
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
        this.matrizM.identidad();
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        //matriz modeloVista
        this.matrizMV = renderer.matrizV.multiplicar(this.matrizM);

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
                if (dimensionesPotenciaDeDos(imagen)) {
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
        this.mv = gl.getUniformLocation(this.programa, "mv");
        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        this.p = gl.getUniformLocation(this.programa, "p");
        gl.uniformMatrix4fv(this.p, false, renderer.matrizP.obtenerArrayPorColumnas());
        this.m = gl.getUniformLocation(this.programa, "m");
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());
        //material
        this.texturizadoLoc = gl.getUniformLocation(this.programa, "texturizado");
        gl.uniform1f(this.texturizadoLoc, this.texturizado);
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
        //otros uniform
        if (typeof jugador !== "undefined") {
            this.jPosLoc = gl.getUniformLocation(this.programa, "uJPos"); //uniform jugador posicion
            gl.uniform3fv(this.jPosLoc, jugador.posicion);
        } else {
            this.jPosLoc = gl.getUniformLocation(this.programa, "uJPos"); //uniform jugador posicion
            gl.uniform3fv(this.jPosLoc, [0,0,0]);
        }
    }

    actualizar () {
        //this.anguloX += 0.0001;
        //this.anguloY += 1;
        //this.anguloZ += 0.0001;
    }

    dibujar () {
        gl.useProgram(this.programa);
        //matriz del modelo
        this.matrizM.identidad();
        this.matrizM.escalar(this.factorX, this.factorY, this.factorZ);
        this.matrizM.rotar(this.anguloX, this.anguloY, this.anguloZ);
        this.matrizM.trasladar(this.posX, this.posY, this.posZ);

        this.matrizMV = renderer.matrizV.multiplicar(this.matrizM);

        gl.uniformMatrix4fv(this.mv, false, this.matrizMV.obtenerArrayPorColumnas());
        gl.uniformMatrix4fv(this.m, false, this.matrizM.obtenerArrayPorColumnas());

        if (typeof jugador !== "undefined") {
            this.jPosLoc = gl.getUniformLocation(this.programa, "uJPos"); //uniform jugador posicion
            gl.uniform3fv(this.jPosLoc, jugador.posicion);
        } else {
            this.jPosLoc = gl.getUniformLocation(this.programa, "uJPos"); //uniform jugador posicion
            gl.uniform3fv(this.jPosLoc, [0,0,0]);
        }

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
    }
}