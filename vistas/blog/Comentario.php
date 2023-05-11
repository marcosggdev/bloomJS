<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
session_start();

if (isset($_POST["comentario"])) {

    $comentario = json_decode($_POST["comentario"]);
    $id_autor;

    if (isset($_SESSION["usuario"])) {
        $usuario = $_SESSION["usuario"];
        $id_autor = $usuario->id;
    } else {
        $id_autor = "2";
    }

    $datosComentario = [
        "id" => $comentario->nuevoId,
        "texto" => $comentario->texto,
        "id_target" => $comentario->id_target,
        "id_autor" => $id_autor
    ];
    VistaBlog::imprimirComentario($datosComentario);

}