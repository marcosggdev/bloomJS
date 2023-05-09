<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css",
        RAIZ . "css/login.css", 
        RAIZ . "css/formulario.css"
    ], 
    []);
?>
<main>
    <form action="<?=$_SERVER["PHP_SELF"]?>" method="POST">
        <h1>Iniciar sesión...</h1>
        <div class="contenido">
            <div class="campos">
                <div class="campo">
                    <label for="nombre">Nombre de usuario:</label>
                    <input type="text" placeholder="Nombre de usuario">
                </div>
                <div class="campo">
                    <label for="clave">Contraseña:</label>
                    <input type="password" placeholder="Contraseña">
                </div>
            </div>
            <div class="botonera">
                <button>Iniciar Sesión</button>
            </div>
        </div>
        <div class="banda">
            <div class="cuadrado"> </div>
            <div class="contenedor">
                <div class="triangulo_abajo_izq"> </div>
                <div class="triangulo_abajo_der"> </div>
            </div>
        </div>
    </form>
</main>