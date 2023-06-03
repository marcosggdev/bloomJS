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
        <title>Generador</title>

        <?= Vista::cargarComponentes("/bloomJS/js/gui", ["BarraVentana"]); ?>

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
            RAIZ . "js/gui/VentanaCanvas/Canvas.js",
            //RAIZ . "js/gui/VentanaCanvas/ControlesCanvas.js",
            RAIZ . "js/gui/VentanaCanvas/VentanaCanvas.js",
            RAIZ . "js/gui/VentanaCanvas/Canvas.css"
    ]) ?>

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
            RAIZ . "js/gui/InterfazCanvas/Menu.js",
            RAIZ . "js/gui/InterfazCanvas/MenuEdicion.js",
            RAIZ . "js/gui/InterfazCanvas/MenuDisplay.js",
            RAIZ . "js/gui/InterfazCanvas/MenuMalla.js",
            RAIZ . "js/gui/InterfazCanvas/MenuSeleccion.js",
            RAIZ . "js/gui/InterfazCanvas/MenuObjetos.js"
    ]) ?>

        <?= Vista::imprimirScripts([
            RAIZ . "js/webgl/GLSL.js",
            RAIZ . "js/generador/GLSL.js",
            RAIZ . "js/webgl/Color.js",
            RAIZ . "js/webgl/Material.js",
            RAIZ . "js/webgl/Dae.js",
            RAIZ . "js/webgl/Modelo2D.js",
            RAIZ . "js/webgl/Lienzo.js",
            RAIZ . "js/webgl/GridGenerador.js",
            RAIZ . "js/webgl/Utilidades.js",
            RAIZ . "js/webgl/LineaRecta.js",
            RAIZ . "js/webgl/Triangulo.js",
            RAIZ . "js/webgl/matematicas/Vector4x1.js",
            RAIZ . "js/webgl/matematicas/Matriz2x2.js",
            RAIZ . "js/webgl/matematicas/Matriz3x3.js",
            RAIZ . "js/webgl/matematicas/Matriz4x4.js",
            RAIZ . "js/webgl/matematicas/Quaternion.js",
            RAIZ . "js/gui/GUI.js",
            RAIZ . "js/webgl/Modelo3D.js",
            RAIZ . "js/webgl/PuntoLuz.js",
            RAIZ . "js/webgl/Hitbox.js",
            RAIZ . "js/webgl/RendererRefactor.js",
            RAIZ . "js/webgl/CamaraSimple.js",
            RAIZ . "js/webgl/Grupo.js",
            RAIZ . "js/webgl/Escena.js",

            RAIZ . "js/webgl/supervalores/Supervalor.js",
            RAIZ . "js/webgl/supervalores/Numerico.js",
            RAIZ . "js/webgl/supervalores/Texto.js",
            RAIZ . "js/webgl/supervalores/ColorS.js",
            RAIZ . "js/webgl/supervalores/Booleano.js",
            RAIZ . "js/webgl/supervalores/Select.js",
            RAIZ . "js/webgl/supervalores/SelectCompuesto.js",

            RAIZ . "js/generador/Forma.js",
            RAIZ . "js/generador/GrupoFormas.js",
            RAIZ . "js/generador/Preformas.js",
            RAIZ . "js/generador/tipos/BooleanoDOM.js",
            RAIZ . "js/generador/tipos/ColorDOM.js",
            RAIZ . "js/generador/tipos/NumericoDOM.js",
            RAIZ . "js/generador/OndaEsferica.js",
            RAIZ . "js/generador/OndaSenoidal.js",
            RAIZ . "js/generador/OndasSenoidales.js",

            RAIZ . "js/webgl/EscenaGenerador.js",
            RAIZ . "js/generador/Main.js"
        ]) ?>

    </head>
    <body>
    <div id="cabecera">
        <?=Vista::imprimirHeader("Generador", "Aquí podrás generar imágenes con patrones para tus páginas");?>
        <?=Vista::imprimirNav(Vista::$entradas, 2);?>
        <?=Vista::imprimirUsuario()?>
    </div>
    <main>

    </main>
    <?=Vista::imprimirFooter();?>
    </body>
</html>