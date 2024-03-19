<?php

class ModeloEscenas {

    public static function getEscena ($id) {

        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "SELECT * FROM escenas WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'titulo' => $registro['titulo'], 
                    'descripcion' => $registro['descripcion'], 
                    'ruta' => $registro['ruta'],
                    'id_autor' => $registro['id_autor']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }

    }

    public static function getEscenasPorIdUsuario ($id_autor) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "SELECT * FROM escenas WHERE id_autor=:id_autor";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id_autor" => $id_autor]);
            $registros = [];
            while ($registro = $preparada->fetch()) {
                $array = [
                    'id' => $registro['id'], 
                    'titulo' => $registro['titulo'], 
                    'descripcion' => $registro['descripcion'], 
                    'ruta' => $registro['ruta'],
                    'id_autor' => $registro['id_autor']
                ];
                $registros[] = $array;
            }
            return $registros;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function crearEscena ($titulo, $descripcion, $ruta, $id_autor) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "INSERT INTO escenas(titulo, descripcion, ruta, id_autor) VALUES (".
            ":titulo, :descripcion, :ruta, :id_autor)";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":titulo" => $titulo, ":descripcion" => $descripcion, ":ruta" => $ruta, ":id_autor" => $id_autor]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function eliminarEscena ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "DELETE FROM escenas WHERE id=:id";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            return true;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function comprobarPropiedadEscena ($id_usuario, $id_escena) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "bloomjs", "l52ejAvtOAqZ8OQ");
            $sql = "SELECT * FROM escenas WHERE id=:id AND id_autor=:id_autor";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id_escena, ":id_autor" => $id_usuario]);
            if ($preparada->rowCount() > 0) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}