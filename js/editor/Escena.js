class Escena {

    static exportar () {
        //necesitamos la informacion de los modelos, la camara y el renderer.
        let objetosJSON = [];

        for (let i = 0; i < Renderer.dibujables[i]; i++) {
            let objetoJSON = JSON.stringify(Renderer.dibujables[i]);
            objetosJSON.push(objetoJSON);
        }

        objetosJSON.push(JSON.stringify(Renderer.camara));
    }

}