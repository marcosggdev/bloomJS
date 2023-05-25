<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
session_start();

if (isset($_SESSION["usuario"]) && isset($_POST["tipo"]) && isset($_POST["numero"]) && isset($_POST["filas"]) && isset($_POST["columnas"])) {

    //sanitizar
    $_POST["tipo"] = trim(strip_tags($_POST["tipo"]));
    $_POST["numero"] = trim(strip_tags($_POST["numero"]));
    $_POST["filas"] = trim(strip_tags($_POST["filas"]));
    $_POST["columnas"] = trim(strip_tags($_POST["columnas"]));

    //array con las escenas del usuario: array con rutas de /usuario/escenas/
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);
    $datosEscenas = ModeloEscenas::getEscenasPorIdUsuario($usuario->id);

    print_r($datosUsuario);
    print_r($datosEscenas);

    //cada escena
    foreach ($datosEscenas as $datosEscena) {

        $rutaCarpeta = RAIZ_WEB . $datosUsuario["rutaCarpeta"] . "/escenas/" . $datosEscena["ruta"];
        //archivos de escena
        $archivos = scandir($rutaCarpeta);
        for ($i = 0; $i < count($archivos); $i++) {
            if ($archivos[$i] == "." || $archivos[$i] == "..") {
                unset($archivos[$i]);
            }
        }
        $archivos = array_values($archivos);

        //procesamos cada archivo dentro de la carpeta de la escena
        $rutaImagen = "assets/defecto/escenas/defecto.png";
        $rutaJSON = null;

        for ($i = 0; $i < count($archivos); $i++) {

            if (preg_match("/.png$/", $archivos[$i])) {

                $rutaImagen = $rutaCarpeta . "/escenas/" . $datosEscena["ruta"] . "/" . $archivos[$i];
                $rutaImagen = explode(RAIZ_WEB, $rutaImagen)[1];

            } elseif (preg_match("/.json$/", $archivosEscena[$j])) {

                $rutaJSON = $rutaCarpeta . "/escenas/" . $datosEscena["ruta"] . "/" . $archivos[$i];

            }

        }

        $archivoJSON = fopen($rutaJSON, "r");
        $escenaJSON = fread($archivoJSON, filesize($rutaJSON));

        echo "<link rel='stylesheet' href='/bloomJS/vistas/MenuMalla/escenas/Escenas.css'/>";
        echo "<div class='MallaEscenas'>";


?>
        <div class="plantilla escena" style="display:flex;flex-direction:column">
            <h4><?= $datosEscena["nombre"] ?></h4>
            <img src="<?= $rutaImagen ?>" alt="Plantilla de una escena">
            <input id="serializacion" type="hidden" value='<?= $escenaJSON ?>'>
            <input type="hidden" id="id_escena" value="<?= $datosEscena["id"] ?>">
        </div>
<?
    }

    echo "</div>";
    echo "<input class='script' type='hidden' value='/bloomJS/vistas/MenuMalla/escenas/Escenas.js'/>";

}