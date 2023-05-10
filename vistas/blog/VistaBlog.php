<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEntradas.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloComentariosAnonimos.php";

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
                                echo "<a href='"."/bloomJS/php/paginas/Blog.php?entrada=".$nombreArchivo."'>$nombre</a>";
                            }
                        } else {
                            echo "<a href='"."/bloomJS/php/paginas/Blog.php?entrada=".$nombreArchivo."'>$nombre</a>";
                        }
                    }
                ?>
            </div>
            <h2>Sobre mí</h2>
            <div class="contenidoAside">
                <a href="https://github.com/marcosggdev">Github</a>
                <a href="http://localhost:30080/bloomJS/php/Blog.php?entrada=1_Introduccion.php">BloomJS</a>
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
            self::imprimirEntrada($datosEntrada["id"], "/bloomJS/".$datosEntrada["ruta"]);
        }
    }

    //la plantilla de entradas tiene div abierto por si se desea introducir algo por codigo desde aqui, por eso las funciones de imprimir entrada
    //imprimiran un cierre de </div>

    //id entrada, ruta absoluta de entrada (no la de la BD que es relativa a la raiz)
    public static function imprimirEntrada ($id, $ruta) {
        ?><div id="<?="entrada_".$id?>" class="entrada"><?php
        //contenido
        include $_SERVER["DOCUMENT_ROOT"] . $ruta;
        //menu comentarios
        self::imprimirMenuComentar($id);
        //comentarios. id de la entrada es el parametro de la funcion
        $datosComentarios = ModeloComentariosAnonimos::getComentariosAnonimosPorIdEntrada($id);
        self::imprimirComentarios($datosComentarios);
        ?></div><?php
    }

    public static function imprimirMenuComentar ($id_entrada) {
?>
        <div class="menuComentar">
            <h2>Publicar un comentario anónimo</h2>
            <textarea name="" id="" cols="30" rows="10">

            </textarea>
            <input type="hidden" id="id_entrada" value="<?=$id_entrada?>">
            <div class="cajaControles">
                <button class="botonComentarEntrada">Comentar</button>
                <img src="/bloomJS/img/gif/completado.gif" alt="">
            </div>
        </div>
<?php
    }

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
?>
        <div id="<?=$datosComentario["id"]?>" class="comentario">
            <p><?=$datosComentario["texto"]?></p>
        </div>
<?php
    }

    //carrusel horizontal donde se van presentando previews de las entradas
    public static function imprimirCarruselEntradas () {
        $datosEntradas = ModeloEntradas::getEntradas();
?>
        <div class="carruselHorizontal">
<?php
            foreach ($datosEntradas as $datosEntrada) {
                $nombreEntrada = explode("blog/", $datosEntrada["ruta"])[1];
                echo "<div class='previewEntrada'>";
                echo "<div class='contenido'>";
                self::imprimirPreviewEntrada($datosEntrada["ruta"]);
                echo "</div><div class='control'>";
                ?>
                <button class="neon" onclick="window.location.assign('/bloomJS/php/paginas/Blog.php?entrada=<?=$nombreEntrada?>')">Leer más</button>
                <?php
                echo "</div></div>";
            }
?>
        </div>
<?
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
