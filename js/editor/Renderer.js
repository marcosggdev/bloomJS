class Renderer {
    //pos camara, ancho alto del viewport, array de modelos3D a dibujar, codigoGLSL
    constructor (camaraX, camaraY, camaraZ, ancho, alto) {
        this.camaraX = camaraX;
        this.camaraY = camaraY;
        this.camaraZ = camaraZ;
        this.ancho = ancho;
        this.alto = alto;
        this.iniciar();
    }

    iniciar () {

        //cambiar resolucion a la deseada, pero manteniendo el tamaño en pixeles constante
        gl.viewport(0, 0, this.ancho, this.alto);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);  //limpiar fondo a negro
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.CULL_FACE);    //cull face
        gl.enable(gl.DEPTH_TEST);   
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //invertir verticalmente las texturas

        //crear matriz perspectiva
        this.aspecto = gl.canvas.width / gl.canvas.height;
        this.matrizP = crearMatrizPerspectiva(60.0, this.aspecto, 0.1, 1000.0);

        //matriz vista
        this.matrizV = new Matriz4X4();
        this.matrizV.identidad();
        //this.crearMatrizVista();
        //this.matrizV.rotar(45, 0, 0);
        this.matrizV.trasladar(-this.camaraX, -this.camaraY, -this.camaraZ);
    }

    crearMatrizVista () {
        let d = new Vector4X1([-this.camaraX, -this.camaraY, -this.camaraZ, 1.0]);   //camara en pos camara, mirando al (0,0,0)
        d.normalizar();
        let x2 = d.productoVectorial(new Vector4X1([0, 1, 0]));
        x2.normalizar();
        let y2 = d.productoVectorial(x2);
        y2.normalizar();
        this.matrizV = new Matriz4X4();
        this.matrizV.identidad();
        this.matrizV.cambiarColumna(0, x2.datos);
        this.matrizV.cambiarColumna(1, y2.datos);
        this.matrizV.cambiarColumna(2, d.datos);
    }

    ciclo () {
        this.actualizar();
        this.dibujar();
    }

    actualizar () {
        //actualizar matrizV
        this.matrizV = new Matriz4X4();
        this.matrizV.identidad();
        //this.matrizV.rotar(45, 0, 0);
        this.matrizV.trasladar(-this.camaraX, -this.camaraY, -this.camaraZ);

        this.controles.actualizar();

        for (let i = 0; i < modelos3D.length; i++) {
            modelos3D[i].actualizar();
        }
    }

    dibujar () {
        //gl.clearColor(0.0, 0.0, 0.0, 1.0);  //limpiar fondo
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        //dibujar modelos3D del array del constructor
        for (let i = 0; i < modelos3D.length; i++) {
            modelos3D[i].dibujar();
        }
    }
}

//crea y devuelve la matriz de perspectiva
function crearMatrizPerspectiva (fovy, aspecto, n, f) {
    let q = 1.0 / Math.tan(toRadians(0.5 * fovy));
    let A = q / aspecto;
    let B = (n + f) / (n - f);
    let C = (2.0 * n * f) / (n - f);
    let datos = [
        [A,0,0,0],
        [0,q,0,0],
        [0,0,B,C],
        [0,0,-1.0,0]
    ];
    let matriz = new Matriz4X4(datos);
    return matriz;
}