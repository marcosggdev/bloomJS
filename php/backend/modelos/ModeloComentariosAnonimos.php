<?php

class ModeloComentariosAnonimos {

    public static function getComentarioAnonimo ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM comentariosAnonimos WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'texto' => $registro['texto'], 
                    'id_target' => $registro['id_target']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function getComentariosAnonimosPorIdEntrada ($id_entrada) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM comentariosAnonimos WHERE id_target=:id_target";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id_target" => $id_entrada]);
            $datos = [];
            while ($registro = $preparada->fetch()) {
                $datos[] = [
                    'id' => $registro['id'], 
                    'texto' => $registro['texto'], 
                    'id_target' => $registro['id_target']
                ];
            }
            return $datos;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function insertarComentario ($texto, $id_entrada) {

        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "INSERT INTO comentariosAnonimos(texto, id_target) VALUES (:texto, :id_target)";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":texto" => $texto, ":id_target" => $id_entrada]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }

    }

}