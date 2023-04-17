<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", [RAIZ . "css/general.css", RAIZ . "css/index.css"], []);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Editor", "Aquí podrás editar el estilo de tus páginas de forma cómoda y rápida");?>
    <?=Vista::imprimirNav(Vista::$entradas, 1);?>
    <?=Vista::imprimirFooter();?>
</div>