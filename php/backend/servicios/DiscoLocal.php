<?php

class DiscoLocal {

    //vacia la carpeta y luego borra la propia carpeta. 
    public static function eliminarCarpeta ($ruta) {

        $archivos = scandir($ruta);
        
        //borrar archivos de la carpeta
        if (count($archivos) > 0) {
            for ($i = 0; $i < count($archivos); $i++) {
                unlink($ruta . "/" . $archivos[$i]);
            }
        }

        //borrar carpeta
        return rmdir($ruta);

    }

    //borrar archivo
    public static function eliminarArchivo ($ruta) {
        return unlink($ruta);
    }

}