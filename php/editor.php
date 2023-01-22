<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>BloomJS - Editor</title>
        <link rel="stylesheet" href="../css/general.css">
        <link rel="stylesheet" href="../css/editor.css">
        <script src="../js/main.js"></script>
        <script src="../js/renderer.js"></script>
        <script src="../js/controles.js"></script>
        <script src="../js/utilidades.js"></script>
        <script src="../js/matematicas/matriz4x4.js"></script>
        <script src="../js/matematicas/vector4x1.js"></script>
        <script src="../js/editor/barraMenu.js"></script>
    </head>
    <body>
        <header>
            <h1>Editor</h1>
            <h2>Utiliza las herramientas disponibles sobre el lienzo para generar elementos HTML con diseño</h2>
        </header>
        <nav>
            <ul>
                <li><a href="../index.php">Inicio</a></li>
                <li id="actual">Editor</li>
                <li><a href="">Generador</a></li>
                <li><a href="">Social</a></li>
                <li><a href="">Guía de uso</a></li>
                <li><a href="">Exportar</a></li>
            </ul>
        </nav>
        <main>
            <div id="barraContexto">
                <div id="barraMenus">
                    <ul>
                        <li>
                            <button id="archivo">Archivo</button>
                            <div id="menuArchivo">
                                <ul>
                                    <li>Crear nuevo</li>
                                    <li>Abrir</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="barraIconos">
                    <img src="../img/iconos/desplegarMenu.png" alt="Icono menú desplegable">
                </div>
            </div>
            <div id="contenido">
                <div id="menuLateral">
                    <img src="../img/iconos/desplegarMenu.png" alt="Icono menú desplegable">
                </div>
                <div id="canvas">
                    <canvas></canvas>
                </div>
                <div id="herramientas">

                </div>
            </div>
        </main> 
        <footer>
                Autor: <address>Marcos García García</address>
                Correo: <mail>Correo@correo.com</mail>
                <p>Copyright: Bloom&co&copy;</p>
        </footer>
    </body>
</html>