<?php
//display de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "Utilidades.php";

$archivoDae = $_FILES['archivoDae'];
$textura = $_FILES["textura"];

print_r($archivoDae);
print_r($textura);

$extensionDae = "." . convertirMimeAExtension($archivoDae['type']);
$extensionTextura = "." . convertirMimeAExtension($textura['type']);

$nombreDaeConExtension = generarNombreArchivoUnico($extensionDae, "assets/subidos/modelos");
$rutaDae = "assets/subidos/modelos/" . $nombreDaeConExtension;

$nombreTexturaConExtension = generarNombreArchivoUnico($extensionTextura, "assets/subidos/texturas");
$rutaTextura = "assets/subidos/texturas/" . $nombreTexturaConExtension;

move_uploaded_file($archivoDae['tmp_name'], "/var/www/html/bloomJS/" . $rutaDae);
move_uploaded_file($textura['tmp_name'], "/var/www/html/bloomJS/" . $rutaTextura);