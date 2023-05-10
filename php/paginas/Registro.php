<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "servicios/ServicioUsuarios.php";
require_once RAIZ_WEB . "php/Utilidades.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
session_start();

$formulario = true;
$incorrecto = false;

if (isset($_POST["correo"]) && isset($_POST["nombre"]) && isset($_POST["clave"]) && isset($_FILES["imagenPerfil"])) {

    //datos para un registro
    $_POST["correo"] = trim(strip_tags($_POST["correo"]));
    $_POST["nombre"] = trim(strip_tags($_POST["nombre"]));
    $_POST["clave"] = trim(strip_tags($_POST["clave"]));
    
    //generamos nombre unico en carpeta imagenesPerfil
    $extensionImagenPerfil = convertirMimeAExtension($_FILES["imagenPerfil"]["type"]);
    $nombreImagenPerfil = generarNombreArchivoUnico("." . $extensionImagenPerfil, RAIZ_WEB . "assets/subidos/imagenesPerfil");
    $rutaImagenPerfil = RAIZ_WEB . "assets/subidos/imagenesPerfil/" . $nombreImagenPerfil;
    //BD usa raiz como partida de rutas
    $rutaRaizImagenPerfil = "assets/subidos/imagenesPerfil/" . $nombreImagenPerfil;
    move_uploaded_file($_FILES["imagenPerfil"]["tmp_name"], $rutaImagenPerfil);

    //usuario o false
    $usuario = ServicioUsuarios::crearUsuario($_POST["correo"], $_POST["nombre"], $_POST["clave"], $rutaRaizImagenPerfil);
    
    if ($usuario != false) {
        //usuario creado
        $formulario = false;
        $_SESSION["usuario"] = $usuario;
        header("Location:/bloomJS/index.php");
    } else {
        //no se ha podido crear
        $incorrecto = true;
        $error = $usuario;
    }
}

//cuando formulario es true (inicio incorrecto o por defecto, se imprime)
if ($formulario) {
    Vista::imprimirHead("Bloom - JS", 
    [
        RAIZ . "css/general.css",
        RAIZ . "css/login.css", 
        RAIZ . "css/formulario.css"
    ], 
    []);
?>
    <main>
        <form enctype="multipart/form-data" action="<?=$_SERVER["PHP_SELF"]?>" method="POST">
            <h1>Registrarse...</h1>
            <div class="contenido">
<?php
            if ($incorrecto) {
?>
                <p class='aviso'><?=$error?></p>
<?php
            }
?>
                <div class="campos">
                    <div class="campo">
                        <label for="nombre">Correo electrónico:</label>
                        <input name="correo" type="text" placeholder="Correo electrónico">
                    </div>
                    <div class="campo">
                        <label for="nombre">Nombre de usuario:</label>
                        <input name="nombre" type="text" placeholder="Nombre de usuario">
                    </div>
                    <div class="campo">
                        <label for="clave">Contraseña:</label>
                        <input name="clave" type="password" placeholder="Contraseña">
                    </div>
                    <div class="campo">
                        <label for="nombre">Imagen de perfil:</label>
                        <input name="imagenPerfil" type="file" accept=".jpg, .jpeg, .png">
                    </div>
                </div>
                <div class="info">
                    
                </div>
                <div class="botonera">
                    <button>Registrarse</button>
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
<?php
}
?>