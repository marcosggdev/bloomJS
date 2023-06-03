class Triangulo {

    constructor (v1, v2, v3) {
        this.crearVertices(v1, v2, v3);
    }

    crearVertices (v1, v2, v3) {

        let verticesInterseccion = [];

        let vectorDirector1 = Vector4X1.restarVectores(v2, v1);
        vectorDirector1.normalizar();
        let vectorDirector2 = Vector4X1.restarVectores(v3, v1);
        vectorDirector2.normalizar();

        let origen = v1;

        //numero de filas y numero de columnas que tendremos en el triangulo. Los puntos de la malla son los que utilizaremos 
        //para interseccion
        let precision = 100;

        //malla dentro de l triangulo dividido en precision partes
        for (let i = 0; i < precision; i++) {
            for (let j = 0; j < precision; j++) {
                //punto de la malla
                let punto = Vector4X1.sumarVectores(
                    Vector4X1.multiplicarVectorPorEscalar(vectorDirector1, i/precision), 
                    Vector4X1.multiplicarVectorPorEscalar(vectorDirector2, j/precision)
                );
                //añadimos a vertices
                for (let k = 0; k < 3; k++) {
                    verticesInterseccion.push(punto.datos[k]);
                }
            }
        }
        this.verticesInterseccion = verticesInterseccion;
    }

}