<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/Vista.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
session_start();
?>


<?=Vista::imprimirHead("Bloom - JS", 
	[
		RAIZ . "css/general.css", 
		RAIZ . "css/index.css",
		RAIZ . "css/animaciones.css",
        RAIZ . "css/entrada.css",
        RAIZ . "css/comentarios.css",
        RAIZ . "css/carruselHorizontal.css",
        RAIZ . "css/neon.css",
        RAIZ . "css/cronologia.css"
	], 
	[
		RAIZ . "js/general/NavDinamico.js",
		RAIZ . "js/general/AnimacionMostrarIzquierda.js",
        RAIZ . "js/blog/ControladorComentar.js",
        RAIZ . "js/general/AnimacionDinamicaOnScroll.js"
	]
)?>

    <body>

	<div id="cabecera">

	<?=Vista::imprimirHeader("BloomJS", "Utiliza gráficos avanzados en tu página")?>
	<?=Vista::imprimirNav(Vista::$entradas, 0)?>
	<?=Vista::imprimirUsuario()?>
	<?=Vista::imprimirNavEstatico(Vista::$entradas, 0)?>

	</div>

	<main>
        <div class="titulo">
        <h1 class="texto-neon">¡Bienvenido/a!</h1>
        </div>
        <div class="contenido">
            <p>BloomJS es una aplicación web resultado del proyecto de fin de ciclo formativo de Desarrollo de Aplicaciones Web. Permitirá
                a los desarrolladores web disponer de una herramienta más para añadir gráficos 3D a sus páginas de forma sencilla, 
                generar plantillas y patrones de imágenes por algoritmos y compartir assets gratuitos (sin licencia) con la comunidad.
            </p>
            <p>Para lograr esto, la página se ha desarrollado con las tecnologías fundamentales del entorno web, como lo son HTML, CSS, 
                JavaScript y PHP. Además, para lograr la generación de gráficos avanzados con la aplicación, se ha utilizado WebGL como 
                API de gráficos en entorno web.
            </p>
            <img src="/bloomJS/img/tecnologias_web.png" alt="">
            <p>Te invitamos a pasarte por la zona del editor o por el blog, donde podrás aprender sobre la programación de gráficos en 
                JavaScript</p>
            <img id="welcome" src="img/welcome.png" alt="">
            <q>Esta es mi página para el proyecto de CFGS Desarrollo de Aplicaciones Web, espero que te sea útil y que aprendas sobre 
                la programación de gráficos con JavaScript. Att: Marcos García García</q>
            <p class="breve">¿Te gustan los modelos 3D? ¡Pásate por el editor!</p>
            <section id="editor">
                <div class="titulo animDinamica-onscroll">
                    <div class="contenido">
                        <h1 class="texto-neon">Editor</h1>
                        <a class="boton-neon-purple" href="/bloomJS/php/paginas/Editor.php">Ir al Editor<img src="img/iconos/derecha.png" alt=""/></a>
                    </div>
                </div>
                <!--insertar aqui modelo 3d cuando funcione la exportacion-->
            </section>
            <p class="breve">¡Y también podrás generar imágenes!</p>
            <section id="generador">
                <div class="titulo animDinamica-onscroll">
                    <div class="contenido">
                        <h1 class="texto-neon">Generador</h1>
                        <a class="boton-neon-purple" href="/bloomJS/php/paginas/Generador.php">Ir al Generador<img src="img/iconos/derecha.png" alt=""/></a>
                    </div> 
                </div>
                <!--insertar aqui imagenes generadas en el generador-->
            </section>
            <?=VistaBlog::imprimirEntrada("1", "/bloomJS/blog/0_Notas de desarrollo.php")?>
            <?=VistaBlog::imprimirEntrada("2", "/bloomJS/blog/1_Introduccion.php")?>
            <p class="breve">¡Lee nuestro blog y aprende! Tenemos entradas sobre el desarrollo de BloomJS y sobre WebGL
            </p>
            <section id="blog">
                <div class="titulo animDinamica-onscroll">
                    <div class="contenido">
                        <h1 class="texto-neon">Blog</h1>
                        <a class="boton-neon-purple" href="/bloomJS/php/paginas/Blog.php">Ir al Blog</a>
                    </div>
                </div>
                <?=VistaBlog::imprimirCarruselEntradas();?>
            </section>
        </div>
	</main>

	<?=Vista::imprimirFooter()?>