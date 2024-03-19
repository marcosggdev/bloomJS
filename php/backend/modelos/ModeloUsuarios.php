<?php

class ModeloUsuarios {

    public static function getUsuario ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "SELECT * FROM usuarios WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'correo' => $registro['correo'], 
                    'nombre' => $registro['nombre'], 
                    'clave' => $registro['clave'],
                    'imagenPerfil' => $registro['imagenPerfil'],
                    'rutaCarpeta' => $registro["rutaCarpeta"]
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function getUsuarioPorNombreYClave ($nombre, $clave) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "SELECT * FROM usuarios WHERE nombre=:nombre AND clave=:clave";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":nombre" => $nombre, ":clave" => $clave]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'correo' => $registro['correo'], 
                    'nombre' => $registro['nombre'], 
                    'clave' => $registro['clave'],
                    'imagenPerfil' => $registro['imagenPerfil']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function crearUsuario ($correo, $nombre, $clave, $imagenPerfil, $rutaCarpeta) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "INSERT INTO usuarios(correo, nombre, clave, imagenPerfil, rutaCarpeta) VALUES (".
            ":correo, :nombre, :clave, :imagenPerfil, :rutaCarpeta)";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":correo" => $correo, ":nombre" => $nombre, ":clave" => $clave, ":imagenPerfil" => $imagenPerfil,
            ":rutaCarpeta" => $rutaCarpeta]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}