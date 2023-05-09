<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "modelos/ModeloEntradas.php";
require_once RAIZ_WEB . "modelos/ModeloComentariosAnonimos.php";

echo "<pre>";
print_r (ModeloComentariosAnonimos::getComentarioAnonimoPorIdEntrada(2));
echo "</pre>";