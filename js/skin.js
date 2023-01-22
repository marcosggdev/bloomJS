class Skin {
    //asociacion entre uniones y vértices
    //elementoXML es el elemento skin del .dae
    constructor (skinXML, esqueleto) {
        this.skinXML = skinXML;
        this.esqueleto = esqueleto;
        this.leerDatosXML(skinXML, esqueleto);
    }

    leerDatosXML (skinXML, esqueleto) {
        /*
        skin
            bind_shape_matrix
            source skin_joints
            source skin_bind_poses
            source skin_weights
            vertex_weights
        */

        //bind shape matrix: tranforma sist ref geometria en sist ref joints.
        let bind_shape_matrix = skinXML.getElementsByTagName("bind_shape_matrix")[0].textContent.split(" ");
        let matrizUnionForma = new Matriz4X4();
        matrizUnionForma.identidad();
        matrizUnionForma.leerArray(bind_shape_matrix);
        this.matrizUnionForma = matrizUnionForma;

        let sources = skinXML.getElementsByTagName("source");

        //source 1: nombres de los huesos
        let sourceHuesos = sources[0];
        this.arrayNombres = sourceHuesos.getElementsByTagName("Name_array")[0].textContent.split(" ");

        //source 2: poses de huesos. Inverse bind matrix trae las coords que estan siendo skinned al sist ref de cada joint
        let sourcePosesUnion = sources[1];
        let arrayPosesUnion = sourcePosesUnion.getElementsByTagName("float_array")[0].textContent.split(" ");
        let matricesPosesUnion = [];
        //importante: la transform aplica sobre 1 vertice. El problema es que hemos definido vertices[] de forma que contiene
        //vertices repetidos (que son el mismo, pero en distinto triangulo)
        for (let i = 0; i < arrayPosesUnion.length/16; i++) {
            let subArray = arrayPosesUnion.slice(16*i, 16*(i+1));
            let matriz = new Matriz4X4();
            matriz.identidad();
            matriz.leerArray(subArray);
            matricesPosesUnion.push(matriz);
        }
        this.matricesPosesUnion = matricesPosesUnion;

        //source 3: pesos sobre vertices
        let sourcePesos = sources[2];
        let arrayPesos = sourcePesos.getElementsByTagName("float_array")[0].textContent.split(" ");
        this.arrayPesos = arrayPesos;

        //vertex weights
        let vertex_weightsXML = skinXML.getElementsByTagName("vertex_weights")[0];
        let vertex_weights = {
            count: Number(vertex_weightsXML.getAttribute("count")),
            vcount: vertex_weightsXML.getElementsByTagName("vcount")[0].textContent.split(" "),
            v: vertex_weightsXML.getElementsByTagName("v")[0].textContent.split(" ")
        }
        this.vertex_weights = vertex_weights;
        //cada float de vcount indica el numero de influencias sobre 1 vertice. el indice de la matriz de influencia viene dado en los datos v.
        //por ejemplo: vcount = 121 indica 1 influencia en primer vertice, 2 en el segundo, 1 en el tercero
        //y entonces v indica: 1 0 2 0 1 0: 1 indice de matriz, 0 indice de influencia, 2 indice de matriz, 0 indice de influencia
        let transformaciones = []; //[[[],[],...],[],...] [0] = vertice 0.

        let leidos = 0;
        for (let i = 0; i < vertex_weights.vcount.length; i++) {
            let numeroInfluencias = Number(vertex_weights.vcount[i]);
            let transformacionesSobreVertice = [];
            for (let j = leidos; j < leidos + numeroInfluencias*2; j+=2) {
                let t = new Matriz4X4();
                t.identidad();
                let joint = esqueleto.buscarJoint("#Armature_" + this.arrayNombres[Number(vertex_weights.v[j])]);
                let invJoint = matricesPosesUnion[vertex_weights.v[j]];
                let peso = arrayPesos[Number(vertex_weights.v[j+1])];
                t = t.multiplicar(invJoint);
                t = t.multiplicar(matrizUnionForma);
                t = t.multiplicar(joint);
                t.multiplicarEscalar(peso);
                transformacionesSobreVertice.push(t);
            }
            leidos += numeroInfluencias * 2;
            transformaciones.push(transformacionesSobreVertice);
        }
        this.transformaciones = transformaciones;
    }

    //id del joint a elegir. transformacion aplicada sobre ese joint en funcion de la animacion
    actualizarTransformaciones (id, transformacion) {
        let transformaciones = [];
        let leidos = 0;
        for (let i = 0; i < this.vertex_weights.vcount.length; i++) {
            let numeroInfluencias = Number(this.vertex_weights.vcount[i]);
            let transformacionesSobreVertice = [];
            for (let j = leidos; j < leidos + numeroInfluencias*2; j+=2) {
                let t = new Matriz4X4();
                t.identidad();
                let jointOriginal = this.esqueleto.buscarJoint(id);
                let joint = transformacion.multiplicar(jointOriginal);
                let invJoint = this.matricesPosesUnion[this.vertex_weights.v[j]];
                let peso = this.arrayPesos[Number(this.vertex_weights.v[j+1])];
                t.multiplicarEscalar(1);
                t = t.multiplicar(joint);
                t = t.multiplicar(invJoint);
                t = t.multiplicar(this.matrizUnionForma);
                transformacionesSobreVertice.push(t);
            }
            leidos += numeroInfluencias * 2;
            transformaciones.push(transformacionesSobreVertice);
        }
        this.transformaciones = transformaciones;
    }
}