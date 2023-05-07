<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "modelos/ModeloModelos.php";
require_once RAIZ_WEB . "modelos/ModeloUsuarios.php";

if (isset($_POST["tipo"]) && isset($_POST["numero"])) {
    $modelosRegistros = ModeloModelos::getModelosPorTipoYNumero($_POST["tipo"], (int)$_POST["numero"]);
?>
    <div class="contenedor">
<?php
    for ($i = 0; $i < count($modelosRegistros); $i++) {
        $datosAutor = ModeloUsuarios::getUsuario($modelosRegistros[$i]["id_autor"]);
        $nombreAutor = $datosAutor["nombre"];
    ?>
        
            <div class="plantilla">
                <h4><?=$modelosRegistros[$i]["nombre"]?></h4>
                <img src="/bloomJS/<?=$modelosRegistros[$i]["previsualizacion"]?>" alt="">
                <p>Autor: <?=$nombreAutor?></p>
            </div>
    <?php
    }
    ?>
     </div>
    <script>
        <?php $i = 0; ?>
        Array.from(document.querySelectorAll(".plantilla")).forEach((div) => {
            div.addEventListener("click", () => {
                let modelo = new Modelo3D(0,0,0,0,0,0,1,1,1, "T", "/bloomJS/<?=$modelosRegistros[$i]["rutaModelo"]?>", new Color(0.5,0.5,0.5,1.0), "/bloomJS/<?=$modelosRegistros[$i]["rutaTextura"]?>", "/bloomsJS/assets/materiales/esfera.mtl");
                //elimina el menu asociado a la plantilla. Para que funcione bien, debemos tener un menu de la forma: menu -> malla -> plantilla
                //hijos director en ese orden. En caso contrario se eliminara el nodo equivocado
                div.parentNode.parentNode.parentNode.removeChild(div.parentNode.parentNode);
            });
            <?php $i++; ?>
        });
    </script>
<?php
}