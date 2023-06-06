<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
session_start();

$error = false;

if (isset($_SESSION["usuario"]) && isset($_POST["id"])) {
    
    $usuario = $_SESSION["usuario"];

    if (ModeloEscenas::comprobarPropiedadEscena($usuario->id, $_POST["id"])) {

        if (!ModeloEscenas::eliminarEscena($_POST["id"])) {
            $error .= "Ha habido un error al ejecutar la consulta 'DELETE' en la base de datos";
        }

    } else {
        $error .= "La escena seleccionada no pertenece al usuario indicado";
    }

} else {
    $error .= "El usuario no está autenticado en el sistema o el id de la escena no está definido";
}

$clase = "servidor informacion";
$texto = "Escena eliminada con éxito. Recargue la página cuando desee actualizar los cambios";
if ($error !== false) {
    $clase = "servidor error";
    $texto = $error;
}
echo json_encode(["clase" => $clase, "texto" => $texto]);