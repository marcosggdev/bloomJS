<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
session_start();

if (isset($_POST["texto"]) && isset($_SESSION["usuario"])) {
    $usuario = $_SESSION["usuario"];
    //abrir archivo de entrada del usuario y escribirla
    $archivo = fopen(RAIZ_WEB . "usuarios/" . $usuario->nombre . "_" . $usuario->correo . "/entradaPersonal.html", "w");
    echo $_POST["texto"];
    if (!fwrite($archivo, $_POST["texto"])) {
        echo "Hubo un error al actualizar el archivo";
    }
}