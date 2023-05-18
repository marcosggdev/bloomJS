<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "vistas/Vista.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


<?php
    $imports = [
        RAIZ . "js/editor/Defecto.js",
        RAIZ . "js/webgl/GLSL.js",
        RAIZ . "js/webgl/Color.js",
        RAIZ . "js/webgl/Material.js",
        RAIZ . "js/webgl/Dae.js",
        RAIZ . "js/webgl/Modelo2D.js",
        RAIZ . "js/webgl/Lienzo.js",
        RAIZ . "js/webgl/Grid.js",
        RAIZ . "js/webgl/Utilidades.js",
        RAIZ . "js/editor/ControlesSubirModelo.js",
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
        RAIZ . "js/webgl/Modelo3D.js",
        RAIZ . "js/webgl/PuntoLuz.js",
        RAIZ . "js/webgl/Hitbox.js",
        RAIZ . "js/webgl/RendererRefactor.js",
        RAIZ . "js/webgl/ArcballCamera.js",
        RAIZ . "js/prueba/Main.js",
        RAIZ . "js/webgl/Escena.js"
    ];
    foreach ($imports as $import) {
        echo "<script src='$import'></script>";
    }
?>

<?= Vista::cargarComponentes("js/gui", ["BarraVentana", "InterfazCanvas", "MenuInterfaz", "VentanaCanvas"]); ?>
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