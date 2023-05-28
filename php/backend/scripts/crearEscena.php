<?php

if (isset($_POST["titulo"]) && isset($_POST["descripcion"])) {

    
    $id = ModeloEscenas::crearEscena($_POST["titulo"], $_POST["descripcion"], $ruta, $id_autor);

    if ($id) {
        echo "<p class='servidor error'>Hubo un error al crear la escena en la Base de Datos</p>";
    } else {
        echo "<p class='servidor info'>Se ha creado la escena con éxito</p>";
    }

}