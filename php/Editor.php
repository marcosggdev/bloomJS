<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/editor.css",
        RAIZ . "css/animaciones.css"
    ], 
    [
        RAIZ . "js/general/NavDinamico.js",
        RAIZ . "js/editor/Defecto.js",
        RAIZ . "js/webgl/GLSL.js",
        RAIZ . "js/webgl/Color.js",
        RAIZ . "js/webgl/Material.js",
        RAIZ . "js/webgl/Dae.js",
        RAIZ . "js/webgl/Modelo2D.js",
        RAIZ . "js/webgl/Lienzo.js",
        RAIZ . "js/webgl/Grid.js",
        RAIZ . "js/webgl/Utilidades.js",
        RAIZ . "js/webgl/ArcballCamera.js",
        RAIZ . "js/editor/Main.js",
        RAIZ . "js/webgl/matematicas/Matriz4x4.js",
        RAIZ . "js/editor/BotonIcono.js",
        RAIZ . "js/editor/FuncionesIconos.js",
        RAIZ . "js/editor/VentanaCanvas.js",
        RAIZ . "js/webgl/Renderer.js",
        RAIZ . "js/webgl/Modelo3D.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Editor", "Aquí podrás editar el estilo de tus páginas de forma cómoda y rápida");?>
    <?=Vista::imprimirNav(Vista::$entradas, 1);?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 1)?>
</div>
<main>

</main>
<?=Vista::imprimirFooter();?>
