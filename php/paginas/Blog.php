<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . "/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEntradas.php";
session_start();
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blog</title>
        <link rel="stylesheet" href="/css/general.css">
        <link rel="stylesheet" media="(max-width: 400px)" href="/css/generalMovil.css">
        <link rel="stylesheet" media="(max-width: 400px)" href="/css/blogMovil.css">
        <link rel="stylesheet" media="(max-width: 900px)" href="/css/generalTablet.css">
        <link rel="stylesheet" media="(max-width: 900px)" href="/css/blogTablet.css">
        <link rel="stylesheet" href="/css/generalTablet.css">
<?php
$estilos = [
    RAIZ . "css/animaciones.css",
    RAIZ . "css/blog.css",
    RAIZ . "css/entrada.css",
    RAIZ . "css/comentarios.css",
    RAIZ . "css/cronologia.css",
    RAIZ . "css/neon.css",
    RAIZ . "css/usuario.css"
];
foreach ($estilos as $estilo) {
    echo "<link rel='stylesheet' href='$estilo'/>";
}
$scripts = [
    RAIZ . "js/general/NavDinamico.js",
    RAIZ . "js/blog/Main.js",
    RAIZ . "js/blog/AsideDinamico.js",
    RAIZ . "js/blog/ControladorComentar.js"
];
foreach ($scripts as $script) {
    echo "<script src='$script'></script>";
}
?>
    </head>

<div id="cabecera">
    <?=Vista::imprimirHeader("Blog", "Aquí podrás leer acerca del desarrollo del proyecto");?>
    <?=Vista::imprimirNav(Vista::$entradas, 3);?>
    <?=Vista::imprimirUsuario()?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 3)?>
</div>
<main>
<?php
    //solo imprimir 1
    if (isset($_GET["entrada"])) {
        $datosEntrada = ModeloEntradas::getEntradaPorRuta("blog/" . $_GET["entrada"]);
        VistaBlog::imprimirEntrada($datosEntrada["id"], "/".$datosEntrada["ruta"]);
        //se le resta 1 porque el id autoincremento de BD empieza en 1
        VistaBlog::imprimirAside($_GET["entrada"]);
    } else {
        //imprimir todas
        VistaBlog::imprimirContenido();
    }
?>
</main>
<?=Vista::imprimirFooter();?>