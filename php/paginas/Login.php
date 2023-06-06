<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "php/backend/servicios/ServicioUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
session_start();

$formulario = true;
$incorrecto = false;

if (isset($_POST["nombre"]) && isset($_POST["clave"])) {

    $_POST["nombre"] = trim(strip_tags($_POST["nombre"]));
    $_POST["clave"] = trim(strip_tags($_POST["clave"]));

    $usuario = ServicioUsuarios::comprobarInicioSesion($_POST["nombre"], $_POST["clave"]);
    if ($usuario) {
        $formulario = false;
        $_SESSION["usuario"] = $usuario;
        if (isset($_POST["paginaVolver"])) {
            header("Location:" . $_POST["paginaVolver"]);
        } else {
            header("Location:/bloomJS/index.php");
        }
    } else {
        $incorrecto = true;
    }
}

//cuando formulario es true (inicio incorrecto o por defecto, se imprime)
if ($formulario) {
?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link rel="stylesheet" href="/bloomJS/css/general.css">
        <link rel="stylesheet" href="/bloomJS/css/login.css">
        <link rel="stylesheet" media="(max-width: 400px)" href="/bloomJS/css/loginMoviles.css">
        <link rel="stylesheet" media="(min-width: 401px) and (max-width: 900px)" href="/bloomJS/css/loginTablets.css">
        <link rel="stylesheet" href="/bloomJS/css/formulario.css">
        <script src="/bloomJS/js/Servidor.js"></script>
    </head>
    <main>
        <form action="<?=$_SERVER["PHP_SELF"]?>" method="POST">
            <?php
                if (isset($_POST["paginaVolver"])) {
                    echo "<input type='hidden' name='paginaVolver' value='".$_POST["paginaVolver"]."'>";
                }
            ?>
            <h1>Iniciar sesión...</h1>
            <div class="contenido">
<?php
            if ($incorrecto) {
                echo "<p class='aviso'>El usuario/contraseña son incorrectos. Inténtelo de nuevo</p>";
            }
?>
                <div class="campos">
                    <div class="campo">
                        <label for="nombre">Nombre de usuario:</label>
                        <input name="nombre" type="text" placeholder="Nombre de usuario">
                    </div>
                    <div class="campo">
                        <label for="clave">Contraseña:</label>
                        <input name="clave" type="password" placeholder="Contraseña">
                    </div>
                </div>
                <div class="info">
                    <label>¿No tienes cuenta? <a href="/bloomJS/php/paginas/Registro.php">Regístrate</a></label>
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
<?php
}
?>