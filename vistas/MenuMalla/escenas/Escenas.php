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

if (isset($_SESSION["usuario"]) && isset($_POST["tipo"]) && 
    isset($_POST["numero"]) && isset($_POST["filas"]) && isset($_POST["columnas"])) {
    
    //sanitizar
    $_POST["tipo"] = trim(strip_tags($_POST["tipo"]));
    $_POST["numero"] = trim(strip_tags($_POST["numero"]));
    $_POST["filas"] = trim(strip_tags($_POST["filas"]));
    $_POST["columnas"] = trim(strip_tags($_POST["columnas"]));

    //array con las escenas del usuario: array con rutas de /usuario/escenas/
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);
    $datosEscenas = ModeloEscenas::getEscenasPorIdUsuario($usuario->id);

    echo "<link rel='stylesheet' href='/bloomJS/vistas/MenuMalla/escenas/Escenas.css'/>";
    $estilo = "display: grid;";
    if ($_POST["columnas"] != "null") {
        $estilo .= "grid-template-columns: repeat(".$_POST["columnas"].", 1fr);";
    }
    if ($_POST["filas"] != "null") {
        $estilo .= "grid-template-rows: repeat(".$_POST["filas"].", 1fr);";
    }
    echo "<div class='MallaEscenas' style='$estilo'>";

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

                $rutaImagen = $rutaCarpeta . "/" . $archivos[$i];
                $rutaImagen = explode(RAIZ_WEB, $rutaImagen)[1];
                $rutaImagen = "/bloomJS/" . $rutaImagen;

            } elseif (preg_match("/.json$/", $archivos[$i])) {
                $rutaJSON = $rutaCarpeta . "/" . $archivos[$i];
            }

        }

        $archivoJSON = fopen($rutaJSON, "r");
        if (filesize($rutaJSON) > 0) {
            $escenaJSON = fread($archivoJSON, filesize($rutaJSON));
?>
            <div class="plantilla escena" style="display:flex;flex-direction:column">
                <h4><?= $datosEscena["id"] . " - " . $datosEscena["titulo"] ?></h4>
                <img src="<?= $rutaImagen ?>" alt="Plantilla de una escena">
                <input id="id" type="hidden" value="<?= $datosEscena["id"] ?>">
                <input id="titulo" type="hidden" value="<?= $datosEscena["titulo"] ?>">
                <input id="descripcion" type="hidden" value="<?= $datosEscena["descripcion"] ?>">
                <input id="serializacion" type="hidden" value='<?= $escenaJSON ?>'>
            </div>
<?php
        } else {
?>
            <div class="malla error">
                <h2>¡Ups!</h2>
                <p class="malla error">Hubo un error al cargar la escena... ¿Su serialización se ha corrompido o está vacía?</p>
            </div>
<?php
        }
?>

<?php
    }

    echo "</div>";
    echo "<input id='script' type='hidden' value='/bloomJS/vistas/MenuMalla/escenas/Escenas.js'/>";

} else {
    echo "<p class='servidor error'>Error: algún parámetro necesario para cargar el menú de escenas no está definido</p>";
}