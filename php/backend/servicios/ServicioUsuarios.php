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
        $id = ModeloUsuarios::crearUsuario($correo, $nombre, $clave, $imagenPerfil);
        if ($id != false) {
            $datosUsuario = ModeloUsuarios::getUsuarioPorNombreYClave($nombre, $clave);
            $usuario = new Usuario($datosUsuario["id"], $datosUsuario["correo"], $datosUsuario["nombre"], $datosUsuario["imagenPerfil"]);
            return $usuario;
        } else {
            return false;
        }
    }

}