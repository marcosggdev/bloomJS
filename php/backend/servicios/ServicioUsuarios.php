<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";

class ServicioUsuarios {

    //accede a datos para comprobar si existe un usuario adecuado y devuelve true o false
    public static function comprobarInicioSesion ($nombre, $clave) {
        $datosUsuario = ModeloUsuarios::getUsuarioPorNombreYClave($nombre, $clave);
        if ($datosUsuario != false) {
            //hay usuario
            $usuario = new Usuario($datosUsuario["id"], $datosUsuario["correo"], $datosUsuario["nombre"], $datosUsuario["imagenPerfil"]);
            return $usuario;
        }
        //no hay usuario
        return false;
    }

    public static function crearUsuario ($correo, $nombre, $clave, $imagenPerfil) {
        //crear usuario = crearlo en la BD, crear una carpeta en la carpeta usuarios para el usuario. En la tabla usuarios guardaremos
        //la ruta a la carpeta, y manejaremos permisos en ella mediante autentificacion con los datos del usuario en cuestion

        //vamos a usar el id del usuario en la BD como nombre de la carpeta: nombre_correo
        $rutaCarpeta = RAIZ_WEB . "usuarios/".$nombre."_".$correo;
        $id = ModeloUsuarios::crearUsuario($correo, $nombre, $clave, $imagenPerfil, "usuarios/".$nombre."_".$correo);

        if ($id != false && mkdir($rutaCarpeta, "0777")) {
            //y devolvemos el objeto
            $datosUsuario = ModeloUsuarios::getUsuarioPorNombreYClave($nombre, $clave);
            $usuario = new Usuario($datosUsuario["id"], $datosUsuario["correo"], $datosUsuario["nombre"], $datosUsuario["imagenPerfil"]);
            return $usuario;
        } else {
            //si no se crea carpeta o sale error de BD
            return false;
        }
    }

}