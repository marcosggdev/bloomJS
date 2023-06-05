<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
session_start();

if (isset($_SESSION["usuario"]) && isset($_POST["id"])) {
    $datosModelo = ModeloModelos::getModelo($_POST["id"]);
    $datos = ["Id" => $datosModelo["id"], "Nombre" => $datosModelo["nombre"], "Ruta Modelo" => $datosModelo["rutaModelo"], 
    "Ruta Textura" => $datosModelo["rutaTextura"]];
    echo json_encode($datos);
} else {
    echo "<p class='servidor error'>Hubo un error al obtener el modelo...</p>";
}