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
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 2)?>
</div>
<main>
    <div id="frame">
        <div id="vistaReducida">

        </div>
        <!--<div id="menuHerramientas">
                <div class="celda">
                    <img id="maximizar" class="icono" src="/bloomJS/img/iconos/maximizar.png" alt="Icono maximizar">
                </div>
                <div class="celda">
                    <img id="desplegarSubmenuAnadir" class="icono" src="/bloomJS/img/iconos/anadir.png" alt="Icono añadir">
                </div>
                <ul id="submenuAnadir">
                    <li id="anadirPlantilla">Plantilla</li>
                </ul>
        </div>
-->
    </div>
</main>
<?=Vista::imprimirFooter();?>