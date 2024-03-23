import Matrix4x4 from '@/js/bloomjs_glib/maths/Matrix4x4'
import { createShader, createProgram, VERTEX_SHADER_IMAGE, FRAGMENT_SHADER_IMAGE } from '@/js/bloomjs_glib/graphics/GLSL'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer'

export default class Model2D {

    constructor (xPos, yPos, zPos, xAngle, yAngle, zAngle, xFactor, yFactor, texturePath,
         VSHADER_SOURCE = VERTEX_SHADER_IMAGE, FSHADER_SOURCE = FRAGMENT_SHADER_IMAGE, color = null) {
        //constructor con parametros sincronos. Se llama desde generarModelo
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.xAngle = xAngle;
        this.yAngle = yAngle;
        this.zAngle = zAngle;
        this.xFactor = xFactor;
        this.yFactor = yFactor;
        this.texturePath = texturePath;
        this.VSHADER_SOURCE = VSHADER_SOURCE;
        this.FSHADER_SOURCE = FSHADER_SOURCE;
        this.color = color;

        this.selectable = true;

        this.createVertices();
        this.createUVCoords();
        this.mMat = new Matrix4x4();
    }

    static async create2DModel (xPos, yPos, zPos, xAngle, yAngle, zAngle, xFactor, yFactor, texturePath,
        VSHADER_SOURCE, FSHADER_SOURCE, color) {
            return new Promise(resolve => {
                let model2D = new model2D(xPos, yPos, zPos, xAngle, yAngle, zAngle, xFactor, yFactor, texturePath,
                    VSHADER_SOURCE, FSHADER_SOURCE, color);
                model2D.init()
                .then(
                    function () {
                        resolve(model2D);
                    }
                );
            });
    }

    createVertices () {
        
        //vertices de un cuadrado separado en 2 triangulos
        this.vertices = [
            -1,-1,0,
            1,-1,0,
            1,1,0,
            -1,-1,0,
            1,1,0,
            -1,1,0
        ];

    }

    createUVCoords () {

        //coordenadas UV para una texture que se situe invertida verticalmente en el cuadrado definido por this.vertices
        //Nota: de la inversión vertical posterior ya se encarga WebRenderer.gl. Ver clase Renderer metodo habilitarPropiedades
        //Nota: las coords UV van de 0 a 1 desde la esquina inferior izquierda

        this.uvCoords = [
            0,0,
            1,0,
            1,1,
            1,0,
            1,1,
            0,1    
        ];

    }

