<?php
//el usuario va a borrar un asset con cierto id y le mostrarmos qué escenas estarán afectadas por este cambio porque utilizan el modelo
require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
session_start();

//comprobamos que ha inciado sesion (permiso para borrar) y que llega el id que desea borrar.
if (isset($_SESSION["usuario"]) && isset($_POST["id"])) {

    //leer usuario
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);
    $rutaCarpetaUsuario = RAIZ_WEB . $datosUsuario["rutaCarpeta"];

    //leer escenas del usuario
    $datosEscenas = ModeloEscenas::getEscenasPorIdUsuario($usuario->id);
    $ids_escenas_afectadas = [];

    //si hay escenas
    if (count($datosEscenas) > 0) {

        //para cada una
        for ($i = 0; $i < count($datosEscenas); $i++) {

            //leemos json de la escena y comprobamos si se utiliza el objeto que se quiere eliminar por equivalencia en ids
            $nombreEscena = $datosEscenas[$i]["ruta"];
            $rutaEscena = $rutaCarpetaUsuario . "/escenas/" . $nombreEscena;
            $archivos = scandir($rutaEscena);

            //leer json
            $json = null;
            for ($j = 0; $j < count($archivos); $j++) {
                if (preg_match("/.json$/", $archivos[$j])) {
                    $archivoJSON = fopen($rutaEscena . "/" . $archivos[$j], "r");
                    $json = fread($archivoJSON, filesize($rutaEscena . "/" . $archivos[$j]));
                }
            }

            //comprobar objetos de la escena e ids
            if ($json != null) {
                $objetoParseado = json_decode($json, false);
                $dibujables = $objetoParseado->dibujables;
                for ($j = 0; $j < count($dibujables); $j++) {
                    $dibujable = $dibujables[$j];
                    
                    if (isset($dibujable->parametros->id)) {
                        if ($dibujable->parametros->id == $_POST["id"]) {
                            $ids_escenas_afectadas[] = $datosEscenas[$i]["id"];
                            $j = count($dibujables);
                        }
                    }

                }
            }

        }

    }

    //devolvemos lista de ids de las escenas afectadas
    echo json_encode($ids_escenas_afectadas);

} else {
    echo "<p class='servidor error'>Error: ¿Ha iniciado sesión?</p>";
}
