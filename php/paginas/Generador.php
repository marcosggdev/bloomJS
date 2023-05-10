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
        RAIZ . "js/generador/Submenu.js",
        RAIZ . "js/generador/Herramienta.js",
        RAIZ . "js/generador/ControladorHerramientas.js",
        RAIZ . "js/generador/MenuHerramientas.js",
       
        RAIZ . "js/generador/Lienzo.js",
        RAIZ . "js/generador/Contenedor.js",
        RAIZ . "js/generador/Main.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Generador", "Aquí podrás generar imágenes con patrones para tus páginas");?>
    <?=Vista::imprimirNav(Vista::$entradas, 2);?>
    <?=Vista::imprimirUsuario()?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 2)?>
</div>
<main>
    <div id="frame">
        <div id="guia">
            <h1>Guía de uso</h1>
            <ul id="listaPasos">
                <li>Haga click en cualquier punto del lienzo que desee utilizar como origen
                    <button id="siguiente">Siguiente</button>
                </li>
            </ul>
        </div>
        <div id="lienzo">

        </div>
    </div>
    <div id="patrones">
        <img class="flecha" src="/bloomJS/img/iconos/izquierda.png" alt="Izquierda">
        <img id="patron1" class="patron" src="/bloomJS/img/iconos/github.png" alt="Icono Github">
        <img id="patron1" class="patron" src="/bloomJS/img/iconos/github.png" alt="Icono Github">
        <img id="patron1" class="patron" src="/bloomJS/img/iconos/github.png" alt="Icono Github">
        <img id="patron1" class="patron" src="/bloomJS/img/iconos/github.png" alt="Icono Github">
        <img class="flecha" src="/bloomJS/img/iconos/derecha.png" alt="Izquierda">
    </div>
</main>
<?=Vista::imprimirFooter();?>