    async init () {
        return new Promise(resolve => {
            //matriz del modelo
            this.mMat.identity();
            this.mMat.rotate(this.xAngle, this.yAngle, this.zAngle);
            this.mMat.scale(this.xFactor, this.yFactor, this.zFactor);
            this.mMat.translate(this.xPos, this.yPos, this.zPos);

            //shaders y program
            this.VSHADER = createShader(Renderer.gl, Renderer.gl.VERTEX_SHADER, this.VSHADER_SOURCE);
            this.FSHADER = createShader(Renderer.gl, Renderer.gl.FRAGMENT_SHADER, this.FSHADER_SOURCE);
            this.program = createProgram(Renderer.gl, this.VSHADER, this.FSHADER);
            Renderer.gl.useProgram(this.program);    

            //attribute aPos
            this.aPosLoc = Renderer.gl.getAttribLocation(this.program, "aPos");
            this.aPosBuffer = Renderer.gl.createBuffer();
            Renderer.gl.bindBuffer(Renderer.gl.ARRAY_BUFFER, this.aPosBuffer);
            Renderer.gl.bufferData(Renderer.gl.ARRAY_BUFFER, new Float32Array(this.vertices), Renderer.gl.STATIC_DRAW);
            Renderer.gl.enableVertexAttribArray(this.aPosLoc);

            //texture
            this.aTexLoc = Renderer.gl.getAttribLocation(this.program, "aTex");
            this.aTexBuffer = Renderer.gl.createBuffer();
            Renderer.gl.bindBuffer(Renderer.gl.ARRAY_BUFFER, this.aTexBuffer);
            Renderer.gl.bufferData(Renderer.gl.ARRAY_BUFFER, new Float32Array(this.uvCoords), Renderer.gl.STATIC_DRAW);
            Renderer.gl.enableVertexAttribArray(this.aTexLoc);

            var texture = Renderer.gl.createTexture();
            Renderer.gl.bindTexture(Renderer.gl.TEXTURE_2D, texture);
            if (this.color != null) {
                Renderer.gl.texImage2D(Renderer.gl.TEXTURE_2D, 0, Renderer.gl.RGBA, 1, 1, 0, Renderer.gl.RGBA, Renderer.gl.UNSIGNED_BYTE, new Uint8Array([this.color.R, this.color.G, 
                    this.color.B, this.color.A]));
            }

            //si se pasa una texture, se carga. En caso contrario se ignora la texture
            if (this.texturePath !== null) {
                this.loadtexture(this.texturePath)
                .then((image) => {
        
                    Renderer.gl.bindTexture(Renderer.gl.TEXTURE_2D, texture);
                    Renderer.gl.texImage2D(Renderer.gl.TEXTURE_2D, 0, Renderer.gl.RGBA, Renderer.gl.RGBA, Renderer.gl.UNSIGNED_BYTE, image);
                    if (Utilidades.dimensionesPotenciaDeDos(image)) {
                        Renderer.gl.generateMipmap(Renderer.gl.TEXTURE_2D);
                    } else {
                        Renderer.gl.texParameteri(Renderer.gl.TEXTURE_2D, Renderer.gl.TEXTURE_WRAP_S, Renderer.gl.CLAMP_TO_EDGE);
                        Renderer.gl.texParameteri(Renderer.gl.TEXTURE_2D, Renderer.gl.TEXTURE_WRAP_T, Renderer.gl.CLAMP_TO_EDGE);
                        Renderer.gl.texParameteri(Renderer.gl.TEXTURE_2D, Renderer.gl.TEXTURE_MIN_FILTER, Renderer.gl.LINEAR);
                        Renderer.gl.generateMipmap(Renderer.gl.TEXTURE_2D);
                    }
                    
        
                });
            }

            this.texture = texture; //guardamos el objeto texture en el objeto
            this.samplerLoc = Renderer.gl.getUniformLocation(this.program, "sampler");
            Renderer.gl.uniform1i(this.samplerLoc, 0);

            //matrices variables
            this.m = Renderer.gl.getUniformLocation(this.program, "m");
            this.v = Renderer.gl.getUniformLocation(this.program, "v");

            //matrices constantes
            this.p = Renderer.gl.getUniformLocation(this.program, "p");
            Renderer.gl.uniformMatrix4fv(this.p, false, Renderer.pMat.getArrayByColumns());
            resolve();
        });
    }

    loadtexture (url) {
        return new Promise(resolve => {
            let image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.src = url;
        });
    }

    update () {
        //this.xAngle += 0.0001;
        //this.yAngle += 1;
        //this.zAngle += 0.0001;
    }

    draw () {

        Renderer.gl.useProgram(this.program);

        //matriz del modelo
        this.mMat.identity();
        this.mMat.scale(this.xFactor, this.yFactor, 1.0);
        this.mMat.rotate(this.xAngle, this.yAngle, this.zAngle);
        this.mMat.translate(this.xPos, this.yPos, this.zPos);

        this.mvMat = RendererRefactor.matrizV.multiplicar(this.mMat);

        Renderer.gl.uniformMatrix4fv(this.mv, false, this.mvMat.getArrayByColumns());
        Renderer.gl.uniformMatrix4fv(this.m, false, this.mMat.getArrayByColumns());

        //atributos
        Renderer.gl.bindBuffer(Renderer.gl.ARRAY_BUFFER, this.aPosBuffer);
        Renderer.gl.vertexAttribPointer(this.aPosLoc, 3, Renderer.gl.FLOAT, false, 0, 0);

        Renderer.gl.bindBuffer(Renderer.gl.ARRAY_BUFFER, this.aTexBuffer);
        Renderer.gl.vertexAttribPointer(this.aTexLoc, 2, Renderer.gl.FLOAT, false, 0, 0);
        Renderer.gl.bindTexture(Renderer.gl.TEXTURE_2D, this.texture);

        //dibujado
        Renderer.gl.drawArrays(Renderer.gl.TRIANGLES, 0, this.vertices.length / 3);
    }

}