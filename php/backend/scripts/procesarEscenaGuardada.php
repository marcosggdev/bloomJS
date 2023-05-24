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
if (isset($_SESSION["usuario"]) && isset($_POST["escenaSerializada"]) && isset($_POST["imagen"])) {

    $_POST["escenaSerializada"] = trim(strip_tags($_POST["escenaSerializada"]));
    $_POST["imagen"] = trim(strip_tags($_POST["imagen"]));

    //el .json se guardara en la carpeta del usuario, por lo que es necesario haber iniciado sesion. En caso contrario
    //devolvemos alert indicando que inicie sesion
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);

    //escribir json en carpeta de usuario: /usuarios/usuario/escenas/escena/{imagenPrevisualizacion, json}
    $rutaCarpeta = RAIZ_WEB . $datosUsuario["rutaCarpeta"] . "/escenas";
    if (!is_dir($rutaCarpeta)) {
        mkdir($rutaCarpeta, 0777, true);
    }

    //carpeta de la escena
    $rutaCarpeta .= "/" . generarNombreArchivoUnico("", $rutaCarpeta);
    mkdir($rutaCarpeta, 0777, true);

    //metemos json
    $nombreArchivo = generarNombreArchivoUnico(".json", $rutaCarpeta);
    $rutaArchivo = $rutaCarpeta . "/" . $nombreArchivo;
    $archivoJSON = fopen($rutaArchivo, "w");
    fwrite($archivoJSON, $_POST["escenaSerializada"]);

    //La imagen se recibe con funcion toDataURL, que la codifica en un string donde tenemos:
    //tipo mime, codificacion y datos codificados. Tenemos que procesar todo eso.
    //data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABE...

    //data:image/png
    $cabecera = explode(";", $_POST["imagen"])[0];

    //base64,iVBORw0KGgoAAAANSUhEUgAABE...
    $datos = explode(";", $_POST["imagen"])[1];
    $datos = explode(",", $datos)[1];

    $mime = explode(":", $cabecera)[1];
    $extension = convertirMimeAExtension($mime);
    $nombreImagen = generarNombreArchivoUnico("." . $extension, $rutaCarpeta);
    $rutaImagen = $rutaCarpeta . "/" . $nombreImagen;
    $archivoImagen = fopen($rutaImagen, "w");
    $imagenDecodificada = base64_decode($datos);
    fwrite($archivoImagen, $imagenDecodificada);

    echo "¡La escena se ha guardado con éxito!";
} else {
    echo "¡Ups! Algo ha salido mal. No ha iniciado sesion o ha habido un error con el envío de la serialización de la escena o la imagen " . 
    "de previsualización";
}