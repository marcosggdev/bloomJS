<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

session_start();
$_SESSION = [];
setcookie("session_name", "", time() - 42000);
session_destroy();

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css",
        RAIZ . "css/animaciones.css",
        RAIZ . "css/logout.css"
    ], 
    [
        RAIZ . "js/Servidor.js",
    ]);
?>

<div id="cabecera">
    <?=Vista::imprimirHeader("Logout", "");?>
</div>
<main>
    <div class="contenido">
        <p>Has cerrado la sesión con éxito</p>
        <?php
            if (isset($_POST["paginaVolver"])) {
                echo "<a href='".$_POST["paginaVolver"]."'>Volver</a>";
            }
        ?>
        <a href="/bloomJS/index.php">Volver a Inicio</a>
        <a href="/bloomJS/php/paginas/Blog.php">Blog sobre el desarrollo del proyecto</a>
    </div>
    <hr>
    <img src="/bloomJS/img/fondoLogout.png" alt="">
</main>
<?=Vista::imprimirFooter();?>