class GUI {

    static crearListaPestanas (contenedor, nombres, indice) {
        let nodo = document.createElement("ul");
        nodo.className = "ListaPestanas";

        for (let i = 0; i < nombres.length; i++) {
            let li = document.createElement("li");
            li.textContent = nombres[i];
            if (i == indice) {
                li.className = "actual";
            }
            li.id = nombres[i];
            nodo.appendChild(li);
        }

        contenedor.appendChild(nodo);
    }

}