/**
 * Menu general
 */
class Menu extends MenuGeneral {

    //titulo y objetos a representar
    constructor (titulo, objetos) {
        this.titulo = titulo;
        this.objetos = objetos;
        this.nodo = this.crearNodo(titulo, objetos);
        this.visible = true;
    }

    crearNodo (titulo, objetos) {
        let nodo = document.createElement("div");
        nodo.className = "Menu";

        let h1 = document.createElement("h1");
        h1.textContent = titulo;
        nodo.appendChild(h1);

        let datosObjetos = document.createElement("div");
        datosObjetos.className = "DatosObjetos";

        for (let i = 0; i < objetos.length; i++) {

            let datosObjeto = document.createElement("div");
            datosObjeto.className = "DatosObjeto";

            let nombres = Object.keys(objetos[i]);
            for (let j = 0; j < nombres.length; j++) {

                let nombreValor = document.createElement("div");
                nombreValor.className = "NombreValor";

                let nombreDOM = document.createElement("p");
                nombreDOM.textContent = nombres[j];
                let valorDOM = document.createElement("input");
                valorDOM.value = objetos[i][nombres[j]];
                
                nombreValor.appendChild(nombreDOM);
                nombreValor.appendChild(valorDOM);
                datosObjeto.appendChild(nombreValor);
            }

            datosObjetos.appendChild(datosObjeto);
        }

        nodo.appendChild(datosObjetos);
        return nodo;
    }

    mostrar () {
        this.visible = true;
    }

    ocultar () {
        this.visible = false;
    }

}