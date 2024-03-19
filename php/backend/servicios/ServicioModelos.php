<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloModelos.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";
require_once RAIZ_WEB . "php/backend/servicios/DiscoLocal.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloEscenas.php";
require_once RAIZ_WEB . "php/backend/servicios/DiscoLocal.php";
session_start();

class ServicioModelos {

    public static function eliminarModeloPorId ($id_usuario, $id_modelo, $ids_escenas_afectadas) {
    
        if (ModeloModelos::comprobarPertenenciaModelo($id_usuario, $_POST["id"])) {
    
            $datosUsuario = ModeloUsuarios::getUsuario($id_usuario);
            $datosModelo = ModeloModelos::getModelo($id_modelo);
            $datosEscenas = [];
            for ($i = 0; $i < count($ids_escenas_afectadas); $i++) {
                $datosEscenas[] = ModeloEscenas::getEscena($ids_escenas_afectadas[$i]);
            }

            //eliminar modelo de la BD
            ModeloModelos::eliminarModeloPorId($datosModelo["id"]);

            //eliminar modelo del sistema local
            DiscoLocal::eliminarArchivo(RAIZ_WEB . $datosModelo["rutaModelo"]);
            DiscoLocal::eliminarArchivo(RAIZ_WEB . $datosModelo["rutaTextura"]);
            DiscoLocal::eliminarArchivo(RAIZ_WEB . $datosModelo["previsualizacion"]);

            //eliminar escenas afectadas
            for ($i = 0; $i < count($datosEscenas); $i++) {
                //eliminar escenas afectadas de la BD
                ModeloEscenas::eliminarEscena($datosEscenas[$i]["id"]);

                //eliminar escenas afectadas del disco local
                $rutaUsuario = $datosUsuario["rutaCarpeta"];
                $nombreEscena = $datosEscenas[$i]["ruta"];
                DiscoLocal::eliminarCarpeta(RAIZ_WEB . "/" . $rutaUsuario . "/" . $nombreEscena);
            }

            return true;
    
        } else {
    
            echo "<p class='servidor error'>Error: el usuario no tiene permisos de eliminado sobre el modelo con id: ".$_POST["id"]."</p>";
            return false;
    
        }

    }

}