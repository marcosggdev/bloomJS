<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/editor.css"
    ], 
    [
        RAIZ . "js/editor/Defecto.js",
        RAIZ . "js/webgl/GLSL.js",
        RAIZ . "js/webgl/Color.js",
        RAIZ . "js/webgl/Modelo2D.js",
        RAIZ . "js/webgl/Lienzo.js",
        RAIZ . "js/editor/Main.js",
        RAIZ . "js/webgl/Utilidades.js",
        RAIZ . "js/webgl/matematicas/Matriz4x4.js",
        RAIZ . "js/editor/BotonIcono.js",
        RAIZ . "js/editor/FuncionesIconos.js",
        RAIZ . "js/editor/VentanaCanvas.js",
        RAIZ . "js/webgl/Renderer.js",
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Editor", "Aquí podrás editar el estilo de tus páginas de forma cómoda y rápida");?>
    <?=Vista::imprimirNav(Vista::$entradas, 1);?>
</div>
<main>

</main>
<?=Vista::imprimirFooter();?>
