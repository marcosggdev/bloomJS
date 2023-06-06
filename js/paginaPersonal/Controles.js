window.addEventListener("load", () => {
     
    //controles borrar asset
    let assets = document.querySelectorAll("#assets .grid .plantilla");
    Array.from(assets).forEach((asset) => {

        //boton de borrar asset
        let botonBorrar = asset.querySelector(".borrar");
        botonBorrar.addEventListener("click", () => {

            //pedimos los datos del modelo
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    let modelo = JSON.parse(this.responseText);
                    
                    //creamos dialog para que el usuario esté seguro.
                    let dialog = document.createElement("dialog");
                    let mensaje = document.createElement("p");
                    mensaje.innerHTML = "¿Está seguro de que desea eliminar el asset? Esto hará inútiles las escenas que lo usen " + 
                    "que tenga guardadas en el servidor...<br>";
                    let llaves = Object.keys(modelo);
                    for (let i = 0; i < llaves.length; i++) {
                        mensaje.innerHTML += llaves[i] + ": " + modelo[llaves[i]] + "<br>";
                    }

                    //consultar escenas afectadas: se van a eliminar también en cascada para evitar errores o incorrecciones. Las escenas
                    //afectadas son las que contengan un modelo con el mismo id que el que se va a borrar
                    mensaje.innerHTML += "<br>Escenas afectadas: ";

                    let idsEscenasAfectadas = [];

                    //pedimos las escenas afectadas
                    let req = new XMLHttpRequest();
                    req.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {

                            idsEscenasAfectadas = JSON.parse(this.responseText);
                            //mostramos al usuario info de las escenas afectadas
                            mensaje.innerHTML += idsEscenasAfectadas.toString();
                            dialog.appendChild(mensaje);

                            let botonera = document.createElement("div");
                            botonera.className = "botonera";
                            dialog.appendChild(botonera);

                            //aceptar
                            let aceptar = document.createElement("button");
                            aceptar.className = "boton-aceptar";
                            aceptar.textContent = "Aceptar";
                            aceptar.addEventListener("click", () => {
                                //borramos el modelo de la base de datos, del sistema local del servidor y las escenas afectadas de 
                                //la base de datos y del servidor
                                let req = new XMLHttpRequest();
                                req.onreadystatechange = function () {
                                    if (this.readyState == 4 && this.status == 200) {
                                        dialog.innerHTML = this.responseText;
                                        let cerrar = document.createElement("button");
                                        cerrar.className = "boton-cancelar";
                                        cerrar.textContent = "Cerrar";
                                        cerrar.addEventListener("click", () => {
                                            dialog.close();
                                            dialog.remove();
                                        });
                                        dialog.appendChild(cerrar);
                                    }
                                };
                                let formData = new FormData();
                                formData.append("id", asset.querySelector("#id").value);
                                formData.append("ids_escenas_afectadas", JSON.stringify(idsEscenasAfectadas));
                                req.open("POST", "/bloomJS/php/backend/scripts/eliminarModeloPorId.php");
                                req.send(formData);
                            });
                            botonera.appendChild(aceptar);

                            //cancelar
                            let cancelar = document.createElement("button");
                            cancelar.className = "boton-cancelar";
                            cancelar.textContent = "Cancelar";
                            cancelar.addEventListener("click", () => {
                                //borrar dialog
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
                    req.open("POST", "/bloomJS/php/backend/scripts/obtenerEscenasAfectadas.php");
                    req.send(formData);



                }
            };

            let formData = new FormData();
            formData.append("id", asset.querySelector("#id").value);
            req.open("POST", "/bloomJS/php/backend/scripts/obtenerModeloPorId.php");
            req.send(formData);

        });
    });

    //Controles borrar escena
    let escenas = document.body.querySelectorAll("#escenas .grid .plantilla");
    Array.from(escenas).forEach((escena) => {

        let botonBorrar = escena.querySelector(".borrar");
        botonBorrar.addEventListener("click", () => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    Servidor.mensaje(this.responseText);
                }
            };
            let formData = new FormData();
            formData.append("id", escena.querySelector("#id").value);
            req.open("POST", "/bloomJS/php/backend/scripts/eliminarEscenaPorId.php");
            req.send(formData);
        });

    });

});