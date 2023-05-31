<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/Utilidades.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
session_start();

//recibimos la serializacion de la escena, como un string que escribir en un archivo en formato .json
if (isset($_SESSION["usuario"]) && isset($_POST["escena"]) && isset($_POST["imagen"])) {

    $escenaSerializada = json_decode($_POST["escena"]);
    $imagen = $_POST["imagen"];

    //el .json se guardara en la carpeta del usuario, por lo que es necesario haber iniciado sesion. En caso contrario
    //devolvemos alert indicando que inicie sesion
    $usuario = $_SESSION["usuario"];
    $datosUsuario = ModeloUsuarios::getUsuario($usuario->id);

    //escribir json en carpeta de usuario: /usuarios/usuario/escenas/escena/{imagenPrevisualizacion, json}
    $rutaCarpeta = RAIZ_WEB . $datosUsuario["rutaCarpeta"] . "/escenas";
    if (!is_dir($rutaCarpeta)) {
        mkdir($rutaCarpeta, 0777, true);
    }

    //leer para comprobar si existe
    $datosEscena = ModeloEscenas::getEscena($escenaSerializada->id);

    if ($datosEscena != false) {

        //ya existe => actualizar imagen y json
        $nombreEscena = $datosEscena["titulo"];
        $rutaEscena = $datosEscena["ruta"];
        $rutaCarpeta .= "/" . $datosEscena["ruta"];
    
        //metemos json
        $archivosEscena = scandir($rutaCarpeta);
        for ($i = 0; $i < count($archivosEscena); $i++) {
            if ($archivosEscena[$i] == "." || $archivosEscena[$i] == "..") {
                unset($archivosEscena[$i]);
            }
        }
        $archivosEscena = array_values($archivosEscena);

        $imagenActualizada = false;
        $jsonActualizado = false;

        for ($i = 0; $i < count($archivosEscena); $i++) {

            if (preg_match("/.png$/", $archivosEscena[$i])) {

                //modificar imagen
                $archivo = fopen($rutaCarpeta . "/" . $archivosEscena[$i], "w");
            
                //base64,iVBORw0KGgoAAAANSUhEUgAABE...
                $datos = explode(";", $imagen)[1];
                $datos = explode(",", $datos)[1];
                $imagenDecodificada = base64_decode($datos);
                fwrite($archivo, $imagenDecodificada);

            } elseif (preg_match("/.json$/", $archivosEscena[$i])) {
                //modificar json
                $rutaArchivo = $rutaCarpeta . "/" . $archivosEscena[$i];
                $archivoJSON = fopen($rutaArchivo, "w");
                fwrite($archivoJSON, $_POST["escena"]);
            }

        }

        echo "<p>¡La escena se ha actualizado con éxito!</p>";

    //escena de BD es false
    } else {

        //no existe. crear carpeta y meter dentro imagen y json y guardar registro en BD
        $rutaEscena = generarNombreArchivoUnico("", $rutaCarpeta);
        $rutaCarpeta .= "/" . $rutaEscena;
        mkdir($rutaCarpeta, 0777, true);
    
        //metemos json
        $nombreArchivo = generarNombreArchivoUnico(".json", $rutaCarpeta);
        $rutaArchivo = $rutaCarpeta . "/" . $nombreArchivo;
        $archivoJSON = fopen($rutaArchivo, "w");
        fwrite($archivoJSON, $_POST["escena"]);
    
        //La imagen se recibe con funcion toDataURL, que la codifica en un string donde tenemos:
        //tipo mime, codificacion y datos codificados. Tenemos que procesar todo eso.
        //data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABE...
    
        //data:image/png
        $cabecera = explode(";", $imagen)[0];
    
        //base64,iVBORw0KGgoAAAANSUhEUgAABE...
        $datos = explode(";", $imagen)[1];
        $datos = explode(",", $datos)[1];
    
        $mime = explode(":", $cabecera)[1];
        $extension = convertirMimeAExtension($mime);
        $nombreImagen = generarNombreArchivoUnico("." . $extension, $rutaCarpeta);
        $rutaImagen = $rutaCarpeta . "/" . $nombreImagen;
        $archivoImagen = fopen($rutaImagen, "w");
        $imagenDecodificada = base64_decode($datos);
        fwrite($archivoImagen, $imagenDecodificada);

        $id = ModeloEscenas::crearEscena($escenaSerializada->titulo, $escenaSerializada->descripcion, $rutaEscena, $usuario->id);

        echo "<p>¡La escena se ha creado con éxito!</p>";

    }
} else {

    echo "<p>¡Ups! Algo ha salido mal. No ha iniciado sesion o ha habido un error con el envío de la serialización de la escena o la imagen " . 
    "de previsualización</p>";

}