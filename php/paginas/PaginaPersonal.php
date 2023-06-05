<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
require_once RAIZ_WEB . "php/backend/servicios/ServicioUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
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
        RAIZ . "css/paginaPersonal.css",
        RAIZ . "css/usuario.css"
    ], 
    [
		RAIZ . "js/general/AnimacionMostrarIzquierda.js",
        RAIZ . "js/general/AnimacionDinamicaOnScroll.js",
        RAIZ . "js/paginaPersonal/PaginaPersonal.js",
        RAIZ . "js/paginaPersonal/Controles.js"
    ]);
?>
    <div id="cabecera">
        <?=Vista::imprimirHeader("Perfil", "Aquí podrás revisar tu perfil");?>
        <?=Vista::imprimirNav(Vista::$entradas, null)?>
    </div>
    <main>
        <?=Vista::imprimirUsuario()?>
        <section id="descripcionPerfil">
            <h2>Descripción del perfil</h2>
<?php
            //las entradas de un usuario se guardaran en su carpeta, todas empezando por el nombre entrada. Además, la personal
            //tendra el nombre entradaPersonal.html
            $carpetaPersonal = scandir(RAIZ_WEB . "usuarios/" . $usuario->nombre . "_" . $usuario->correo);
            foreach ($carpetaPersonal as $nombreArchivo) {
                if ($nombreArchivo == "entradaPersonal.html") {
                    $ruta = RAIZ_WEB . "usuarios/" . $usuario->nombre . "_" . $usuario->correo . "/" . $nombreArchivo;
                    $archivo = fopen($ruta, "r");
                    if (filesize($ruta) > 0) {
                        $texto = fread($archivo, filesize($ruta));
                    } else {
                        $texto = "<p>¡Ups!<img style='width:15px;display:inline' src='/bloomJS/img/iconos/advertencia.png'/></p> <br>¡Aún no has editado tu página personal! :(";
                    }
                    echo "<div class='paginaPersonal'>";
                    echo $texto;
                    echo "</div>";
                }
            }
?>
            <button id="editarPaginaPersonal" class="boton-neon-purple">Editar</button>
        </section>
        <section id="configuracion">
            <h2>Configuración</h2>
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
        </section>
        <section id="assets">
            <h2>Assets</h2>
            <div class="grid">
<?php
                //modelos cuyo autor es el usuario propietario de la pagina personal
                $datosModelos = ModeloModelos::getModelosPorIdAutor($usuario->id);
                foreach ($datosModelos as $datosModelo) {
?>
                    <div class="plantilla">
                        <div class="cabeceraPlantilla">
                            <h4><?=$datosModelo["nombre"]?></h4>
                            <img class="borrar" src="/bloomJS/img/iconos/borrar.png" alt="">
                        </div>
                        <img src="/bloomJS/<?=$datosModelo["previsualizacion"]?>" alt="">
                        <p>Autor: <?=$usuario->nombre?></p>
                        <input id="id" type="hidden" value="<?= $datosModelo["id"] ?>">
                    </div>
<?php
                }
?>
            </div>
        </section>
        <section id="escenas">
            <h2>Escenas</h2>
            <div class="grid">
<?php
                //modelos cuyo autor es el usuario propietario de la pagina personal
                $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);
                $datosEscenas = ModeloEscenas::getEscenasPorIdUsuario($usuario->id);
                foreach ($datosEscenas as $datosEscena) {

                    $rutaCarpetaImagen = RAIZ_WEB . "/" . $datosUsuario["rutaCarpeta"] . "/escenas/" . $datosEscena["ruta"];
                    $archivos = scandir($rutaCarpetaImagen);
                    $nombre = "";
                    for ($i = 0; $i < count($archivos); $i++) {
                        if (preg_match("/.png$/", $archivos[$i])) {
                            $nombre = $archivos[$i];
                        }
                    }
                    $rutaImagen = explode("/var/www/html", $rutaCarpetaImagen . "/" . $nombre)[1];
?>
                    <div class="plantilla">
                        <div class="cabeceraPlantilla">
                            <h4><?=$datosEscena["titulo"]?></h4>
                            <img class="borrar" src="/bloomJS/img/iconos/borrar.png" alt="">
                        </div>
                        <img src="<?= $rutaImagen ?>" alt="">
                        <p>Autor: <?=$usuario->nombre?></p>
                    </div>
<?php
                }
?>
            </div>
        </section>

    </main>
<?php
        Vista::imprimirFooter();
}