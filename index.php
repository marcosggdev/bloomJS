<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
?>


<?=Vista::imprimirHead("Bloom - JS", 
        [
                RAIZ . "css/general.css", 
                RAIZ . "css/index.css",
                RAIZ . "css/animaciones.css"
        ], 
        [
                RAIZ . "js/editor/Defecto.js",
                RAIZ . "js/webgl/GLSL.js",
                RAIZ . "js/webgl/Color.js",
                RAIZ . "js/webgl/Material.js",
                RAIZ . "js/webgl/Dae.js",
                RAIZ . "js/webgl/Modelo3D.js",
                RAIZ . "js/webgl/Modelo2D.js",
                RAIZ . "js/webgl/Lienzo.js",
                RAIZ . "js/index/Main.js",
                RAIZ . "js/webgl/Utilidades.js",
                RAIZ . "js/webgl/matematicas/Matriz4x4.js",
                RAIZ . "js/editor/BotonIcono.js",
                RAIZ . "js/editor/FuncionesIconos.js",
                RAIZ . "js/editor/VentanaCanvas.js",
                RAIZ . "js/webgl/Renderer.js",
        ]
)?>

    <body>

        <div id="cabecera">

        <?=Vista::imprimirHeader("BloomJS", "Para que puedas olvidarte del código y centrarte en tu diseño")?>

        <?=Vista::imprimirNav(Vista::$entradas, 0)?>
        <?=Vista::imprimirNavEstatico(Vista::$entradas, 0)?>

        </div>

        <main>
        <section id="bienvenida">
                <div class="textoSecundario">
                        <h2>¡Bienvenido a BloomJS!</h2>
                        <p>Bienvenido a BloomJS. Se trata de mi primera aplicación web de cara al público general</p>
                        <p>BloomJS te ayudará con tus proyectos de desarrollo web</p>
                </div>
                <div class="contenedorImagen">
                        <img src="/bloomJS/img/colorido.jpg" alt="Imagen de fondo">
                </div>
            </section>
            <section id="funcionalidades">
                <div class="contenedorImagen">
                        <img src="/bloomJS/img/pluma.jpg" alt="Fondo">
                </div>
                <div class="textoSecundario">
                        <h2>¿Para qué sirve BloomJS?</h2>
                        <p>Entre las funcionalidades más guays de BloomJS están:
                        </p>
                        <p>Patrones con la forma que tú mismo/a elijas</p>
                        <p>La generación de escenas en 3D para colocarlas en tu página</p>
                        <p>Generación de animaciones píxel</p>
                        <p>Compartir es vivir: comparte tus chulísimos gráficos generados bajo tus directrices</p>
                        <p>Generación de gráficos por shader: ¡Tu navegador también utiliza la GPU, aprovéchalo!</p>
                </div>
            </section>
            <section id="empezar">
                <div class="textoSecundario">
                        <h2>¡Empecemos!</h2>
                        <p>Utilizar BloomJS no es tan difícil como parece. Si te gusta ir a tu bola siéntete libre de explorar el resto
                                del sitio libremente. Sin embargo, si te gustaría tener una experiencia más ordenada, te recomendamos que leas
                                los artículos en la sección <a href="">Guías</a>. Espero que la aplicación te sea de utilidad. Por supuesto,
                                si necesitas informar sobre un bug, atención de soporte o cualquier cosa no dudes en enviarnos un correo a
                                <email>Correo</email> ¡Bienvenido/a a BloomJS!
                        </p>
                        <button id="empezar" class="redireccion" onclick="window.location.assign('php/Editor.php')">Ir al Editor</button>
                </div>
                <div class="contenedorImagen">
                        <img src="/bloomJS/img/videojuego.jpg" alt="Videojuego">
                </div>
                <div class="enlaces">
                        <div class="enlace">
                                <h2>Lorem ipsum dolor sit amet consectetur adipit minus</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, 
                                        nihiuscipit minus</p>
                                <a href="#">enlace</a>
                        </div>
                        <div class="enlace">
                                <h2>Lorem ipsum dolor sit amet consectetur adipit minus</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, 
                                        nihiuscipit minus</p>
                                <a href="#">enlace</a>
                        </div>
                        <div class="enlace">
                                <h2>Lorem ipsum dolor sit amet consectetur adipit minus</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, 
                                        nihiuscipit minus</p>
                                <a href="#">enlace</a>
                        </div>
                </div>
            </section>
            <section id="animacion3D">
                <canvas id="canvas" tabindex=0>
                        Su navegador no es compatible con WebGL
                </canvas>
            </section>
        </main>

        <?=Vista::imprimirFooter()?>