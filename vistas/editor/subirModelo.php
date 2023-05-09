<div id="encabezado">
        <div id="barraVentana">
            <img id="cerrarSubirModelo" src="/bloomJS/img/iconos/cerrar.png" alt="">
        </div>
        <h1>Subir Modelo3D</h1>
        <p>Para dibujar tu modelo en la escena, la aplicación necesita que subas al servidor tu modelo en formato .dae y la imagen con la 
                textura</p>
</div>
<div id="contenido">
        <p>Es por ello que te pedimos que rellenes este formulario con tus archivos</p>
        <form action="procesarModelo.php" method="POST">
            <div class="campo">
                <label for="nombre">Nombre del modelo:</label>
                <input name="nombre" type="text" placeholder="Nombre del modelo">
            </div>
            <div class="campo">
                <label for="modeloDae">Modelo3D en formato .dae:</label>
                <input id="dae" type="file" name="modeloDae" accept=".dae">
            </div>
            <div class="campo">
                <label for="textura">Imagen con la textura del Modelo3D</label>
                <input id="textura" type="file" name="textura" accept="image/*">
            </div>
            <input type="button" value="Subir">
        </form>
</div>