<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "modelos/ModeloModelos.php";
require_once RAIZ_WEB . "modelos/ModeloUsuarios.php";

if (isset($_POST["tipo"]) && isset($_POST["numero"])) {
    $modelosRegistros = ModeloModelos::getModelosPorTipoYNumero($_POST["tipo"], (int)$_POST["numero"]);
    for ($i = 0; $i < count($modelosRegistros); $i++) {
        $datosAutor = ModeloUsuarios::getUsuario($modelosRegistros[$i]["id_autor"]);
        $nombreAutor = $datosAutor["nombre"];
    ?>
        <div class="modelo">
            <h4><?=$modelosRegistros[$i]["nombre"]?></h4>
            <img src="/bloomJS/<?=$modelosRegistros[$i]["previsualizacion"]?>" alt="">
            <p>Autor: <?=$nombreAutor?></p>
        </div>
    <?php
    }
?>

<?php
}