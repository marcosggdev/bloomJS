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
                    'nombre' => $registro['nombre'], 
                    'ruta' => $registro['ruta']
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
                    'nombre' => $registro['nombre'], 
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

    public static function crearEscena ($nombre, $descripcion, $ruta, $id_autor) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "INSERT INTO escenas(nombre, descripcion, ruta, id_autor) VALUES (".
            ":nombre, :descripcion, :ruta, :id_autor)";
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":nombre" => $nombre, ":descripcion" => $descripcion, ":ruta" => $ruta, ":id_autor" => $id_autor]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}