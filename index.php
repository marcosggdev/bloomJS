<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
?>


<?=Vista::imprimirHead("Bloom - JS", 
        [
                RAIZ . "css/general.css", 
                RAIZ . "css/index.css"
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

        </div>

        <main>
            <section id="animacion3D">
                <canvas id="canvas" tabindex=0>
                        Su navegador no es compatible con WebGL
                </canvas>
            </section>
            <section id="bienvenida">
                <h2>¡Bienvenido a BloomJS!</h2>
                <p>Bienvenido a BloomJS. Se trata de mi primera aplicación web de cara al público general. Si quieres saber más
                    sobre mí puedes visitar el siguiente <a href="">enlace</a>, pero por ahora centrémonos en lo importante: ¿Qué
                    es BloomJS?</p>
                <p>BloomJS, consiste en una aplicación web que te ayudará con tus proyectos de desarrollo web, permitiéndote aprovechar
                    librerías gráficas potentes orientadas a entorno web, como WebGL para la generación de gráficos bonitos que podrás incrustar
                    en tu web, de forma gratuita.</p> 
            </section>
            <section id="funcionalidades">
                <h2>¿Para qué sirve BloomJS?</h2>
                <p>Entre las funcionalidades más guays de BloomJS están:
                </p>
                <p>La generación con patrones 2D: se trata de generar patrones con la forma que tú mismo/a elijas de forma 
                        aleatoria y mezclando diferentes imágenes para lograr un fondo único.
                </p>
                <p>La generación de escenas en 3D para colocarlas en tu página: como escuchas. Te permite subir un modelo3D,
                        crear una escena con los modelos 3D que subas y exportar el resultado en un .js que podrás importar a tu
                        proyecto.
                </p>
                <p>Generación de animaciones píxel: ¿Te gustaría lograr que en tu página llueva, los rayos del sol impidan leer
                        bien el texto, las infinitas hojas no paren de caer en Otoño o tengas que rascar la nieve que se va acumulando
                        en la pantalla durante el frío invierno? ¡BloomJS es tu solución!
                </p>
                <p>Compartir es vivir: comparte tus chulísimos gráficos generados bajo tus directrices con el resto de usuarios 
                        y compite por llegar al top semanal de los mejores gráficos y diseños. Forma parte de la comunidad y disfruta
                        valorando los diseños de otras personas y compartiendo información con ellos/as. Además, los mejores diseños
                        semanales ¡Se recomendarán como plantillas a los nuevos usuarios de BloomJS!
                </p>
                <p>Generación de gráficos por shader: ¡Tu navegador también utiliza la GPU, aprovéchalo! Utiliza el generador de 
                        gráficos por shader para lograr efectos que nunca podrías haber logrado sin librerías de gráficos avanzadas como
                        WebGL: imagina tu página sobre automóviles de alta gama bajo el sol, con un sol cegador, la gasolina evaporándose
                        y distorsionando los rayos de luz a su alrededor...
                </p>
            </section>
            <section id="empezar">
                <h2>¡Empecemos!</h2>
                <p>Utilizar BloomJS no es tan difícil como parece. Si te gusta ir a tu bola siéntete libre de explorar el resto
                        del sitio libremente. Sin embargo, si te gustaría tener una experiencia más ordenada, te recomendamos que leas
                        los artículos en la sección <a href="">Guías</a>. Espero que la aplicación te sea de utilidad. Por supuesto,
                        si necesitas informar sobre un bug, atención de soporte o cualquier cosa no dudes en enviarnos un correo a
                        <email>Correo</email> ¡Bienvenido/a a BloomJS!
                </p>
                <button id="empezar" class="redireccion" onclick="window.location.assign('php/Editor.php')">Ir al Editor</button>
            </section>
        </main>

        <?=Vista::imprimirFooter()?>