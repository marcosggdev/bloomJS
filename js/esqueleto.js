//los nodos son las uniones entre 2 huesos. se pueden pensar como articulaciones. Tienen un unico padre y 0, 1 o mas hijos
//es una estructura de datos recursiva
class Esqueleto {
    //uniones y la relacion jerarquica entre ellos
    constructor (library_visual_sceneXML) {
        this.library_visual_sceneXML = library_visual_sceneXML;
        this.nodos = [];
        this.generarArbolNodos(null);
    }

    generarArbolNodos (padre) {
        let nodoActual = padre;
        if (padre == null) {
            this.generarNodoRaiz();
            this.generarArbolNodos(this.nodoRaizXML);
        } else {
            let actuales = padre.nodosHijos;
            for (let i = 0; i < actuales.length; i++) {

                let arrayMatriz = actuales[i].getElementsByTagName("matrix")[0].textContent.split(" ");
                let matriz = new Matriz4X4();
                matriz.identidad();
                matriz.leerArray(arrayMatriz);
                matriz = padre.matrizNodo.multiplicar(matriz);

                let nodosHijosXML = [];
                let hijos = actuales[i].children;
                for (let i = 0; i < hijos.length; i++) {
                    if (hijos[i].tagName == "node") {
                            nodosHijosXML.push(hijos[i]);
                    }
                }
        
                actuales[i].padre = padre;
                actuales[i].matrizNodo = matriz;
                actuales[i].nodosHijos = nodosHijosXML;
                this.nodos.push(actuales[i]);
                this.generarArbolNodos(actuales[i]);
            }
        }
    }

    generarNodoRaiz () {
        //obtener id nodo padre
        let idNodoPadre = this.library_visual_sceneXML.getElementsByTagName("skeleton")[0].textContent;
        idNodoPadre = idNodoPadre.slice(1);

        let nodosXML = this.library_visual_sceneXML.getElementsByTagName("node");
        let nodoRaizXML = null;

        for (let i = 0; i < nodosXML.length; i++) {
            if (nodosXML[i].getAttribute("id") == idNodoPadre) {
                    nodoRaizXML = nodosXML[i];
            }
        }

        let nodosHijosXML = [];
        let hijos = nodoRaizXML.children;
        for (let i = 0; i < hijos.length; i++) {
            if (hijos[i].tagName == "node") {
                    nodosHijosXML.push(hijos[i]);
            }
        }

        let arrayMatriz = nodoRaizXML.getElementsByTagName("matrix")[0].textContent.split(" ");
        let matriz = new Matriz4X4();
        matriz.identidad();
        matriz.leerArray(arrayMatriz);

        nodoRaizXML.padre = null;
        nodoRaizXML.matrizNodo = matriz;
        nodoRaizXML.nodosHijos = nodosHijosXML;

        this.nodoRaizXML = nodoRaizXML;
        this.nodos.push(nodoRaizXML);
    }

    buscarJoint (id) {
        for (let i = 0; i < this.nodos.length; i++) {
            if (this.nodos[i].getAttribute("id") == id.slice(1)) {
                return this.nodos[i].matrizNodo;
            }
        }
        return null;
    }

    setJoint (id, transformacion) {
        for (let i = 0; i < this.nodos.length; i++) {
            if (this.nodos[i].getAttribute("id") == id.slice(1)) {
                this.nodos[i].matrizNodo = transformacion;
            }
        }
        return null;
    }
}