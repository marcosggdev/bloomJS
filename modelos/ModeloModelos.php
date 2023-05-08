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

    public static function getModelosPorTipoYNumero ($tipo, $numero) {
        try {
            $pdo = new PDO("mysql:dbname=bloomjs;host=db", "root", "alumnado");
            if ($numero == 0) {
                $sql = "SELECT * FROM modelos WHERE tipo=:tipo";
                $preparada = $pdo->prepare($sql);
                $preparada->execute([":tipo" => $tipo]);
            } else if ($numero > 0) {
                $sql = "SELECT * FROM modelos WHERE tipo=:tipo LIMIT :numero";
                $preparada = $pdo->prepare($sql);
                $preparada->execute([":tipo" => $tipo, ":numero" => $numero]);
            }
            $registros = [];
            if ($preparada->rowCount() > 0) {
                while ($registro = $preparada->fetch()) {
                    $array = [
                        'id' => $registro['id'], 
                        'nombre' => $registro['nombre'], 
                        'descripcion' => $registro['descripcion'], 
                        'rutaModelo' => $registro['rutaModelo'],
                        'rutaTextura' => $registro['rutaTextura'],
                        'previsualizacion' => $registro['previsualizacion'],
                        'tipo' => $registro['tipo'],
                        'id_autor' => $registro['id_autor']
                    ];
                    $registros[] = $array;
                }
            }
            return $registros;
        } catch (PDOException $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}