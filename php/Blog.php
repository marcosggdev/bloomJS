<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "modelos/ModeloEntradas.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css",
        RAIZ . "css/animaciones.css",
        RAIZ . "css/blog.css"
    ], 
    [
        RAIZ . "js/general/NavDinamico.js",
        RAIZ . "js/blog/AsideDinamico.js",
        RAIZ . "js/blog/ControladorComentar.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Blog", "Aquí podrás leer acerca del desarrollo del proyecto");?>
    <?=Vista::imprimirNav(Vista::$entradas, 3);?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 3)?>
</div>
<main>
<?php
    //solo imprimir 1
    if (isset($_GET["entrada"])) {
        $datosEntrada = ModeloEntradas::getEntradaPorRuta("blog/" . $_GET["entrada"]);
        VistaBlog::imprimirEntrada($datosEntrada["id"], "/bloomJS/".$datosEntrada["ruta"]);
        VistaBlog::imprimirAside();
    } else {
        //imprimir todas
        VistaBlog::imprimirContenido();
    }
?>
</main>
<?=Vista::imprimirFooter();?>