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
                RAIZ . "js/general/NavDinamico.js"
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
                        <p>Bienvenido a BloomJS. Se trata de mi proyecto para el CFGS Desarrollo de Aplicaciones Web</p>
                        <p>BloomJS te ayudará a darle un toque 3D a tus proyectos de Desarrollo Web, permitiéndote insertar
                           en tu página modelos 3D animados y otros efectos, gracias a WebGL
                        </p>
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
                        <p>Entre las funcionalidades de BloomJS están: </p>
                        <ul>
                                <li>Generar patrones con la forma que tú mismo/a elijas</li>
                                <li>La generación de escenas en 3D para colocarlas en tu página</li>
                                <li>Generación de animaciones píxel</li>
                                <li>Compartir es vivir: comparte tus chulísimos gráficos generados bajo tus directrices</li>
                                <li>Generación de gráficos por shader: ¡Tu navegador también utiliza la GPU, aprovéchalo!</li>
                        </ul>
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
                </div>
                <div class="enlaces">
                        <div class="enlace">
                                <h2>Prueba nuestro editor</h2>
                                        <p>Te ayudará con el diseño de tu página</p>
                                <a href="#">Enlace <img src="/bloomJS/img/iconos/derecha.png" alt=""></a>
                        </div>
                        <div class="enlace">
                                <h2>Genera tus propios assets</h2>
                                        <p>Para que no tengas que preouparte por el copyright</p>
                                <a href="#">Enlace <img src="/bloomJS/img/iconos/derecha.png" alt=""></a>
                        </div>
                        <div class="enlace">
                                <h2>¡Comparte tus creaciones!</h2>
                                        <p>Descubre las creaciones de otros usuarios</p>
                                <a href="#">Enlace <img src="/bloomJS/img/iconos/derecha.png" alt=""></a>
                        </div>
                </div>
            </section>
        </main>

        <?=Vista::imprimirFooter()?>