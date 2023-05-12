<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "php/backend/servicios/ServicioUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
session_start();

$imprimir = false;

//para imprimir la pagina: _get = _session (sesion iniciada), es decir un usuario solo puede ver su propia
//pagina personal
if (isset($_SESSION["usuario"])) {
    $usuario = $_SESSION["usuario"];
    $imprimir = true;
}

if ($imprimir) {
    Vista::imprimirHead("Bloom - JS", 
    [
		RAIZ . "css/general.css", 
		RAIZ . "css/animaciones.css",
        RAIZ . "css/entrada.css",
        RAIZ . "css/comentarios.css",
        RAIZ . "css/carruselHorizontal.css",
        RAIZ . "css/neon.css",
        RAIZ . "css/paginaPersonal.css"
    ], 
    [
		RAIZ . "js/general/AnimacionMostrarIzquierda.js",
        RAIZ . "js/general/AnimacionDinamicaOnScroll.js",
        RAIZ . "js/paginaPersonal/PaginaPersonal.js"
    ]);
?>
    <div id="cabecera">
        <?=Vista::imprimirHeader("Perfil", "Aquí podrás revisar tu perfil");?>
    </div>
    <main>
        <a class="miga boton-neon-purple" href="/bloomJS/index.php">Volver a Inicio</a>
        <?=Vista::imprimirUsuario()?>
        <h1>Entrada personal</h1>
<?php
        //las entradas de un usuario se guardaran en su carpeta, todas empezando por el nombre entrada. Además, la personal
        //tendra el nombre entradaPersonal.html
        $carpetaPersonal = scandir(RAIZ_WEB . "usuarios/" . $usuario->nombre . "_" . $usuario->correo);
        foreach ($carpetaPersonal as $nombreArchivo) {
            if ($nombreArchivo == "entradaPersonal.html") {
                $ruta = RAIZ_WEB . "usuarios/" . $usuario->nombre . "_" . $usuario->correo . "/" . $nombreArchivo;
                $archivo = fopen($ruta, "r");
                $texto = fread($archivo, filesize($ruta));
                echo "<div class='paginaPersonal'>";
                echo $texto;
                echo "</div>";
            }
        }
?>
        <button id="editarPaginaPersonal" class="boton-neon-purple">Editar</button>
        <h1>Configuración</h1>
        <div class="configuracion">
            <div class="campo">
                <p class="nombre">Nombre: </p>
                <div class="valor">
                    <input type="text" value="<?=$usuario->nombre?>" disabled>
                    <button><img src="/bloomJS/img/iconos/editar.png" alt=""></button>
                </div>
            </div>
            <div class="campo">
                <p class="nombre">Correo: </p>
                <div class="valor">
                    <input type="text" value="<?=$usuario->correo?>" disabled>
                    <button><img src="/bloomJS/img/iconos/editar.png" alt=""></button>
                </div>
            </div>
            <div class="campo">
                <p class="nombre">Contraseña: </p>
                <div class="valor">
                    <input type="password" placeholder="Contraseña" disabled>
                    <button><img src="/bloomJS/img/iconos/editar.png" alt=""></button>
                </div>
            </div>
        </div>
        <h1>Assets privados</h1>
        <div class="assetsPrivados">
<?php
            //modelos cuyo autor es el usuario propietario de la pagina personal
            $datosModelos = ModeloModelos::getModelosPorIdAutor($usuario->id);
            foreach ($datosModelos as $datosModelo) {
?>
                <div class="plantilla">
                    <h4><?=$datosModelo["nombre"]?></h4>
                    <img src="/bloomJS/<?=$datosModelo["previsualizacion"]?>" alt="">
                    <p>Autor: <?=$usuario->nombre?></p>
                    <input type="hidden" id="rutaModelo" value="<?=$datosModelo["rutaModelo"]?>">
                    <input type="hidden" id="rutaTextura" value="<?=$datosModelo["rutaTextura"]?>">
                </div>
<?php
            }
?>
        </div>
    </main>
<?php
        Vista::imprimirFooter();
}