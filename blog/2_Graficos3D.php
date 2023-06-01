<img src="/bloomJS/img/barril_blender.jpg" alt="Imagen del programa Blender, donde se ve un modelo3D dividido en los vértices que lo conforman">
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
    <h3>Cómo se computa un modelo 3D?</h3>
    <p>Si alguna vez has utilizado cualquier herramienta de modelado en 3D, habrás visto que los modelos se conforman de triángulos
         y que además, al exportar el modelo en diferentes formatos, como .obj o .dae, el archivo resultante es texto plano con muchos números.
        Pues bien, en este tipo de archivos, los números son listas, que pueden ser muy MUY largas, de datos, de forma que pueden
        procesarse desde el archivo para obtener de vuelta el dibujo del modelo en la herramienta de modelado 3D que usemos, triángulo a 
        triángulo, pero, ¿Cómo funciona ese proceso?
    </p>
    <p>Supongamos que creamos un cubo, en Blender. Este modelo viene de hecho por defecto en el programa.
        <img src="/bloomJS/img/blog/2_graficos3D/cubo.jpg" alt="Imagen de un cubo en Blender"> 
        Si exportamos el modelo 
        en formato .obj, obtendremos un archivo, que si se abre con el bloc de notas tendrá este aspecto:<br>
    </p>
    <div class="imgIzquierda">
        <img class="lateral" src="/bloomJS/img/blog/2_graficos3D/cubo_obj.png" alt="Captura del archivo en formato .obj del cubo. Se puede ver una lista larga de líneas con números. El inicio de cada línea tiene un símbolo o carácter indicando el significado de los datos de esa línea.">
        <div class="imgIzquierdaContenido">
            <p>Pues la clave está en los datos. Para entender al 100% lo que significan los datos de un archivo .obj recomiendo visitar la 
            <a href="https://en.wikipedia.org/wiki/Wavefront_.obj_file" target="_blank">página</a> del formato .obj en wikipedia, donde se explica bien cómo funciona el formato. Nosotros vamos a hacer un resumen de 
            qué significan los datos.</p>
            <ul>
                <li><h4>Filas que empiezan por "v":</h4> contienen las coordenadas X, Y y Z de un vértice en particular, de forma que están guardados 
                    todos los vértices que tiene el modelo
                </li>
                <li><h4>Filas que empiezan por "vt":</h4> contienen las coordenadas X e Y de la textura para un vértice en particular. Seguramente 
                    estarás pensando cómo funcionan si tienen sólo 2 variables (X e Y). Pues bien, en WebGL, las texturas (imágenes) tienen 
                    un sistema de coordenadas que va desde el (0,0) en la esquina inferior izquierda de la imagen hasta la coordenada (1,1)
                    en la esquina superior derecha. Es decir, estos números indican posiciones en esa imagen. ¿Y cómo es que van a ser útiles? 
                    Más adelante veremos que una vez tenemos leídos los vértices del cubo, podemos mapear la textura utilizando estas coordenadas,
                    como si estuviésemos plegando un papel con la imagen sobre el modelo. Este concepto se denomina UV Mapping y las coordenadas 
                    se denominan coordenadas UV.
                </li>
                <li><h4>Filas que empiezan por "vn":</h4> imaginemos el cubo donde todas las caras estén subdivididas en triángulos. Pues las coordenadas 
                    vn indican vectores normales que salen de cada cara hacia afuera, esencialmente. Nos permiten tener precomputado estos vectores 
                    para cada triángulo del modelo, y son útiles para calcular cómo interactúa la iluminación en el modelo (por ejemplo, nos permitiría 
                    calcular el ángulo de incidencia de un rayo de luz en esa cara, lo que nos permitirá implementar iluminación suave)
                </li>
                <li><h4>Filas que empiezan por "f":</h4> 
                    <p>tenemos todos los datos, vértices, mapa UV y vectores normales a cada cara. En OpenGL, se dibujan
                    triángulos (entre otras cosas) como función primitiva para formar los modelos, pero hay una cosa de la que no hemos hablado. ¿Cómo
                    sabe el programa qué lado del triángulo tiene que dibujar? Por ejemplo, cuando vemos un cubo, OpenGL estará dibujando triángulos 
                    en las coordenadas correctas, pero ¿cómo sabe que las caras más cercanas deben verse y las que estén más lejanas (por debajo a 
                    nivel 2D) no? ¿y cómo sabe, si el cubo estuviese coloreado, qué lado del triángulo colorear? 
                    La primera pregunta se responde sabiendo que OpenGL utiliza un búfer de profundidad y sabe exáctamente la profundidad de cada píxel
                    que se va a obtener en la pantalla tras dibujar, por lo que sabe qué caras van encima de otras.
                    La segunda pregunta se responde sabiendo lo que es el <a href="https://en.wikipedia.org/wiki/Back-face_culling" taget="_blank">
                        Back Face Culling</a>. Esencialmente consiste en, para ahorrar recursos, colorear el triángulo en cuestión sólo por un lado,
                        mientras que el otro es transparente. En el caso del cubo, si aplicamos back face culling, tendremos un cubo que visto desde 
                        fuera estaría coloreado, pero visto desde dentro sería invisible.
                        El back face culling se basa en definir los triángulos del modelo ordenando los vértices que lo conforman en sentido antihorario
                        si estuviésemos viendo la parte coloreada. Pensad un segundo en eso, si estamos viendo el triángulo coloreado, pensad en un orden 
                        en sentido antihorario en los vértices. Si le diésemos la vuelta al triángulo, con back face culling el triángulo sería invisible,
                        y en este caso los mismos vértices en el mismo orden seguirían un sentido horario.</p>
                    <p>Pues esta información sobre el orden de los vértices nos la dan las filas que empiezan por f. Cada dato es de la forma 
                        v/vt/vn y los valores son el índice en la lista de vértices, coordenadas UV o vectores normales. Para ilustrar esto,
                        veamos el caso del cubo.
                        El primer dato 1/1/1 significa: tenemos un vértice en las coordenadas de la primera fila que empieza por v, tiene las 
                        coordenadas uv de la primera fila que empieza por vt, y tiene el primer vector normal de la lista dada.
                        El segundo dato 5/2/1 significa: tenemos un vértice en las coordenadas indicadas en la quinta fila de vértices, con 
                        coordenadas UV de la segunda fila de coordenadas UV y con vector normal al triángulo correspondiente el primer vector normal.
                        Por tanto, para el primer triángulo, tendríamos que leer los 3 primeros datos de líneas que empiecen por f.
                    </p>
                </li>
            </ul>
        </div>
    </div>
    <img src="/bloomJS/img/blog/2_graficos3D/triangulo_vertices.png" alt="Imagen de un triángulo donde se muestra el sentido antihorario que define qué cara se dibuja y cual no, además de ver el sentido del vector normal (hacia 'fuera' de la pantalla)">
    <p>Y con esto ya podemos entender cómo extraer los datos de un archivo .obj para dibujar con ellos, mediante OpenGL, el modelo de nuevo.
        Esencialmente, tendremos que construir un array (conjunto o lista) con los vértices ordenados de forma correcta, otro array con 
        las coordenadas UV ordenadas de forma correcta y un array con los vectores normales a cada triángulo ordenados de forma correcta.
        Esto nos permitirá dibujar de vuelta el cubo, nos permitirá mapear la textura de forma correcta y tener datos disponibles para manejar
        la iluminación
    </p>
    <p>El formato .dae fue el utilizado al final en el proyecto porque da soporte a más cosas, como la animación de los modelos, pero a nivel 
        de dibujado estático del modelo, la información que contiene sobre vértices, texturizado y vectores normales es exactamente la misma,
        aunque escrita en otro formato (XML).
    </p>
    <p>En próximas entradas, hablaremos de cómo funciona OpenGL y cómo utiliza estos datos para llegar al resultado 3D final y hablaremos
         también de shaders (programas que se ejecutan en la GPU por cada vértice y por cada píxel de la pantalla) y GLSL (el lenguaje
         utilizado para crear los programas de sombreado (shaders))</p>