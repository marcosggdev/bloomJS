<?php

class ModeloComentarios {

    public static function getComentario ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM comentarios WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'texto' => $registro['texto'], 
                    'id_target' => $registro['id_target'],
                    'id_autor' => $registro['id_autor']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function getComentariosPorIdEntrada ($id_entrada) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM comentarios WHERE id_target=:id_target";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id_target" => $id_entrada]);
            $datos = [];
            while ($registro = $preparada->fetch()) {
                $datos[] = [
                    'id' => $registro['id'], 
                    'texto' => $registro['texto'], 
                    'id_target' => $registro['id_target'],
                    'id_autor' => $registro['id_autor']
                ];
            }
            return $datos;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function insertarComentario ($texto, $id_entrada, $id_autor) {

        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "INSERT INTO comentarios(texto, id_target, id_autor) VALUES (:texto, :id_target, :id_autor)";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":texto" => $texto, ":id_target" => $id_entrada, ":id_autor" => $id_autor]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }

    }

}