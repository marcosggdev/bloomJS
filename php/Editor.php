<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/editor.css",
        RAIZ . "css/animaciones.css",
        RAIZ . "vistas/editor/subirModelo.css"
    ], 
    [
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
        RAIZ . "js/editor/ControlesSubirModelo.js",
        RAIZ . "js/editor/Main.js",
        RAIZ . "js/webgl/LineaRecta.js",
        RAIZ . "js/webgl/Triangulo.js",
        RAIZ . "js/webgl/matematicas/Vector4x1.js",
        RAIZ . "js/webgl/matematicas/Matriz2x2.js",
        RAIZ . "js/webgl/matematicas/Matriz3x3.js",
        RAIZ . "js/webgl/matematicas/Matriz4x4.js",
        RAIZ . "js/webgl/matematicas/Quaternion.js",
        RAIZ . "js/editor/BotonBooleano.js",
        RAIZ . "js/editor/GUI.js",
        RAIZ . "js/editor/MenuSeleccion.js",
        RAIZ . "js/editor/BotonIcono.js",
        RAIZ . "js/editor/FuncionesIconos.js",
        RAIZ . "js/editor/Submenu.js",
        RAIZ . "js/editor/Boton.js",
        RAIZ . "js/editor/BarraHerramientas.js",
        RAIZ . "js/editor/VentanaCanvas.js",
        RAIZ . "js/webgl/Renderer.js",
        RAIZ . "js/webgl/Modelo3D.js",
        RAIZ . "js/webgl/PuntoLuz.js",
        RAIZ . "js/webgl/Hitbox.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Editor", "Aquí podrás editar el estilo de tus páginas de forma cómoda y rápida");?>
    <?=Vista::imprimirNav(Vista::$entradas, 1);?>
    <?=Vista::imprimirNavEstatico(Vista::$entradas, 1)?>
</div>
<main>

</main>
<!--dialog subir modelo-->
<dialog id="subirModelo">
    <div id="encabezado">
        <div id="barraVentana">
            <img id="cerrarSubirModelo" src="/bloomJS/img/iconos/cerrar.png" alt="">
        </div>
        <h1>Subir Modelo3D</h1>
        <p>Para dibujar tu modelo en la escena, la aplicación necesita que subas al servidor tu modelo en formato .dae y la imagen con la 
                textura</p>
    </div>
    <div id="contenido">
        <p>Es por ello que te pedimos que rellenes este formulario con tus archivos</p>
        <form action="procesarModelo.php" method="POST">
            <div class="campo">
                <label for="modeloDae">Modelo3D en formato .dae:</label>
                <input type="file" name="modeloDae">
            </div>
            <div class="campo">
                <label for="textura">Imagen con la textura del Modelo3D</label>
                <input type="file" name="textura">
            </div>
            <input type="button" value="Subir">
        </form>
    </div>
</dialog>
<?=Vista::imprimirFooter();?>
