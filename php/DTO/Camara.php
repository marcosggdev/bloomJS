<?php

class Camara {

    public float $posXCentro;
    public float $posYCentro;
    public float $posZCentro;
    public float $radio;
    public float $anguloY;
    public float $anguloXPropio;

    public function __construct ($cadena) {
        $pares = explode(";", $cadena);

        for ($i = 0; $i < count($pares); $i++) {
            $nombre = explode(":", $pares[$i])[0];
            $valor = explode(":", $pares[$i])[1];
            $this->$nombre = $valor;
        }
    }

}