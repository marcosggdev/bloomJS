<?php

class Modelo3D {

    public float $posX;
    public float $posY;
    public float $posZ;
    public float $anguloX;
    public float $anguloY;
    public float $anguloZ;
    public float $factorX;
    public float $factorY;
    public float $factorZ;

    //se crea a partir del objeto de js serializado recibido, que es un string
    public function __construct ($cadena) {
        $pares = explode(";", $cadena);
        for ($i = 0; $i < count($pares); $i++) {
            $nombre = explode(":", $pares[$i])[0];
            $valor = explode(":", $pares[$i])[1];
            $this->$nombre = (float)$valor;
        }
    }

}