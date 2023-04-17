<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
class Vista {

    public static array $entradas = [
        "Inicio" => "index.php",
        "Editor" => "php/Editor.php",
        "Generador" => "php/Generador.php",
        "Social" => "php/GuiaUso.php",
        "Exportar" => "php/Exportar.php"
    ];

    public static function imprimirHead ($titulo, $css, $js) {
?>
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title><?=$titulo?></title>
                <?php
                foreach ($css as $link) {
                    echo "<link rel='stylesheet' href='". $link ."'>";
                }
                foreach ($js as $linkJS) {
                    echo "<script src='". $linkJS ."'></script>";
                }
                ?>
            </head>
        <?php
    }

    public static function imprimirNav ($entradas, $indiceActual) {
?>
        <nav>
            <ul>
                <?php
                $indice = 0;
                foreach ($entradas as $nombre => $ruta) {
                    if ($indice != $indiceActual) {
                        echo "<li><a href='".$ruta."'>".$nombre."</a></li>";
                    } else {
                        echo "<li><a class='actual'>".$nombre."</a></li>";
                    }
                    $indice++;
                }
                ?>
            </ul>
        </nav>
<?php
    }

    public static function imprimirFooter () {
?>
                <footer>
                    <div id="infoFooter">
                        <h2>Autor: </h2>
                        <address>Marcos García García</address>
                        <h2>Correo: </h2>
                        <mail>Correo@correo.com</mail>
                    </div>
                    <small>Copyright: Bloom&co&copy;</small>
                </footer>
                </body>
        </html>
<?php
    }

}