<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/servicios/ServicioModelos.php";

if (isset($_SESSION["usuario"]) && isset($_POST["id"]) && isset($_POST["ids_escenas_afectadas"])) {

    $usuario = $_SESSION["usuario"];
    $ids_escenas_afectadas = json_decode($_POST["ids_escenas_afectadas"]);

    if (ModeloModelos::comprobarPertenenciaModelo($usuario->id, $_POST["id"])) {

        if (!ServicioModelos::eliminarModeloPorId($usuario->id, $_POST["id"], $ids_escenas_afectadas)) {
            echo "<p class='servidor error'>Error: hubo un error al eliminar el modelo en el servidor...</p>";
        }

    } else {

        echo "<p class='servidor error'>Error: el usuario no tiene permisos para eliminar el modelo con id: ".$_POST["id"]."</p>";

    }

} else {

    echo "<p class='servidor error'>Error: ¿Ha iniciado sesión?</p>";

}