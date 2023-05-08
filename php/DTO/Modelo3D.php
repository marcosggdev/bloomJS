<?php

class Modelo3D {

    public $posX;
    public $posY;
    public $posZ;
    public $anguloX;
    public $anguloY;
    public $anguloZ;
    public $factorX;
    public $factorY;
    public $factorZ;
    public $modo;
    public $rutaArchivoDae;
    public $color = [];
    public $rutaTextura;
    public $rutaMaterial;

    //se crea a partir del objeto de js serializado recibido, que es un string
    public function __construct ($cadena) { 
        $pares = explode(";", $cadena);
        for ($i = 0; $i < count($pares); $i++) {
            $nombre = explode(":", $pares[$i])[0];
            $valor = explode(":", $pares[$i])[1];

            if ($nombre == "color") {
                $resultado = [];
                preg_match_all("/[0-9]+(.[0-9]+)?/", $valor, $resultado);
                $this->color = $resultado[0];
            } else {
                $this->$nombre = $valor;
            }
        }
    }

}