<?php

class BaseDatos {

    private string $dsn;
    private string $usuario;
    private string $clave;
    private PDO $con;

    public function __construct (string $dsn, string $usuario, string $clave) {
        $this->setDsn($dsn);
        $this->setUsuario($usuario);
        $this->setClave($clave);
        try {
            $this->con = new PDO($this->getDsn(), $this->getUsuario(), $this->getClave());
        } catch (PDOException $e) {
            echo "Error al conectar con la base de datos: " . $e->getMessage();
        }
    }

    public function getDsn() : string {
        return $this->dsn;
    }

    public function setDsn (string $dsn) : void {
        $this->dsn = $dsn;
    }

    public function getUsuario () : string {
        return $this->usuario;
    }

    public function setUsuario (string $usuario) : void {
        $this->usuario = $usuario;
    }

    public function getClave () : string {
        return $this->clave;
    }

    public function setClave (string $clave) : void {
        $this->clave = $clave;
    }

    public function getCon () : PDO {
        return $this->con;
    }

    public function setCon (PDO $con) : void {
        $this->con = $con;
    }

    public function borrarPDO () {
        $this->con = null;
    }

    public function __sleep () {
        return ['dsn', 'usuario', 'clave'];
    }

    public function __wakeup () {
        //despues de des-serializar el PDO, volvemos a iniciar la conexion
        try {
            $this->con = new PDO($this->getDsn(), $this->getUsuario(), $this->getClave());
        } catch (PDOException $e) {
            echo "Error al conectar con la base de datos: " . $e->getMessage();
        }
    }

    //función estática para crear una base de datos en mysql
    public static function crearBaseDatos ($nombreBase) {
        try {
            //crear la base nombreBase
            $con = new PDO("mysql:host=db", "root", "alumnado");
            $consulta = "CREATE DATABASE IF NOT EXISTS " . $nombreBase . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";

            //ejecutar e imprimir errores
            $con->query($consulta);

            //una vez existe nos conectamos a ella para ejecutar el DDL e insertar datos por defecto
            $con = new PDO("mysql:dbname=".$nombreBase.";host=db", "root", "alumnado");

            //lista de consultas a ejecutar
            $consultas = [
                "CREATE TABLE IF NOT EXISTS modelos (".
                    "id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,".
                    "nombre VARCHAR(20) UNIQUE NOT NULL,".
                    "descripcion VARCHAR(100) NOT NULL,".
                    "rutaModelo VARCHAR(100) NOT NULL,". 
                    "rutaTextura VARCHAR(100) NOT NULL,". 
                    "id_autor INT NOT NULL);",

                "CREATE TABLE IF NOT EXISTS usuarios (".
                    "id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,".
                    "correo VARCHAR(100) NOT NULL,".
                    "nombre VARCHAR(40) UNIQUE NOT NULL,".
                    "clave VARCHAR(15) NOT NULL,".
                    "imagenPerfil VARCHAR(60) DEFAULT 'recursos/imagenesPerfil/defecto.png');",
                
                "ALTER TABLE modelos ADD FOREIGN KEY(id_autor) REFERENCES usuarios(id);",

                //primero datos en usuarios pork en modelos hay fk y daria error al no existir aun el dato
                "INSERT IGNORE INTO usuarios (correo, nombre, clave) VALUES (" . 
                "'usuario@usuario.es', 'Usuario', 'usuario');",

                "INSERT IGNORE INTO modelos (nombre, descripcion, rutaModelo, rutaTextura, id_autor) VALUES (".
                "'Barril', 'Modelo por defecto', 'assets/defecto/modelos/barril.dae', 'assets/defecto/texturas/barril.jpg', '1');",
            ];
            for ($i = 0; $i < count($consultas); $i++) {
                $con->query($consultas[$i]);
            }
            $con = null;
            echo "Base de datos creada con éxito<br>";
        } catch (PDOException $e) {
            print_r($e->getMessage());
        }
    }

    //Función estática para borrar una base de datos en mysql
    public static function borrarBaseDatos ($nombreBase) {
        try {
            //conexion a la base a borrar
            $con = new PDO("mysql:dbname=".$nombreBase.";host=db", "alumnado", "alumnado");
            $consulta = "DROP DATABASE IF EXISTS " . $nombreBase;
            //ejecutar consulta y tratam. errores
            $con->query($consulta);
            $con = null;
        } catch (PDOException $e) {
            print_r($e->getMessage());
        }
    }
}