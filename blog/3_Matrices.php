<img src="/bloomJS/img/blog/3_matrices/matrices.png" alt="">
    <h1>Matrices 4x4</h1>
    <hr>
    <p>Bueno, si has llegado hasta aquí ya sabrás que tenemos los datos sobre los vértices del cubo, sus coordenadas UV y los vectores 
        normales a cada cara. Esencialmente tenemos todos los datos necesarios para dibujar un cubo con textura.
    </p>
    <p>Sin embargo, para trabajar en 3D, necesitamos entender cómo funcionan las matrices 4x4 que nos van a permitir escalar, rotar y 
        trasladar un modelo3D una vez lo tengamos. Si estás interesado/a en implementar usando la API de OpenGL, necesitarás conocer 
        cómo funcionan las matrices de rotación, traslación y escala, a nivel matemático y además, cómo funciona un sistema de 
        referencia con respecto a otro en función de una transformación con matrices.
    </p>
    <h3>Matrices de rotación, traslación y escala</h3>
    <p>Para la rotación, traslación o escala de los modelos 3D en un espacio 3D virtual, necesitaremos matrices 4x4. No son estrictamente 
        necesarias (se podría trabajar componente a componente con vectores y las rotaciones se podrían manejar con cuaterniones), pero 
        son una manera muy sencilla de entender las transformaciones.
    </p>
    <p>Ya habíamos visto cómo obtener los vértices de un modelo 3D en la entrada de introducción. Centrémonos en un vértice en particular, puesto 
        que aplicar una transformación a todo el modelo consistirá en aplicar esa transformación a todos los vértices que lo componen, individualmente.
        Por tanto, pensemos en un vértice en particular del modelo, en un espacio de 3 dimensiones.
    </p>
    <img class="ilustracionMatematica" src="/bloomJS/img/blog/3_matrices/vertice.png" alt="">
    <h4>Rotación</h4>
    <p>Antes de nada, nótese que hemos elegido el eje Z apuntando hacia fuera de la pantalla, aunque tenemos el sistema de referencia rotado 
        ligeramente con respecto al eje Y para poder apreciar el plano XZ.
    </p>
    <p>Para rotar el punto v con respecto al origen, tenemos que construir una matriz de rotación, sea R, que será una matriz 4x4 de la 
        siguiente forma:
    </p>
    <img class="ilustracionMatematica" src="/bloomJS/img/blog/3_matrices/matrices_rotacion.png" alt="">
    <p>Donde los subíndices xyz indican el eje de rotación y donde θ es el ángulo de rotación. Una vez tenemos la matriz, si multiplicamos 
        la matriz por un vector 4x1 (4 filas 1 columna) obtendremos un nuevo vector, que estará rotado un ángulo θ con respecto al eje x, en
        comparación a su posición original antes de la rotación. Las ecuaciones podrían resumirse así:
    </p>
    <img class="ilustracionMatematica" src="/bloomJS/img/blog/3_matrices/operacion_rotacion.png" alt="">
    <p>Donde v' es el nuevo vector, rotado, R es la matriz de rotación y su subíndice indica el eje de rotación, θ indica el ángulo de rotación 
        y v es el vector inicial.
    </p>
    <p>Existen también más matrices de rotación que podrían ser de interés, como la matriz de rotación con respecto a un eje arbitrario o la 
        rotación por cuaterniones en lugar de matrices, pero no abarcaremos tanto en esta entrada.
    </p>
    <h4>Traslación</h4>
    <p>Para trasladar un punto p, una distancia representada por un vector v y obtener así el nuevo punto p', el procedimiento es el mismo que en el caso de las rotaciones, 
        pero ahora la matriz que emplearemos será una matriz de traslación, que tendrá la siguiente forma:
    </p>
    <p>Y obtenemos como resultado de una sola multiplicación el vector correcto, que es sumarle el vector v al vector del punto P (vector que 
        une el origen con el punto p)</p>
    <img src="/bloomJS/img/blog/3_matrices/traslacion.png" alt="">
    <h4>Escala</h4>
    <p>Por último tenemos la matriz de escala. Sigue las mismas características que las matrices anteriores, sólo que la matriz cambia a 
        esta:
    </p>
    <img src="/bloomJS/img/blog/3_matrices/escala.png" alt="">