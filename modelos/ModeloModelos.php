<?php

class ModeloModelos {

    public static function getModelo ($id) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            $sql = "SELECT * FROM modelos WHERE id=:id";
           // $res = $pdo->query($sql);
            $preparada = $pdo->prepare($sql);
            $preparada->execute([":id" => $id]);
            if ($preparada->rowCount() > 0) {
                $registro = $preparada->fetch();
                return [
                    'id' => $registro['id'], 
                    'nombre' => $registro['nombre'], 
                    'descripcion' => $registro['descripcion'], 
                    'rutaModelo' => $registro['rutaModelo'],
                    'rutaTextura' => $registro['rutaTextura'],
                    'id_autor' => $registro['id_autor']
                ];
            }
            return false;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}