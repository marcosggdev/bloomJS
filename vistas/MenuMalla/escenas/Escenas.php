<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
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
    $rutaCarpeta = RAIZ_WEB . $datosUsuario["rutaCarpeta"] . "/escenas";
    $escenas = scandir($rutaCarpeta);
    for ($i = 0; $i < count($escenas); $i++) {
        if ($escenas[$i] == "." || $escenas[$i] == "..") {
            unset($escenas[$i]);
        }
    }
    $escenas = array_values($escenas);

    echo "<link rel='stylesheet' href='/bloomJS/vistas/MenuMalla/escenas/Escenas.css'/>";
    echo "<div class='mallaEscenas'>";

    for ($i = 0; $i < count($escenas); $i++) {
        //cada escena tendra 1 imagen en png y 1 json
        $archivosEscena = scandir($rutaCarpeta . "/" . $escenas[$i]);

        $rutaImagen = "assets/defecto/escenas/defecto.png";
        for ($j = 0; $j < count($archivosEscena); $j++) {
            if (preg_match("/.png$/", $archivosEscena[$j])) {
                $nombreImagen = $archivosEscena[$j];
                $rutaImagen = $rutaCarpeta . "/" . $escenas[$i] . "/" . $nombreImagen;
                $rutaImagen = explode(RAIZ_WEB, $rutaImagen)[1];
            }
        }
    ?>    
        <div class="plantilla escena" style="display:flex;flex-direction:column">
            <h4>Escena <?= $i ?></h4>
            <img src="<?= $rutaImagen ?>" alt="Plantilla de una escena">
        </div>
    <?php
    }
    echo "</div>";
    echo "<input class='script' type='hidden' value='/bloomJS/vistas/MenuMalla/escenas/Escenas.js'/>";

}