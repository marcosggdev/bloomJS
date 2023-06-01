<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "vistas/Vista.php";
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor</title>

    <?= Vista::cargarComponentes("/bloomJS/js/gui", ["BarraVentana", "VentanaCanvas"]); ?>

    <?= Vista::imprimirEstilos([
        RAIZ . "css/general.css", 
        RAIZ . "css/animaciones.css",
        RAIZ . "css/neon.css",
        RAIZ . "css/botones.css",
        RAIZ . "css/servidor.css",
        RAIZ . "css/editor.css"
    ]); ?>

<?= Vista::importarRecursos([
        //MENU INTERFAZ
        RAIZ . "js/gui/MenuInterfaz/BotonInterfaz.js",
        RAIZ . "js/gui/MenuInterfaz/MenuInterfaz.js",
        RAIZ . "js/gui/MenuInterfaz/SubmenuInterfaz.js",
        RAIZ . "js/gui/MenuInterfaz/SubmenuEscena.js",
        RAIZ . "js/gui/MenuInterfaz/MenuInterfaz.css"
]) ?>

<?= Vista::importarRecursos([
        //MENUS DE LA INTERFAZ CANVAS (DE USUARIO) 
        RAIZ . "js/gui/InterfazCanvas/InterfazCanvas.css",
        RAIZ . "js/gui/InterfazCanvas/InterfazCanvas.js",
        RAIZ . "js/gui/InterfazCanvas/MenuGeneral.js",
        RAIZ . "js/gui/InterfazCanvas/MenuAlternar.js",
        RAIZ . "js/gui/InterfazCanvas/MenuDisplay.js",
        RAIZ . "js/gui/InterfazCanvas/Menu.js",
        RAIZ . "js/gui/InterfazCanvas/MenuEdicion.js",
        RAIZ . "js/gui/InterfazCanvas/MenuMalla.js",
        RAIZ . "js/gui/InterfazCanvas/MenuSeleccion.js"
]) ?>

    <?= Vista::imprimirScripts([
        RAIZ . "js/webgl/GLSL.js",
        RAIZ . "js/webgl/Color.js",
        RAIZ . "js/webgl/Material.js",
        RAIZ . "js/webgl/Dae.js",
        RAIZ . "js/webgl/Modelo2D.js",
        RAIZ . "js/webgl/Lienzo.js",
        RAIZ . "js/webgl/Grid.js",
        RAIZ . "js/webgl/Utilidades.js",
        RAIZ . "js/webgl/LineaRecta.js",
        RAIZ . "js/webgl/Triangulo.js",
        RAIZ . "js/webgl/matematicas/Vector4x1.js",
        RAIZ . "js/webgl/matematicas/Matriz2x2.js",
        RAIZ . "js/webgl/matematicas/Matriz3x3.js",
        RAIZ . "js/webgl/matematicas/Matriz4x4.js",
        RAIZ . "js/webgl/matematicas/Quaternion.js",
        RAIZ . "js/gui/GUI.js",
        RAIZ . "js/webgl/supervalores/Supervalor.js",
        RAIZ . "js/webgl/supervalores/Numerico.js",
        RAIZ . "js/webgl/supervalores/Texto.js",
        RAIZ . "js/webgl/Modelo3D.js",
        RAIZ . "js/webgl/PuntoLuz.js",
        RAIZ . "js/webgl/Hitbox.js",
        RAIZ . "js/webgl/RendererRefactor.js",
        RAIZ . "js/webgl/ArcballCamera.js",
        RAIZ . "js/webgl/Grupo.js",
        RAIZ . "js/webgl/Escena.js",
        RAIZ . "js/editor/Main.js"
    ]) ?>

</head>
<body>
    <div id="cabecera">
        <?=Vista::imprimirHeader("Editor", "Aquí podrás generar una escena en 3D para tu página");?>
        <?=Vista::imprimirNav(Vista::$entradas, 1);?>
        <?=Vista::imprimirUsuario()?>
        <?=Vista::imprimirNavEstatico(Vista::$entradas, 1)?>
    </div>
    <main>
        
    </main>
    <?=Vista::imprimirFooter();?>
</body>
</html>