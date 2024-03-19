class UI {
    //clase para crear rapidamente elementos comunes de interfaz
    
    static crearMenuDesplegableIzquierda (contenedor, titulo) {

        let menu = document.createElement("div");
        menu.className = "menu-desplegable-izquierda";

        GUI.crearBarraTitulo(menu, titulo);

        //desplegar / contraer. Booleano: desplegado?. No=false, si=true;
        let botonBooleano = new BotonBooleano(
            false,
            UI.desplegarMenuDesplegableIzquierda,
            menu, 
            UI.contraerMenuDesplegableIzquierda,
            menu,
            "/img/iconos/izquierda.png", 
            "/img/iconos/derecha.png");
        
        menu.appendChild(botonBooleano.nodo);
        contenedor.appendChild(menu);
    }

    static desplegarMenuDesplegableIzquierda (menu) {
        menu.style.right = "0";
    }

    static contraerMenuDesplegableIzquierda (menu) {
        menu.style.right = "-20%";
    }

    static anadirImagen (contenedor, src) {
        let img = document.createElement("img");
        img.src = src;
        contenedor.appendChild(img);
    }

    static anadirValor (contenedor, valor) {
        let p = document.createElement("p");
        p.textContent = valor;
        contenedor.appendChild(p);
    }

}