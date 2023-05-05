<?php

class ModeloUsuarios {

    public static function getUsuario ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
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
                    'imagenPerfil' => $registro['imagenPerfil']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}