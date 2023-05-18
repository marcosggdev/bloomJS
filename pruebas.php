<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


<?php
    $imports =     [
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
        RAIZ . "js/webgl/Hitbox.js"
    ];
    foreach ($imports as $import) {
        echo "<script src='$import'></script>";
    }
?>

<link rel="stylesheet" href="js/gui/MenuInterfaz/MenuInterfaz.css">
    <script src="js/gui/MenuInterfaz/BotonInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/MenuInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/SubmenuInterfaz.js"></script>
    <link rel="stylesheet" href="js/gui/BarraVentana/BarraVentana.css">
    <script src="js/gui/BarraVentana/BotonImagen.js"></script>
    <script src="js/gui/BarraVentana/BarraVentana.js"></script>
    <script src="js/gui/VentanaCanvas/VentanaCanvas.js"></script>
    <script src="js/gui/InterfazCanvas/InterfazCanvas.js"></script>
    <script src="js/gui/VentanaCanvas/Canvas.js"></script>

    <script src="js/webgl/RendererRefactor.js"></script>
    <script src="js/webgl/ArcballCamera.js"></script>
    <script src="js/prueba/Main.js"></script>
    <link rel="stylesheet" href="js/gui/VentanaCanvas/Canvas.css">
    <script src="js/webgl/Escena.js"></script>
    <link rel="stylesheet" href="js/gui/InterfazCanvas/InterfazCanvas.css">
    <script src="js/gui/VentanaCanvas/ControlesCanvas.js"></script>
</head>
<body>

</body>
</html>