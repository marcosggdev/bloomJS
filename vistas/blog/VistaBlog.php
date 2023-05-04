<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";

class VistaBlog {

    public static function imprimirContenido () {
        //esto ira en el main de la pagina
?>
        <div id="entradas">
            <?=VistaBlog::imprimirEntradas(RAIZ_WEB . "blog")?>
        </div>
        <aside id="secundario">
            <h2>Buscador</h2>
            <p>Utiliza el buscador para moverte más rápido por el Blog</p>
            <hr>
            <h2>Entradas</h2>
            <hr>
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
            <hr>
            <h2>Sobre mí</h2>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <h2>Instituciones</h2>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <hr>
        </aside>
<?php
    }

    public static function imprimirAside () {
?>
        <aside id="secundario">
            <h2>Buscador</h2>
            <p>Utiliza el buscador para moverte más rápido por el Blog</p>
            <hr>
            <h2>Entradas</h2>
            <hr>
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
            <hr>
            <h2>Sobre mí</h2>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <h2>Instituciones</h2>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <a href="">Enlace</a>
            <hr>
        </aside>
<?php
    }

    public static function imprimirEntradas ($directorio) {
        $rutas = scandir($directorio);

        foreach ($rutas as $ruta) {
            self::imprimirEntrada($directorio . "/" . $ruta);
        }
    }

    public static function imprimirEntrada ($ruta) {
        if (is_file($ruta)) {
            include $ruta;
        }
    }

}
