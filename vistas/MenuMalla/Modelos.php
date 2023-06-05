<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";

$mensajeError = "<p class='servidor error'>¡Ups! Ha habido un error:<br>";

if (isset($_POST["titulo"]) && isset($_POST["tipo"]) && isset($_POST["numero"])) {

    //tipo de la forma: defecto, usuario o comunidad. No tiene que ver con la BD
    switch ($_POST["tipo"]) {

        case "defecto": 
            $modelosRegistros = ModeloModelos::getModelosPorDefecto(); 
            break;
        case "usuario": 
            session_start();
            if (isset($_SESSION["usuario"])) {
                $usuario = $_SESSION["usuario"];
                $modelosRegistros = ModeloModelos::getModelosPorIdAutor($usuario->id); 
            } else {
                $modelosRegistros = [];
            }
            break;
        case "comunidad": 
            $modelosRegistros = ModeloModelos::getModelosComunidad(); 
            break;

    }

    echo "<link rel='stylesheet' href='/bloomJS/vistas/MenuMalla/Modelos.css'/>";
?>

    <div id="<?= $_POST["titulo"] ?>" class='mallaModelos'>
    <input type="hidden" id="mallaModelosTitulo" value="<?= $_POST["titulo"] ?>">

<?php

    for ($i = 0; $i < count($modelosRegistros); $i++) {
        $datosAutor = ModeloUsuarios::getUsuario($modelosRegistros[$i]["id_autor"]);
        $nombreAutor = $datosAutor["nombre"];
    ?>    
        <div id="<?= $_POST["tipo"] . $i ?>" class="plantilla modelo" style="display:flex;flex-direction:column">
            <h4><?=$modelosRegistros[$i]["nombre"]?></h4>
            <img src="/bloomJS/<?=$modelosRegistros[$i]["previsualizacion"]?>" alt="">
            <p>Autor: <?=$nombreAutor?></p>
            <input type="hidden" id="rutaModelo" value="<?=$modelosRegistros[$i]["rutaModelo"]?>">
            <input type="hidden" id="rutaTextura" value="<?=$modelosRegistros[$i]["rutaTextura"]?>">
            <input type="hidden" id="nombre" value="<?=$modelosRegistros[$i]["nombre"]?>">
        </div>
    <?php
    }
    echo "</div>";
?>
            <script id="script_<?=$_POST["titulo"]."_".$i?>" class="Modelos.js">
                plantillas = document.querySelectorAll("#<?=$_POST["titulo"]?>.mallaModelos" + " .plantilla.modelo");

                Array.from(plantillas).forEach((plantilla) => {

                    plantilla.addEventListener("click", () => {
                        //click en una plantilla
                        if (RendererRefactor.escena != null) {
                            Modelo3D.crearModelo(0,0,0,0,0,0,1,1,1,"T",
                            "/bloomJS/"+plantilla.querySelector("#rutaModelo").value,null,
                            "/bloomJS/"+plantilla.querySelector("#rutaTextura").value, null, plantilla.querySelector("#nombre").value)
                            .then(
                                function (modelo) {
                                    RendererRefactor.escena.anadirDibujable(modelo);
                                }
                            )
                            .then(
                                function () {
                                    menu = VentanaCanvas.interfazCanvas.buscarMenuPorTitulo("Añadir modelo");
                                    if (menu != null) {
                                        VentanaCanvas.interfazCanvas.eliminarMenu(menu.nodo);
                                    }
                                    links = document.querySelectorAll("link[href='/bloomJS/vistas/MenuMalla/Modelos.css']");
                                    Array.from(links).forEach((l) => {l.remove()});
                                    scripts = document.querySelectorAll("script.Modelos\.js");
                                    Array.from(scripts).forEach((s) => {s.remove()});
                                }
                            );
                        } else {
                            alert("Primero crea una escena");
                        }
                    });

                });
            </script>
<?php
} else {
    if (!isset($_POST["titulo"])) {
        $mensajeError .= "El título del submenú contenedor del modelo no está definido<br>";
    }

    if (!isset($_POST["tipo"])) {
        $mensajeError .= "El tipo de modelo no está definido (defecto | usuario | comunidad)<br>";
    }

    if (!isset($_POST["numero"])) {
        $mensajeError .= "El número de modelos que se desea obtener no está definido<br>";
    }
    $mensajeError .= "</p>";
    echo $mensajeError;
}