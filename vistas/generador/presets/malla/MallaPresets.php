<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";

if (isset($_POST["filas"]) && isset($_POST["columnas"])) {
    $estilo = "display:grid;";
    if ($_POST["filas"] != "null") {
        $estilo .= "grid-template-rows:repeat(".$_POST["filas"].",1fr);";
    }
    if ($_POST["columnas"] != "null") {
        $estilo .= "grid-template-columns:repeat(".$_POST["columnas"].",1fr);";
    }    
}
?>
<link rel="stylesheet" href="/vistas/generador/presets/malla/MallaPresets.css">
<div class="mallaPresets" style="<?= $estilo ?>">

<?php
    $presets = scandir(RAIZ_WEB . "vistas/generador/presets/");

    foreach ($presets as $preset) {
        if ($preset != "." && $preset != ".." && $preset && $preset != "malla") {
            //$preset es el nombre de archivo del preset. procedemos a importarlo
            include RAIZ_WEB . "vistas/generador/presets/" . $preset;
        }
    }
?>
<input type="hidden" id="script" value="/vistas/generador/presets/malla/MallaPresets.js">
</div>