<?php

class Usuario {

    public int $id;
    public string $correo;
    public string $nombre;
    public string $imagenPerfil;

    public function __construct ($id, $correo, $nombre, $imagenPerfil) {
        $this->id = $id;
        $this->correo = $correo;
        $this->nombre = $nombre;
        $this->imagenPerfil = $imagenPerfil;
    }

}