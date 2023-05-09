<?php
//display de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "modelos/ModeloModelos.php";
require_once "Utilidades.php";

$nombre = $_POST["nombre"];
$descripcion = $_POST["descripcion"];
$archivoDae = $_FILES['archivoDae'];
$textura = $_FILES["textura"];

//guardamos los archivos con un nombre nuevo aleatorio y unico (nombre de sistema de archivos)
$extensionDae = "." . convertirMimeAExtension($archivoDae['type']);
$extensionTextura = "." . convertirMimeAExtension($textura['type']);
$nombreDaeConExtension = generarNombreArchivoUnico($extensionDae, "assets/subidos/modelos");
$rutaDae = "assets/subidos/modelos/" . $nombreDaeConExtension;
$nombreTexturaConExtension = generarNombreArchivoUnico($extensionTextura, "assets/subidos/texturas");
$rutaTextura = "assets/subidos/texturas/" . $nombreTexturaConExtension;
move_uploaded_file($archivoDae['tmp_name'], "/var/www/html/bloomJS/" . $rutaDae);
move_uploaded_file($textura['tmp_name'], "/var/www/html/bloomJS/" . $rutaTextura);

//añadimos las referencias a la base de datos

//$nombre, $descripcion, $rutaModelo, $rutaTextura
ModeloModelos::insertarModelo($nombre, $descripcion, $rutaDae, $rutaTextura);