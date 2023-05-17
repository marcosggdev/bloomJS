<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "vistas/blog/VistaBlog.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/gui/MenuInterfaz/BotonInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/MenuInterfaz.js"></script>
    <script src="js/gui/MenuInterfaz/SubmenuInterfaz.js"></script>
</head>
<body>
    <script>
        let menu = new MenuInterfaz([
            new BotonInterfaz("Nombre", BotonInterfaz.saludar),
            new SubmenuInterfaz()
        ]);
        document.body.appendChild(menu.nodo);
    </script>
</body>
</html>