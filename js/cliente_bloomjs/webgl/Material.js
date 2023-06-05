class Material {
    //datos (numeroDatos) => ns (1), ka (3), ks (3), ke (3), ni (1), d (1)
    /*
        ns = exponente especular
        ka = ambient color.
        kd = diffuse color //omitido cuando hay textura
        ks = specular color
        ke = emissive coeficient (coeficiente para emision de luz)
        ni = optical density. indice de refraccion. 0.001 - 10. 1.5 aprox cristal. menor que 1.0 produce cosas raras
        d = dissolve (transluminiscencia. 1 = opaco)
    */
    constructor (archivoMTL) {
        this.procesarMaterial(archivoMTL);
    }

    procesarMaterial (archivoMTL) {
        let lineas = archivoMTL.split("\r\n");
        lineas.pop(); //elimina map_kd
        lineas.pop(); //elimina illum
        let indiceInicial = 0;
        for (let i = 0; i < lineas.length; i++) {
            if (lineas[i].includes("newmtl")) {
                indiceInicial = i;
            }
        }
        let ns = null;
        let ka = null;
        let kd = null;
        let ks = null;
        let ke = null;
        let ni = null;
        let d = null;
        //por tanto si hay kd usaremos una textura y sino el color de kd para el objeto
        for (let i = indiceInicial + 1; i < lineas.length; i++) {
            let partes = lineas[i].split(" ");
            let indicador = partes[0];
            let numeros = [];
            for (let j = 1; j < partes.length; j++) {
                numeros.push(partes[j]);
            }
            switch (indicador) {
                case "Ns": ns = Number(numeros[0]); break;
                case "Ka": ka = [Number(numeros[0]), Number(numeros[1]), Number(numeros[2])]; break;
                case "Kd": kd = [Number(numeros[0]), Number(numeros[1]), Number(numeros[2])]; break;
                case "Ks": ks = [Number(numeros[0]), Number(numeros[1]), Number(numeros[2])]; break;
                case "Ke": ke = [Number(numeros[0]), Number(numeros[1]), Number(numeros[2])]; break;
                case "Ni": ni = Number(numeros[0]); break;
                case "d": d = Number(numeros[0]); break;
            }
        }
        this.ns = ns;
        this.ka = ka;
        this.kd = kd;
        this.ks = ks;
        this.ke = ke;
        this.ni = ni;
        this.d = d;
    }
}