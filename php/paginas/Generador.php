<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
session_start();

Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/animaciones.css",
        RAIZ . "css/neon.css",
        RAIZ . "css/general.css", 
        RAIZ . "css/index.css", 
        RAIZ . "css/editor.css",
        RAIZ . "css/animaciones.css",
        RAIZ . "vistas/editor/subirModelo.css",
        RAIZ . "css/neon.css",
        RAIZ . "css/generador.css"
    ], 
    [
        RAIZ . "js/editor/Defecto.js",
        RAIZ . "js/webgl/GLSL.js",
        RAIZ . "js/webgl/Color.js",
        RAIZ . "js/webgl/Material.js",
        RAIZ . "js/webgl/Dae.js",
        RAIZ . "js/webgl/Modelo2D.js",
        RAIZ . "js/generador/Forma.js",
        RAIZ . "js/webgl/Lienzo.js",
        RAIZ . "js/webgl/GridGenerador.js",
        RAIZ . "js/webgl/Utilidades.js",
        RAIZ . "js/webgl/CamaraSimple.js",
        RAIZ . "js/editor/ControlesSubirModelo.js",
        RAIZ . "js/webgl/LineaRecta.js",
        RAIZ . "js/webgl/Triangulo.js",
        RAIZ . "js/webgl/matematicas/Vector4x1.js",
        RAIZ . "js/webgl/matematicas/Matriz2x2.js",
        RAIZ . "js/webgl/matematicas/Matriz3x3.js",
        RAIZ . "js/webgl/matematicas/Matriz4x4.js",
        RAIZ . "js/webgl/matematicas/Quaternion.js",
        RAIZ . "js/generador/BotonBooleano.js",
        RAIZ . "js/generador/tipos/BooleanoDOM.js",
        RAIZ . "js/generador/tipos/ColorDOM.js",
        RAIZ . "js/generador/tipos/NumericoDOM.js",
        RAIZ . "js/editor/GUI.js",
        RAIZ . "js/general/UI.js",
        RAIZ . "js/generador/GUIGenerador.js",
        RAIZ . "js/editor/MenuSeleccion.js",
        RAIZ . "js/editor/BotonIcono.js",
        RAIZ . "js/editor/FuncionesIconos.js",
        RAIZ . "js/editor/Submenu.js",
        RAIZ . "js/editor/Boton.js",
        RAIZ . "js/editor/BarraHerramientas.js",
        RAIZ . "js/editor/VentanaCanvas.js",
        RAIZ . "js/editor/Escena.js",
        RAIZ . "js/webgl/Renderer.js",
        RAIZ . "js/webgl/Modelo3D.js",
        RAIZ . "js/webgl/PuntoLuz.js",
        RAIZ . "js/webgl/Hitbox.js",
        RAIZ . "js/generador/GLSL.js",
        RAIZ . "js/generador/OndaEsferica.js",
        RAIZ . "js/generador/OndasSenoidalesDesfasadas.js",
        RAIZ . "js/generador/Main.js"
    ]);
?>
<div id="cabecera">
    <?=Vista::imprimirHeader("Generador", "Aquí podrás generar imágenes con patrones para tus páginas");?>
    <?=Vista::imprimirNav(Vista::$entradas, 2);?>
    <?=Vista::imprimirUsuario()?>
</div>
<main>
    <div class="ventana">
        <div class="barra">

        </div>
        <div id="lienzo">
            <div id="gui">

            </div>
            <div class="contenedorCanvas">

            </div>
        </div>

    </div>
</main>
<?=Vista::imprimirFooter();?>