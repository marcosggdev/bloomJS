<?php

class ModeloEntradas {

    public static function getEntrada   ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM entradas WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'ruta' => $registro['ruta']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function getEntradaPorRuta ($ruta) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM entradas WHERE ruta=:ruta";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":ruta" => $ruta]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'ruta' => $registro['ruta']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public static function getEntradas () {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM entradas";
            
            $preparada = $pdo->prepare($sql);
            $preparada->execute([]);
            $datos = [];
            while ($registro = $preparada->fetch()) {
                $datos[] = [
                    'id' => $registro['id'], 
                    'ruta' => $registro['ruta']
                ];
            }
            return $datos;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        } 
    }

}