<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "modelos/ModeloComentariosAnonimos.php";

if (isset($_POST["id_target"]) && isset($_POST["texto"])) {
    echo $_POST["id_target"];
    ModeloComentariosAnonimos::insertarComentario($_POST["texto"], (int)$_POST["id_target"]);
}