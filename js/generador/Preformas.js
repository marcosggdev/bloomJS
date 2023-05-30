class Preformas {

    static crearPreforma (clase) {

        return new Promise(resolve => {

            switch (clase) {
                case "OndaEsferica": 
                    OndaEsferica.crear(0, 0, 0, -80, 0, 0, 10, 10, null, VERTEX_SHADER_ONDA_ESFERICA, FRAGMENT_SHADER_ONDA_ESFERICA, Color.AZUL).then(
                        function (forma) {
                            resolve(forma);
                        }
                    ); 
                    break;
                case "OndaSenoidal": 
                    OndaSenoidal.crear(0,0,0,1,1,VERTEX_SHADER_ONDAS_SENOIDALES, FRAGMENT_SHADER_ONDAS_SENOIDALES, Color.AZUL).then(
                        function (forma) {
                            resolve(forma);
                        }
                    ); 
                    break;
                case "OndasSenoidales": 
                    OndasSenoidales.crear().then(
                        function (forma) {
                            resolve(forma);
                        }
                    );
                    break;
                default:
                    console.log("Error: el tipo de preforma elegido no existe. Clase: " + clase);
            }
        });
    }

}