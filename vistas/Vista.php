<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
class Vista {

    public static array $entradas = [
        "Inicio" => RAIZ . "index.php",
        "Editor" => RAIZ . "php/Editor.php",
        "Generador" => RAIZ . "php/Generador.php",
        "Blog" => RAIZ . "php/Blog.php"
    ];

    public static function imprimirHeader ($titulo, $subtitulo) {
?>
        <header>
            <h1><?=$titulo?></h1>
            <h2><?=$subtitulo?></h2>
        </header>
<?php
    }

    public static function imprimirHead ($titulo, $css = [], $js = []) {
?>
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title><?=$titulo?></title>
                <link rel="icon" href="/bloomJS/img/favicon/logo.ico" type="image/x-icon">
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

    public static function imprimirNav ($entradas, $indiceActual = 0) {
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

    public static function imprimirNavEstatico ($entradas, $indiceActual = 0) {
        ?>
                <nav id="estatico">
                    <h2>BloomJS</h2>
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
                    <div id="principal">
                        <div id="contactos">
                            <h1>Contacto</h1>
                            <a href="" class="contacto">
                                <img src="/bloomJS/img/iconos/github.png" alt="Logo de Github">
                                <small>Github</small>
                            </a>
                            <a href="" class="contacto">
                                <img src="/bloomJS/img/iconos/github.png" alt="Logo de Github">
                                <small>Github</small>
                            </a>
                            <a href="" class="contacto">
                                <img src="/bloomJS/img/iconos/github.png" alt="Logo de Github">
                                <small>Github</small>
                            </a>
                            <a href="" class="contacto">
                                <img src="/bloomJS/img/iconos/github.png" alt="Logo de Github">
                                <small>Github</small>
                            </a>
                        </div>
                        <div id="interes">
                            <h1>Algunos enlaces de interés</h1>
                            <ul>
                                <li><a href="https://asliceofrendering.com/scene%20helper/2020/01/05/InfiniteGrid/" target="_blank">
                                    ¿Cómo se dibuja el grid infinito en WebGL?
                                </a></li>
                                <li><a href="www.wikipedia.org">¿Se puede reutilizar el código fuente?</a></li>
                                <li><a href="www.wikipedia.org">¿Cuándo sale la siguiente actualización?</a></li>
                                <li><a href="https://learnopengl.com/Getting-started/Coordinate-Systems">Matrices de Modelo, Vista y Perspectiva en OpenGL</a></li>
                                <li><a href="https://antongerdelan.net/opengl/raycasting.html">¿Cómo se realiza ray casting desde screen space con un click?</a></li>
                                <li><a href="https://nghiaho.com/?page_id=846">¿Cómo se descompone una matriz de rotacion en los ángulos con respecto a xyz que la componen?</a></li>
                            </ul>
                        </div>
                        <div id="logos">
                            <h1>Instituciones</h1>
                            <div class="logo">
                                <img src="/bloomJS/img/iconos/ibq.png" alt="Logo IES Bernaldo de Quirós">
                                <small>IES Bernaldo de Quirós</small>
                            </div>
                            <div class="logo">
                                <img src="/bloomJS/img/iconos/ibq.png" alt="Logo IES Bernaldo de Quirós">
                                <small>IES Bernaldo de Quirós</small>
                            </div>
                        </div>
                    </div>
                    <div id="secundario">
                        <h1>BloomJS</h1>
                        <small>Marcos García García</small>
                        <address>IES Bernaldo de Quirós, Mieres</address>
                    </div>
                </footer>
                </body>
        </html>
<?php
    }

    public static function imprimirEntradas ($directorio) {
        $rutas = scandir($directorio);
        foreach ($rutas as $ruta) {
            self::imprimirEntrada($ruta);
        }
    }

    public static function imprimirEntrada ($ruta) {
        readfile($ruta);
    }

}