class AsideDinamico {

    static iniciar (nodo) {
        AsideDinamico.nodo = nodo;
        window.addEventListener("resize", () => {
            let ancho = window.innerWidth;

            if (ancho < 400) {
                AsideDinamico.controlesMovil();
            } else if (ancho < 900) {
                AsideDinamico.controlesTablet();
            } else {    
                AsideDinamico.controlesPC();
            }

        });
    }

    static controlesMovil () {
        let botonDespliegue = document.body.querySelector("#desplegarMenuLateral");
        if (botonDespliegue != null) {
            botonDespliegue.remove();
        }
        AsideDinamico.crearBotonDespliegue();
    }

    //desplegable
    static controlesTablet () {
        let botonDespliegue = document.body.querySelector("#desplegarMenuLateral");
        if (botonDespliegue != null) {
            botonDespliegue.remove();
        }
        AsideDinamico.crearBotonDespliegue();
    }

    //desplegable
    static crearBotonDespliegue () {

        let aside = AsideDinamico.nodo;

        let boton = document.createElement("img");
        boton.id = "desplegarMenuLateral";
        
        boton.src = "/bloomJS/img/iconos/desplegar.png";
        boton.addEventListener("click", () => {
            if (boton.classList.contains("desplegado")) {
                boton.classList.remove("desplegado");
                aside.classList.remove("desplegado");        
            } else {
                boton.classList.add("desplegado");
                aside.classList.add("desplegado");
            }
        });

        let barraUsuarioIconos = document.body.querySelector(".usuarioGrande .iconos");
        barraUsuarioIconos.appendChild(boton);
        
    }

    //fixed o no segun scroll
    static controlesPC () {

        let botonDespliegue = document.body.querySelector("#desplegarMenuLateral");
        if (botonDespliegue != null) {
            botonDespliegue.remove();
        }

        let aside = this.nodo;
        aside.className = "arriba";
        var scrollTopPrevio = window.scrollY;
    
        window.addEventListener("scroll", () => {
            let direccion = window.scrollY - scrollTopPrevio; //> 0 => abajo, < 0 => arriba
            scrollTopPrevio = window.scrollY;
    
            let aside = document.querySelector("aside");
    
            if (aside.classList.contains("fijo")) {
    
                //aside es fijo. Si movemos arriba, deja de serlo cuando aparece el bottom de cabecera => arriba, y si bajamos deja de serlo
                //cuando aparece top del footer => abajo
                let cabecera = document.getElementById("cabecera");
                let bottomCabecera = cabecera.getBoundingClientRect().bottom;
                let footer = document.querySelector("footer");
                let topFooter = footer.getBoundingClientRect().top;
    
                if (direccion > 0) {
                    //abajo
                    if (topFooter - window.innerHeight < 0) {
                        aside.classList.remove("fijo");
                        aside.classList.add("abajo");
                    }
                } else if (direccion < 0) {
                    //arriba
                    if (bottomCabecera > 0) {
                        aside.classList.remove("fijo");
                        aside.classList.add("arriba");
                    }
                }
    
            } else {
    
                if (aside.classList.contains("abajo")) {
                    //se pone fixed cuando top debajo de window
                    let topAside = aside.getBoundingClientRect().top;
                    if (topAside - window.innerHeight > 0) {
                        aside.classList.remove("abajo");
                        aside.classList.add("fijo");
                    }
    
                } else if (aside.classList.contains("arriba")) {
                    //se pone fixed cuando bottom encima de window
                    let bottomAside = aside.getBoundingClientRect().bottom;
                    if (bottomAside < 0) {
                        aside.classList.remove("arriba");
                        aside.classList.add("fijo");
                    }
                }
    
            }
        });
    }

}