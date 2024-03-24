import Model2D from '@/js/bloomjs_glib/graphics/Model2D'
import { createShader, createProgram } from '@/js/bloomjs_glib/shaders/ShaderUtility'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer'
import Matrix4x4 from '@/js/bloomjs_glib/maths/Matrix4x4'
import { loadShaders } from '@/js/bloomjs_glib/shaders/ShaderUtility'

export default class Grid extends Model2D {
    
    constructor (selectable = false) {
        //const fsCode = loadShaderCode('/src/js/bloomjs_glib/shaders/grid/grid.fs').split('\n');
        super(0, 0, 0, -90, 0, 0, 100, 100, null, null, null, null);
        this.selectable = selectable;
        this.loaded = false;
        this.loaded = false;
        this.init();
    }

    async init () {

        const shadersPromise = loadShaders('/src/js/bloomjs_glib/shaders/grid', 'grid');

        shadersPromise
        .then((shaders) => {

            const { vsCode, fsCode } = shaders;
            this.VSHADER_SOURCE = vsCode;
            this.FSHADER_SOURCE = fsCode;
    
            //matriz del modelo
            this.mMat = new Matrix4x4();
            this.mMat.identity();
            this.mMat.scale(this.xFactor, this.yFactor, this.zFactor);
            this.mMat.rotate(this.xAngle, this.yAngle, this.zAngle);
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
    
            //uniforms matrices
            this.m = Renderer.gl.getUniformLocation(this.program, "m");
            this.v = Renderer.gl.getUniformLocation(this.program, "v");
            this.p = Renderer.gl.getUniformLocation(this.program, "p");
            Renderer.gl.uniformMatrix4fv(this.p, false, Renderer.pMat.getArrayByColumns());
    
            //inversas
            this.inverseM = Renderer.gl.getUniformLocation(this.program, "inverseM");
            this.inverseV = Renderer.gl.getUniformLocation(this.program, "inverseV");
            this.inverseP = Renderer.gl.getUniformLocation(this.program, "inverseP");
            Renderer.gl.uniformMatrix4fv(this.inverseP, false, Matrix4x4.getInverse(Renderer.pMat).getArrayByColumns());

            this.loaded = true;
        });

    }

    draw () {

        if (this.loaded) {

            Renderer.gl.useProgram(this.program);

            //matriz del modelo
            this.mMat.identity();
            this.mMat.scale(this.xFactor, this.yFactor, 1.0);
            this.mMat.rotate(this.xAngle, this.yAngle, this.zAngle);
            this.mMat.translate(this.xPos, this.yPos, this.zPos);
    
            Renderer.gl.uniformMatrix4fv(this.m, false, this.mMat.getArrayByColumns());
            Renderer.gl.uniformMatrix4fv(this.v, false, Renderer.camera.vMat.getArrayByColumns());
            Renderer.gl.uniformMatrix4fv(this.inverseM, false, Matrix4x4.getInverse(this.mMat).getArrayByColumns());
            Renderer.gl.uniformMatrix4fv(this.inverseV, false, Matrix4x4.getInverse(Renderer.camera.vMat).getArrayByColumns());
    
            //atributos
            Renderer.gl.enableVertexAttribArray(this.aPosLoc);
            Renderer.gl.bindBuffer(Renderer.gl.ARRAY_BUFFER, this.aPosBuffer);
            Renderer.gl.bufferData(Renderer.gl.ARRAY_BUFFER, new Float32Array(this.vertices), Renderer.gl.STATIC_DRAW);
            Renderer.gl.vertexAttribPointer(this.aPosLoc, 3, Renderer.gl.FLOAT, false, 0, 0);
    
            //deshabilitamos cull face para que se vea el plano por ambas caras
            Renderer.gl.disable(Renderer.gl.CULL_FACE);
    
            //dibujado
            Renderer.gl.drawArrays(Renderer.gl.TRIANGLES, 0, this.vertices.length / 3);
    
            //anulamos los cambios despues del dibujo para no afectar al resto
            Renderer.gl.enable(Renderer.gl.CULL_FACE);

        }
        
    }

}