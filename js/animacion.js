class Animacion {
    constructor (id, huesosAnimados, esqueleto, skin, modelo3d) {
        this.id = id;
        this.huesosAnimados = huesosAnimados;
        this.esqueleto = esqueleto;
        this.skin = skin;
        this.modelo3d = modelo3d;
        this.iniciar();
    }

    iniciar () {
        //comienza a ejecutar la animacion en bucle
        this.frame = 0;
        this.bucle = setInterval( () => {this.transformar()}, 1000);
    }

    parar () {
        //para el bucle de animacion y deja la animacion por defecto idle en curso
        clearInterval(this.bucle);
    }

    transformar () {
        for (let i = 0; i < this.huesosAnimados.length; i++) {
            let animacionHueso = this.huesosAnimados[i];
            let id = animacionHueso.target.split("Armature_")[1];
            id = "#Armature_" + id.split("/")[0]; 
            //antes teniamos joint por defecto. Ahora tendremos joint transformada y es la que hara mover el objeto
            this.skin.actualizarTransformaciones(id, animacionHueso.matricesOutput[this.frame]);
            this.modelo3d.posar();
        }
        this.frame++;
    }
}