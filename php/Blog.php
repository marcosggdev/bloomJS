<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/Generador.css",
        RAIZ . "css/animaciones.css"
    ], 
    [
        RAIZ . "js/general/NavDinamico.js",
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Blog", "Aquí podrás leer acerca del desarrollo del proyecto");?>
    <?=Vista::imprimirNav(Vista::$entradas, 3);?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 3)?>
</div>
<main>
    <?=Vista::imprimirEntradas("/bloomJS/blog")?>
</main>
<?=Vista::imprimirFooter();?>