<?php
//display de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/Utilidades.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";

$nombre = $_POST["nombre"];
$descripcion = $_POST["descripcion"];
$archivoDae = $_FILES['archivoDae'];
$textura = $_FILES["textura"];
$previsualizacion = $_FILES["previsualizacion"];

//guardamos los archivos con un nombre nuevo aleatorio y unico (nombre de sistema de archivos)
$extensionDae = "." . convertirMimeAExtension($archivoDae['type']);
$nombreDaeConExtension = generarNombreArchivoUnico($extensionDae, RAIZ_WEB . "assets/subidos/modelos");
$rutaDae = "assets/subidos/modelos/" . $nombreDaeConExtension;
move_uploaded_file($archivoDae['tmp_name'], "/var/www/html/bloomJS/" . $rutaDae);

$extensionTextura = "." . convertirMimeAExtension($textura['type']);
$nombreTexturaConExtension = generarNombreArchivoUnico($extensionTextura, RAIZ_WEB . "assets/subidos/texturas");
$rutaTextura = "assets/subidos/texturas/" . $nombreTexturaConExtension;
move_uploaded_file($textura['tmp_name'], "/var/www/html/bloomJS/" . $rutaTextura);

$extensionPrevisualizacion = "." . convertirMimeAExtension($previsualizacion['type']);
$nombrePrevisualizacionConExtension = generarNombreArchivoUnico($extensionTextura, RAIZ_WEB . "assets/subidos/previsualizacion");
$rutaPrevisualizacion = "assets/subidos/previsualizacion/" . $nombrePrevisualizacionConExtension;
move_uploaded_file($previsualizacion['tmp_name'], "/var/www/html/bloomJS/" . $rutaPrevisualizacion);


//añadimos las referencias a la base de datos

//$nombre, $descripcion, $rutaModelo, $rutaTextura
session_start();

$clase = "servidor informacion";
$texto = "¡El modelo se ha subido correctamente!";
$error = false;

if (isset($_SESSION["usuario"])) {

    //iniciada sesion, insertar con id autor correspondiente
    $usuario = $_SESSION["usuario"];
    if (!ModeloModelos::insertarModelo($nombre, $descripcion, $rutaDae, $rutaTextura, $rutaPrevisualizacion, $usuario->id)) {
        $error .= "Hubo un error en la base de datos al insertar el modelo";
    }

} else {
    //sin iniciar sesion => id_autor = 2 (anonimo)
    if (!ModeloModelos::insertarModelo($nombre, $descripcion, $rutaDae, $rutaTextura, $rutaPrevisualizacion, 2)) {
        $error .= "Hubo un error en la base de datos al insertar el modelo de forma anónima";
    }
}

echo json_encode(["clase" => $clase, "texto" => $texto]);
