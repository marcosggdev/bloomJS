<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";

if (isset($_POST["tipo"]) && isset($_POST["numero"])) {

    //tipo de la forma: defecto, usuario o comunidad. No tiene que ver con la BD
    switch ($_POST["tipo"]) {
        case "defecto": 
            $modelosRegistros = ModeloModelos::getModelosPorDefecto(); 
            break;
        case "usuario": 
            session_start();
            if (isset($_SESSION["usuario"])) {
                $usuario = $_SESSION["usuario"];
                $modelosRegistros = ModeloModelos::getModelosPorIdAutor($usuario->id); 
            } else {
                $modelosRegistros = [];
            }
            break;
        case "comunidad": 
            $modelosRegistros = ModeloModelos::getModelosComunidad(); 
            break;
    }

    echo "<link rel='stylesheet' href='/bloomJS/vistas/MenuMalla/Modelos.css'/>";
    echo "<div class='mallaModelos'>";
    for ($i = 0; $i < count($modelosRegistros); $i++) {
        $datosAutor = ModeloUsuarios::getUsuario($modelosRegistros[$i]["id_autor"]);
        $nombreAutor = $datosAutor["nombre"];
    ?>    
        <div class="plantilla modelo" style="display:flex;flex-direction:column">
            <h4><?=$modelosRegistros[$i]["nombre"]?></h4>
            <img src="/bloomJS/<?=$modelosRegistros[$i]["previsualizacion"]?>" alt="">
            <p>Autor: <?=$nombreAutor?></p>
            <input type="hidden" id="rutaModelo" value="<?=$modelosRegistros[$i]["rutaModelo"]?>">
            <input type="hidden" id="rutaTextura" value="<?=$modelosRegistros[$i]["rutaTextura"]?>">
        </div>
    <?php
    }
    echo "</div>";
    echo "<input id='script' type='hidden' value='/bloomJS/vistas/MenuMalla/Modelos.js'/>";
}