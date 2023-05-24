<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/Utilidades.php";
session_start();

//recibimos la serializacion de la escena, como un string que escribir en un archivo en formato .json
if (isset($_SESSION["usuario"]) && isset($_POST["escenaSerializada"])) {

    $_POST["escenaSerializada"] = trim(strip_tags($_POST["escenaSerializada"]));
    //el .json se guardara en la carpeta del usuario, por lo que es necesario haber iniciado sesion. En caso contrario
    //devolvemos alert indicando que inicie sesion
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);

    //escribir json en carpeta de usuario
    $rutaCarpeta = RAIZ_WEB . $datosUsuario["rutaCarpeta"] . "/escenas";
    if (!is_dir($rutaCarpeta)) {
        mkdir($rutaCarpeta, 0777, true);
    }
    $nombreArchivo = generarNombreArchivoUnico(".json", $rutaCarpeta);
    $rutaArchivo = $rutaCarpeta . "/" . $nombreArchivo;
    $archivoJSON = fopen($rutaArchivo, "w");
    fwrite($archivoJSON, $_POST["escenaSerializada"]);
    echo "¡La escena se ha guardado con éxito!";
} else {
    echo "¡Ups! Algo ha salido mal. No ha iniciado sesion o ha habido un error al guardar la escena";
}