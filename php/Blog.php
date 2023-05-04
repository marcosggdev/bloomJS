<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css",
        RAIZ . "css/animaciones.css",
        RAIZ . "css/blog.css"
    ], 
    [
        RAIZ . "js/general/NavDinamico.js",
        RAIZ . "js/blog/AsideDinamico.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Blog", "Aquí podrás leer acerca del desarrollo del proyecto");?>
    <?=Vista::imprimirNav(Vista::$entradas, 3);?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 3)?>
</div>
<main>
<?php
    if (isset($_GET["entrada"])) {
        $archivos = scandir(RAIZ_WEB . "blog");
        for ($i = 0; $i < count($archivos); $i++) {
            if ($archivos[$i] == "." || $archivos[$i] == "..") {
                unset($archivos[$i]);
            }
        }
        $archivos = array_values($archivos);
        $archivo = null;
        for ($i = 0; $i < count($archivos); $i++) {
            if ($archivos[$i] == $_GET["entrada"]) {
                $archivo = $archivos[$i];
            }
        }
        if ($archivo != null) {
            VistaBlog::imprimirEntrada(RAIZ_WEB . "blog/" . $archivo);
            VistaBlog::imprimirAside();
        } else {
            echo "Ha ocurrido un error. La entrada no se ha encontrado";
        }
    } else {
        VistaBlog::imprimirContenido();
    }
?>
</main>
<?=Vista::imprimirFooter();?>