<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEntradas.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloComentarios.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";

class VistaBlog {

    public static function imprimirContenido () {
        //esto ira en el main de la pagina
?>
        <div id="entradas">
            <?=VistaBlog::imprimirEntradas()?>
        </div>
        <?=VistaBlog::imprimirAside()?>
<?php
    }

    public static function imprimirAside ($nombreEntrada = null) {
?>
        <aside id="secundario">
            <h2>Entradas</h2>
            <div class="contenidoAside">   
                <?php
                    $datosEntradas = ModeloEntradas::getEntradas();
                    foreach ($datosEntradas as $datosEntrada) {
                        $rutaBD = $datosEntrada["ruta"];
                        $nombreArchivo = explode("blog/", $rutaBD)[1];
                        $nombre = explode("_", $nombreArchivo)[1];
                        $nombre = explode(".php", $nombre)[0];
                        if ($nombreEntrada != null) {
                            if ("blog/" . $nombreEntrada == $datosEntrada["ruta"]) {
                                echo "<a id='actual'>$nombre</a>";
                            } else {
                                echo "<a href='"."/php/paginas/Blog.php?entrada=".$nombreArchivo."'>$nombre</a>";
                            }
                        } else {
                            echo "<a href='"."/php/paginas/Blog.php?entrada=".$nombreArchivo."'>$nombre</a>";
                        }
                    }
                ?>
            </div>
            <h2>Sobre mí</h2>
            <div class="contenidoAside">
                <a href="https://github.com/marcosggdev">Github</a>
                <a href="http://localhost:30080/php/Blog.php?entrada=1_Introduccion.php">BloomJS</a>
            </div>
            <h2>Instituciones</h2>
            <div class="contenidoAside">
                <a href="https://ibq.es/">IES Bernaldo de Quirós</a>
            </div>
        </aside>
<?php
    }

    public static function imprimirEntradas () {

        //consultar a la BD
        $datosEntradas = ModeloEntradas::getEntradas();

        foreach ($datosEntradas as $datosEntrada) {
            self::imprimirEntrada($datosEntrada["id"], "/".$datosEntrada["ruta"]);
        }
    }

    //la plantilla de entradas tiene div abierto por si se desea introducir algo por codigo desde aqui, por eso las funciones de imprimir entrada
    //imprimiran un cierre de </div>

    //id entrada, ruta absoluta de entrada (no la de la BD que es relativa a la raiz)
    public static function imprimirEntrada ($id, $ruta) {
        ?><div id="<?="entrada_".$id?>" class="entrada"><?php
        //contenido
        include $_SERVER["DOCUMENT_ROOT"] . $ruta;
?>
        <div class="contenedorComentarios">
<?php
        //menu comentarios
        self::imprimirMenuComentar($id);
        //comentarios. id de la entrada es el parametro de la funcion
        $datosComentarios = ModeloComentarios::getComentariosPorIdEntrada($id);
        self::imprimirComentarios($datosComentarios);
?>
        </div></div>
<?php
    }

    public static function imprimirMenuComentar ($id_entrada) {
?>
        <div class="menuComentar">
            <div class="cabecera">
                <?php
                if (isset($_SESSION["usuario"])) {
                    echo "<h2>Publicar un comentario</h2>";
                } else {
                    echo "<h2>Publicar un comentario anónimo</h2>";
                    echo "<a class='boton-neon-verde' href='/php/paginas/Login.php'>Iniciar sesión</a>";
                }
                ?>
            </div>
            <textarea cols="30" rows="10">

            </textarea>
            <input type="hidden" class="id_entrada" value="<?=$id_entrada?>">
            <div class="cajaControles">
                <button class="botonComentarEntrada">Comentar</button>
                <img src="/img/gif/completado.gif" alt="">
            </div>
            <hr>
        </div>
<?php
    }

    //imprime comentario y datos del autor simples, como nombre de usuario, link a su pagina personal publica
    //y su imagen de perfil
    public static function imprimirComentarios ($datosComentarios) {
?>
        <div class="comentarios">
<?php
        foreach ($datosComentarios as $datosComentario) {
            self::imprimirComentario($datosComentario);
        }
?>
        </div>
<?php
    }

    //en el futuro paginar resultados
    public static function imprimirComentario ($datosComentario) {
        //COMENTARIO: id, texto, id_target, id_autor
        //USUARIO: id, correo, nombre, clave, imagenPerfil
        $datosAutor = ModeloUsuarios::getUsuario($datosComentario["id_autor"]);
?>
        <div id="<?=$datosComentario["id"]?>" class="comentario">
            <div class="usuarioMediano">
                <img src="<?="/".$datosAutor["imagenPerfil"]?>" alt="Imagen de perfil">
                <div class="datos">
                    <p><?=$datosAutor["nombre"]?></p>
                </div>
            </div>
            <div class="contenido">
                <p><?=$datosComentario["texto"]?></p>
            </div>
        </div>
<?php
    }

    //carrusel horizontal donde se van presentando previews de las entradas
    public static function imprimirCarruselEntradas () {
        $datosEntradas = ModeloEntradas::getEntradas();
        echo "<div class='carruselHorizontal'>\n";
            foreach ($datosEntradas as $datosEntrada) {
                $nombreEntrada = explode("blog/", $datosEntrada["ruta"])[1];
                echo "" . 
                "   <div class='previewEntrada'>\n" . 
                "       <div class='contenido'>\n";
                            self::imprimirPreviewEntrada($datosEntrada["ruta"]);
                echo "" . 
                "       </div>\n" . 
                "       <div class='control'>\n" . 
                "           <button class='caja-neon' onclick=\"window.location.assign('/php/paginas/Blog.php?entrada=$nombreEntrada')\">Leer más</button>\n" . 
                "       </div>\n" . 
                "   </div>\n";
            }   
        echo "</div>\n";
    }

    //lee una entrada y genera algo para resumirla. En este caso podria ser la imagen del inicio, el titulo y un numero
    //de caracteres del contenido
    public static function imprimirPreviewEntrada ($ruta) {
        $archivo = fopen(RAIZ_WEB . $ruta, "r");
        $contenido = fread($archivo, 200 * 4);
        $contenido .= "...";
        echo $contenido;
    }

}
