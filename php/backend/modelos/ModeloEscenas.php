<?php

class ModeloEscenas {

    public static function getEscena ($id) {

        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
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
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
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
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
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

}