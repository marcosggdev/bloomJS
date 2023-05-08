<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<?php
define("RAIZ", "/bloomJS/");
$imports =     [
    RAIZ . "js/bloomjs/Utilidades.js",
    RAIZ . "js/bloomjs/matematicas/Matriz2x2.js",
    RAIZ . "js/bloomjs/matematicas/Matriz3x3.js",
    RAIZ . "js/bloomjs/matematicas/Matriz4x4.js",
    RAIZ . "js/bloomjs/matematicas/Quaternion.js",
    RAIZ . "js/bloomjs/matematicas/Vector4x1.js",
    RAIZ . "js/bloomjs/ArcballCamera.js",
    RAIZ . "js/bloomjs/GLSL.js",
    RAIZ . "js/bloomjs/Dae.js",
    RAIZ . "js/bloomjs/Hitbox.js",
    RAIZ . "js/bloomjs/Modelo2D.js",
    RAIZ . "js/bloomjs/Modelo3D.js",
    RAIZ . "js/bloomjs/Color.js",
    RAIZ . "js/bloomjs/Grid.js",
    RAIZ . "js/bloomjs/Renderer.js",
    RAIZ . "js/bloomjs/Main.js",
];
for ($i = 0; $i < count($imports); $i++) {
    echo "<script src='".$imports[$i]."'></script>";
}
?>
</head>
<body>
    
</body>
</html>