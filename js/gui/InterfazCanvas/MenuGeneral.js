class MenuGeneral {

    constructor (titulo) {
        this.titulo = titulo;
        this.nodo = this.crearNodo(titulo);
    }

    crearNodo (titulo) {
        let nodo = document.createElement("div");
        nodo.className = "MenuGeneral";

        let barraCierre = document.createElement("div");
        barraCierre.className = "BarraCierre";

        let h1 = document.createElement("h1");
        h1.textContent = titulo;
        barraCierre.appendChild(h1);

        let img = document.createElement("img");
        img.src = "/bloomJS/img/iconos/cerrar.png";
        img.addEventListener("click", () => {
            VentanaCanvas.interfazCanvas.eliminarMenu(this.nodo);
        });
        barraCierre.appendChild(img);
        
        nodo.appendChild(barraCierre);

        return nodo;
    }

}