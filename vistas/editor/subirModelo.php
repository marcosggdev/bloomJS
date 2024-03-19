<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/php/DTO/Usuario.php";
session_start();

$imprimirPlantilla = false;
if (isset($_SESSION["usuario"])) {
    $imprimirPlantilla = true;
}

if ($imprimirPlantilla) {
?>
<div id="plantilla">
    <dialog id="dialogSubirModelo">
        <div id="encabezado">
                <div id="barraVentana">
                    <h1>Subir Modelo3D</h1>
                    <img id="cerrarSubirModelo" src="/img/iconos/cerrar.png" alt="">
                </div>
                <p>Para dibujar tu modelo en la escena, la aplicación necesita que subas al servidor tu modelo en formato .dae y la imagen con la 
                        textura</p>
        </div>
        <div id="contenido">
                <p>Es por ello que te pedimos que rellenes este formulario con tus archivos</p>
                <form action="ProcesarArchivoSubido.php" method="POST">
                    <div class="campo">
                        <label for="nombre">Nombre del modelo:</label>
                        <input id="nombre" name="nombre" type="text" placeholder="Nombre del modelo">
                    </div>
                    <div class="campo">
                        <label for="descripcion">Descripción breve:</label>
                        <input id="descripcion" name="descripcion" type="text" placeholder="Descripción">
                    </div>
                    <div class="campo">
                        <label for="modeloDae">Modelo3D en formato .dae:</label>
                        <input id="dae" type="file" name="modeloDae" accept=".dae">
                    </div>
                    <div class="campo">
                        <label for="textura">Imagen con la textura del Modelo3D</label>
                        <input id="textura" type="file" name="textura" accept="image/*">
                    </div>
                    <div class="campo">
                        <label for="previsualizacion">Imagen de previsualización del Modelo3D</label>
                        <input id="previsualizacion" type="file" name="textura" accept="image/*">
                    </div>
                    <input id="botonSubirModelo" type="button" value="Subir">
                </form>
        </div>
    </dialog>
</div>
<div id="adicional">
    <link id="estilo" rel="stylesheet" href="/vistas/editor/subirModelo.css">
    <input id="script" type="hidden" value="/vistas/editor/subirModelo.js">
</div>

<?php
} else { ?>

    <div id="plantilla">
        <dialog id="dialogSubirModelo">
            <div id="encabezado">
                    <div id="barraVentana">
                        <h1>Subir Modelo3D</h1>
                        <img id="cerrarSubirModelo" src="/img/iconos/cerrar.png" alt="">
                    </div>
                    <p>Para subir un modelo necesitas iniciar sesión, de esta forma guardaremos tu modelo en tu cuenta de usuario</p>
            </div>
            <div id="contenido">
                    <form action="/php/paginas/Login.php" method="POST">
                        <?php
                            if (isset($_POST["paginaVolver"])) {
                                echo "<input type='hidden' name='paginaVolver' value='".$_POST["paginaVolver"]."'>";
                            }
                        ?>
                        <input class="boton-neon-purple" type="submit" value="Iniciar sesión">
                    </form>
            </div>
        </dialog>
    </div>

<?php
}

