<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
?>
<div class="presets">

<?php
    $presets = scandir(RAIZ_WEB . "vistas/generador/presets/");

    foreach ($presets as $preset) {
        if ($preset != "." && $preset != "..") {
            //$preset es el nombre de archivo del preset. procedemos a importarlo
            include RAIZ_WEB . "vistas/generador/presets/" . $preset;
        }
    }
?>

</div>