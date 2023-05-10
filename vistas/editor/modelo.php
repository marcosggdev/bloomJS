<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";

if (isset($_POST["tipo"]) && isset($_POST["numero"])) {
    //tipo de la forma: defecto, usuario o comunidad. No tiene que ver con la BD
    switch ($_POST["tipo"]) {
        case "defecto": $modelosRegistros = ModeloModelos::getModelosPorDefecto(); break;
        case "usuario": $modelosRegistros = ModeloModelos::getModelosPorIdAutor(1); break;
        case "comunidad": $modelosRegistros = ModeloModelos::getModelosComunidad(); break;
    }
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
                <input type="hidden" id="rutaModelo" value="<?=$modelosRegistros[$i]["rutaModelo"]?>">
                <input type="hidden" id="rutaTextura" value="<?=$modelosRegistros[$i]["rutaTextura"]?>">
            </div>
    <?php
    }
    ?>
     </div>
    <script>
        <?php $i = 0; ?>
        Array.from(document.querySelectorAll(".plantilla")).forEach((div) => {
            div.addEventListener("click", () => {
                let modelo = new Modelo3D(0,0,0,0,0,0,1,1,1, "T", "/bloomJS/" + div.querySelector("#rutaModelo").value, new Color(0.5,0.5,0.5,1.0), "/bloomJS/" + div.querySelector("#rutaTextura").value, "/bloomsJS/assets/materiales/esfera.mtl");
                //elimina el menu asociado a la plantilla. Para que funcione bien, debemos tener un menu de la forma: menu -> malla -> plantilla
                //hijos director en ese orden. En caso contrario se eliminara el nodo equivocado
                div.parentNode.parentNode.parentNode.removeChild(div.parentNode.parentNode);
                <?php $i++; ?>
            });
        });
    </script>
<?php
}