<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";

class VistaBlog {

    public static function imprimirContenido () {
        //esto ira en el main de la pagina
?>
        <div id="entradas">
            <?=VistaBlog::imprimirEntradas(RAIZ_WEB . "blog")?>
        </div>
        <?=VistaBlog::imprimirAside();?>
<?php
    }

    public static function imprimirAside () {
?>
        <aside id="secundario">
            <h2>Entradas</h2>
            <div class="contenidoAside">   
                <?php
                    $entradas = scandir(RAIZ_WEB . "blog");
                    for ($i = 0; $i < count($entradas); $i++) {
                        if ($entradas[$i] == "." || $entradas[$i] == "..") {
                            unset($entradas[$i]);
                        }
                    }
                    $entradas = array_values($entradas);
                    foreach ($entradas as $entrada) {
                        $nombre = explode("_", $entrada)[1];
                        $nombre = explode(".php", $nombre)[0];
                        echo "<a href='"."/bloomJS/php/Blog.php?entrada=".$entrada."'>$nombre</a>";
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

    public static function imprimirEntradas ($directorio) {
        $rutas = scandir($directorio);

        foreach ($rutas as $ruta) {
            self::imprimirEntrada($directorio . "/" . $ruta);
        }
    }

    //la plantilla de entradas tiene div abierto por si se desea introducir algo por codigo desde aqui, por eso las funciones de imprimir entrada
    //imprimiran un cierre de </div>
    public static function imprimirEntrada ($ruta) {
        if (is_file($ruta)) {
            include $ruta;
            include RAIZ_WEB . "vistas/blog/MenuComentar.php";
            ?></div><?php
        }
    }

}
