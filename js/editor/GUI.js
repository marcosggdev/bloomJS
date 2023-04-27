class GUI {

    static anadirNombreValor (contenedor, nombre, valor) {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        let p = document.createElement("p");
        p.textContent = nombre;

        nodo.appendChild(p);

        let input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        input.disabled = true;

        nodo.appendChild(input);

        contenedor.appendChild(nodo);
    }

    static anadirNombreValorEditable (contenedor, modelo, nombre, valor, atributo, tipo = "number") {
        let nodo = document.createElement("div");
        nodo.className = "nombreValor";

        nodo.textContent = nombre;

        let input = document.createElement("input");
        input.type = tipo;
        input.value = valor;
        
        input.addEventListener("change", () => {
            switch (atributo) {
                case "posX":
                case "posY":
                case "posZ":
                    modelo.mover(atributo, input.value); break;
                case "anguloX":
                case "anguloY":
                case "anguloZ":
                    modelo.rotar(atributo, input.value); break;
            }
        });

        nodo.appendChild(input);

        contenedor.appendChild(nodo);
    }

    static anadirLineaNombresValores (contenedor, nombres, valores, clase) {
        let nodo = document.createElement("div");
        nodo.className = clase;

        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValor(nodo, nombres[i], valores[i]);
        }

        contenedor.appendChild(nodo);
    }

    static anadirLineaNombresValoresEditables (contenedor, modelo, nombres, valores, atributos, clase, tipo = "number") {
        let nodo = document.createElement("div");
        nodo.className = clase;

        for (let i = 0; i < nombres.length; i++) {
            GUI.anadirNombreValorEditable(nodo, modelo, nombres[i], valores[i], atributos[i], tipo);
        }

        contenedor.appendChild(nodo);
    }

}