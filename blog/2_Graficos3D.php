<div class="entrada">
    <img src="/bloomJS/img/barril_blender.jpg" alt="">
    <h1>Gráficos en 3D</h1>
    <p>Aquí podrás aprender sobre desarrollo de gráficos en 3D con OpenGL en general, puesto que las implementaciones con WebGL (web), 
        OpenGL ES (moviles) o OpenGL (escritorio) siguen conceptos similares.
    </p>
    <hr>
    <p>Si has leído la entrada de introducción, ya sabrás de dónde surgió la idea para el proyecto del CFGS DAW: BloomJS y tendrás 
        algunas buenas referencias por si quieres iniciarte en el tema de la programación de graficos en 3D. En esta nueva entrada,
        vamos a comentar de forma sencilla cómo funciona el dibujado de gráficos en 3D utilizando WebGL y en las próximas entradas 
        comentaremos de forma más particular los algoritmos en los que se basa la aplicación web BloomJS. De momento esta entrada 
        tendrá carácter introductorio, por lo que hablaremos de conceptos más que de la propia implementación. Si buscas más
        información sobre la implementación, te recomiendo leer las referencias de la entrada de introducción y visitar el proyecto 
        en Github, teniendo conocimientos en JavaScript. <a href="https://github.com/marcosggdev/bloomJS" target="_blank">
            Repositorio en Github</a>
    </p>
    <h2>Cómo se computa un modelo 3D?</h2>
    <p>Si alguna vez has utilizado cualquier herramienta de modelado en 3D, habrás visto que al exportar el modelo en diferentes
        formatos, como .obj o .dae, el archivo resultante es texto plano con muchos números. Habrás observado también, que los vértices 
        de los modelos definen una serie de triángulos que lo componen.
        Pues bien, en este tipo de archivos, los números son listas, que pueden ser muy MUY largas, de datos, de forma que pueden
        procesarse desde el archivo para obtener de vuelta el dibujo del modelo en la herramienta de modelado 3D que usemos, triángulo a 
        triángulo, pero, ¿Cómo funciona ese proceso?
    </p>
    <p>Supongamos que creamos un cubo, en Blender. Este modelo viene de hecho por defecto en el programa.
        <img src="/bloomJS/img/blog/2_graficos3D/cubo.jpg" alt=""> 
        Si exportamos el modelo 
        en formato .obj, obtendremos un archivo, que si se abre con el bloc de notas tendrá este aspecto:

    </p>
    <p>Pues la clave está en los datos. Los formatos pensados para almacenar modelos 3D, siempre van a tener arrays de números, donde 
        se va a almacenar la posición X, Y y Z de todos los vértices del modelo en cuestión. Si conocemos todas las posiciones de todos
        los vértices, entonces tiene sentido pensar que podemos procesar ese archivo utilizando alguna API de gráficos como WebGL, en
        este caso, para obtener el dibujo del modelo en pantalla. Pero estos formatos no sólo almacenan información sobre la posición 
        de los vértices. También almacenan información sobre cómo mapear una imagen dada a lo largo de los vértices (texturizado) e 
        información sobre vectores normales a cada triángulo del modelo.
    </p>
</div>