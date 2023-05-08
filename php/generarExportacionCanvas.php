<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/bloomJS/php/Config.php";
require_once RAIZ_WEB . "php/DTO/Modelo3D.php";
require_once RAIZ_WEB . "php/DTO/Camara.php";

$modelos = [];

if (isset($_POST["objetos"]) && isset($_POST["camara"])) {
    //modelos DTO
    $objetos = explode(",", $_POST["objetos"]);
    for ($i = 0; $i < count($objetos); $i++) {
        $modelo = new Modelo3D($objetos[$i]);
        $modelos[] = $modelo;
    }

    //camara DTO
    $camara = new Camara($_POST["camara"]);

    //generacion del script
    $txt = generarMain($modelos, $camara);
    echo $txt;
}

function generarMain($modelos, $camara) {

    $resultado = " 
    window.addEventListener('load', () => {
        
        //crear canvas y contexto webgl
        canvas = document.createElement('canvas');

        if (!canvas) {
            console.log('Error al obtener el canvas');
            return;
        }
        gl = canvas.getContext('webgl');
        if (!gl) {
            console.log('Error al obtener el contexto del canvas');
            return;
        }
        
        document.body.appendChild(canvas);
        
        //camara que el renderer utiliza para dibujar
        let arcballCamera = new ArcballCamera(".$camara->posXCentro.",".$camara->posYCentro.",".$camara->posZCentro.",".$camara->radio.",".
        $camara->anguloY.",".$camara->anguloXPropio.");

        //se encarga de dibujar en el canvas
        Renderer.iniciar(arcballCamera, 640, 480);";
        for ($i = 0; $i < count($modelos); $i++) {
            $resultado .= "let modelo$i = new Modelo3D(".$modelos[$i]->posX.", ".$modelos[$i]->posY.", ".$modelos[$i]->posZ.", ".$modelos[$i]->anguloX.",".
            $modelos[$i]->anguloY.",".$modelos[$i]->anguloZ.", ".$modelos[$i]->factorX.", ".$modelos[$i]->factorY.", ".$modelos[$i]->factorZ.",'".
            $modelos[$i]->modo."','".$modelos[$i]->rutaArchivoDae."','".$modelos[$i]->rutaTextura."','".$modelos[$i]->rutaMaterial."');";
        }
        
        $resultado .= "". 
        "//el menu global se actualiza cada vez que se añade o borra un grafico dibujable
        
        let grid = new Grid();
        let aps = 24;
        let spa = 1 / aps;
        setInterval(Renderer.ciclo, spa);
    });";

        return $resultado;

}