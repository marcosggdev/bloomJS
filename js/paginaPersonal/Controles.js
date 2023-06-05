window.addEventListener("load", () => {
     
    //controles borrar asset
    let assets = document.querySelectorAll("#assets .grid .plantilla");
    Array.from(assets).forEach((asset) => {

        let botonBorrar = asset.querySelector(".borrar");
        botonBorrar.addEventListener("click", () => {

            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    let modelo = JSON.parse(this.responseText);
                    
                    let dialog = document.createElement("dialog");
                    let mensaje = document.createElement("p");
                    mensaje.innerHTML = "¿Está seguro de que desea eliminar el asset?<br>";
                    let llaves = Object.keys(modelo);
                    for (let i = 0; i < llaves.length; i++) {
                        mensaje.innerHTML += llaves[i] + ": " + modelo[llaves[i]] + "<br>";
                    }
                    dialog.appendChild(mensaje);
                    
                    let botonera = document.createElement("div");
                    botonera.className = "botonera";
                    dialog.appendChild(botonera);
        
                    let aceptar = document.createElement("button");
                    aceptar.className = "boton-aceptar";
                    aceptar.textContent = "Aceptar";
                    aceptar.addEventListener("click", () => {
                        RendererRefactor.escena.eliminarDibujable(ControlesCanvas.objetoSeleccionado);
                        //la llamada anterior va a actualizar el nodo del menu global
                        dialog.close();
                        dialog.remove();
                    });
                    botonera.appendChild(aceptar);
        
                    let cancelar = document.createElement("button");
                    cancelar.className = "boton-cancelar";
                    cancelar.textContent = "Cancelar";
                    cancelar.addEventListener("click", () => {
                        dialog.close();
                        dialog.remove();
                    });
                    botonera.appendChild(cancelar);
        
                    document.body.appendChild(dialog);
                    dialog.showModal();

                }
            };

            let formData = new FormData();
            formData.append("id", asset.querySelector("#id").value);
            req.open("POST", "/bloomJS/php/backend/scripts/obtenerModeloPorId.php");
            req.send(formData);

        });
    });

});