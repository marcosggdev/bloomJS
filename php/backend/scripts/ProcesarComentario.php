<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloComentarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
session_start();

echo "a";

if (isset($_POST["id_target"]) && isset($_POST["texto"])) {

    if (isset($_SESSION["usuario"])) {
        //comentario identificado
        $usuario = $_SESSION["usuario"];
        ModeloComentarios::insertarComentario($_POST["texto"], (int)$_POST["id_target"], $usuario->id);

    } else {
        //comentario anonimo
        ModeloComentarios::insertarComentario($_POST["texto"], (int)$_POST["id_target"], "2");

    }
}