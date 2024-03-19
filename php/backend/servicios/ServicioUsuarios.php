<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/php/Config.php";
require_once RAIZ_WEB . "php/backend/modelos/ModeloUsuarios.php";
require_once RAIZ_WEB . "php/DTO/Usuario.php";

class ServicioUsuarios {

    public static function getUsuario ($id) {
        $datosUsuario = ModeloUsuarios::getUsuario($id);
        if ($datosUsuario != false) {
            $usuario = new Usuario($datosUsuario["id"], $datosUsuario["correo"], $datosUsuario["nombre"], $datosUsuario["imagenPerfil"]);
            return $usuario;
        }
        return false;
    }

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

        //usuario bd creado, carpeta y archivo creados
        if ($id != false && mkdir($rutaCarpeta, 0777) && fopen($rutaCarpeta . "/entradaPersonal.html", "w")) {

            //y devolvemos el objeto
            $datosUsuario = ModeloUsuarios::getUsuarioPorNombreYClave($nombre, $clave);
            $usuario = new Usuario($datosUsuario["id"], $datosUsuario["correo"], $datosUsuario["nombre"], $datosUsuario["imagenPerfil"]);
            return $usuario;

        } else {

            //algo no se ha conseguido crear. Futuro: revertir cambios que si se han hecho
            return false;

        }

    }

}