//mesh, source, triangles,
class Malla{
    constructor (recursos, triangulos) {
        this.recursos = recursos;
        this.triangulos = triangulos;
    }
}

class Recurso {
    constructor (id, datos, stride) {
        this.id = id;
        this.datos = datos;
        this.stride = stride;
    }
}

class Vertices {
    constructor (id, pointer) {
        this.id = id;
        this.pointer = pointer; //pointer es el id del array de source asociado
    }
}

class Triangulos {
    constructor (inputs, indices) {
        this.inputs = inputs;
        this.indices = indices;
    }
}

class Input {
    constructor (semantic, recurso, offset) {
        this.semantic = semantic;
        this.recurso = recurso;
        this.offset = offset;
    }
}

class Nodo {
    constructor (id, nodoPadre, nodosHijos, matrizNodo, sid, tipo) {
        this.id = id;
        this.nodoPadre = nodoPadre;
        this.nodosHijos = nodosHijos;
        this.matrizNodo = matrizNodo;
        this.sid = sid;
        this.tipo = tipo;
    }
}