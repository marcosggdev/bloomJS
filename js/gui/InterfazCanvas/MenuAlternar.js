/**
 * Menu con opciones en una pestaña que permiten desplegar un submenu u otro, obteniendo diferente contenido
 */
class MenuAlternar extends MenuGeneral {

    constructor (titulo, nombres, submenus) {
        super(titulo);
        this.nombres = nombres;
        this.submenus = submenus;
        this.ampliarNodo(nombres, submenus);
    } 

    ampliarNodo (nombres, submenus) {
    
        let contenedorSubmenus = document.createElement("div");
        contenedorSubmenus.className = "contenedorSubmenus";

        //pestañas
        let ul = document.createElement("ul");
        ul.className = "barraPestanas";
        for (let i = 0; i < submenus.length; i++) {
            let li = document.createElement("li");
            li.id = nombres[i];
            li.textContent = nombres[i];
            if (i == 0) {
                li.classList.add("actual");
            }
            ul.appendChild(li);    
        }
        contenedorSubmenus.appendChild(ul);

        //submenus
        let contenido = document.createElement("div");
        contenido.className = "submenus";

        for (let i = 0; i < submenus.length; i++) {
            submenus[i].nodo.className = "submenu";
            if (i != 0) {
                submenus[i].nodo.classList.add("invisible");
            } else {
                submenus[i].nodo.classList.add("actual");
            }
            submenus[i].nodo.id = nombres[i];
            let botonCierre = submenus[i].nodo.querySelector(".BarraCierre img");
            if (botonCierre != null) {
                botonCierre.remove();
            }
            contenido.appendChild(submenus[i].nodo);
        }

        contenedorSubmenus.appendChild(contenido);
        this.nodo.appendChild(contenedorSubmenus);

        //controles de las pestañas
        //3 pestañas. Cada una id=nombre y submenu.id=nombre tb.
        let pestanas = ul.querySelectorAll("li");
        let submenusDOM = contenido.querySelectorAll(".submenu");

        for (let i = 0; i < pestanas.length; i++) {

            pestanas[i].addEventListener("click", () => {

                if (!pestanas[i].classList.contains("actual")) {
                    let actual = contenedorSubmenus.querySelector(".barraPestanas li.actual");
                    actual.classList.remove("actual");
                    pestanas[i].classList.add("actual");

                    let submenuActual = contenedorSubmenus.querySelector(".submenu:not(.invisible)");
                    submenuActual.classList.add("invisible");
                    submenusDOM[i].classList.remove("invisible");
                }

            });

        }

    }

}