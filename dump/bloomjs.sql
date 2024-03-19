CREATE TABLE IF NOT EXISTS modelos (.
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,.
    nombre VARCHAR(20) UNIQUE NOT NULL,.
    descripcion VARCHAR(100) NOT NULL,.
    rutaModelo VARCHAR(100) NOT NULL,. 
    rutaTextura VARCHAR(100) NOT NULL,. 
    previsualizacion varchar(100) DEFAULT 'assets/defecto/previsualizacion/defecto.png', . 
    tipo VARCHAR(20) NOT NULL, .
    id_autor INT NOT NULL);

CREATE TABLE IF NOT EXISTS usuarios (.
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,.
    correo VARCHAR(100) NOT NULL,.
    nombre VARCHAR(40) UNIQUE NOT NULL,.
    clave VARCHAR(15) NOT NULL,.
    imagenPerfil VARCHAR(60) DEFAULT 'assets/defecto/imagenesPerfil/defecto.png',. 
    rutaCarpeta VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS entradas (. 
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, . 
    ruta VARCHAR(100) UNIQUE NOT NULL);

//id_autor null => comentario anonimo
CREATE TABLE IF NOT EXISTS comentarios ( . 
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, . 
    texto VARCHAR(200) NOT NULL, . 
    id_target INT NOT NULL,. 
    id_autor INT NOT NULL);

CREATE TABLE IF NOT EXISTS escenas ( . 
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, .
    titulo VARCHAR(40) DEFAULT 'Escena', .
    descripcion VARCHAR(200) DEFAULT 'Escena de  BloomJS', .  
    ruta VARCHAR(200) UNIQUE NOT NULL, .
    id_autor INT NOT NULL);
                
ALTER TABLE modelos ADD FOREIGN KEY(id_autor) REFERENCES usuarios(id);
ALTER TABLE comentarios ADD FOREIGN KEY(id_target) REFERENCES entradas(id);
ALTER TABLE comentarios ADD FOREIGN KEY(id_autor) REFERENCES usuarios(id);
ALTER TABLE escenas ADD FOREIGN KEY(id_autor) REFERENCES usuarios(id);

//primero datos en usuarios pork en modelos hay fk y daria error al no existir aun el dato
INSERT IGNORE INTO usuarios (correo, nombre, clave, imagenPerfil, rutaCarpeta) VALUES ( . 
'admin@admin.es', 'admin', 'admin', 'assets/defecto/imagenesPerfil/admin.png', 'usuarios/admin_admin@admin.es');
INSERT IGNORE INTO usuarios (correo, nombre, clave, imagenPerfil, rutaCarpeta) VALUES ( . 
'anonimo@anonimo.es', 'anonimo', 'anonimo', 'assets/defecto/imagenesPerfil/defecto.png','usuarios/anonimo_anonimo@anonimo.es');

INSERT IGNORE INTO modelos (nombre, descripcion, rutaModelo, rutaTextura, previsualizacion, tipo, id_autor) VALUES (.
'Barril', 'Modelo por defecto', 'assets/defecto/modelos/barril.dae', 'assets/defecto/texturas/barril.jpg', 'assets/defecto/previsualizacion/barril.png', 'defecto', '1');
INSERT IGNORE INTO modelos (nombre, descripcion, rutaModelo, rutaTextura, previsualizacion, tipo, id_autor) VALUES (.
'Veleta', 'Modelo por defecto', 'assets/defecto/modelos/veleta.dae', 'assets/defecto/texturas/veleta.png', 'assets/defecto/previsualizacion/veleta.jpg', 'defecto', '1');

INSERT IGNORE INTO entradas (ruta) VALUES ('blog/0_Notas de desarrollo.php')
INSERT IGNORE INTO entradas (ruta) VALUES ('blog/1_Introduccion.php')
INSERT IGNORE INTO entradas (ruta) VALUES ('blog/2_Graficos3D.php')
INSERT IGNORE INTO entradas (ruta) VALUES ('blog/3_Matrices.php')
INSERT IGNORE INTO entradas (ruta) VALUES ('blog/4_MatrizMVP.php')
INSERT IGNORE INTO entradas (ruta) VALUES ('blog/5_WebGL.php')

INSERT IGNORE INTO comentarios (texto, id_target, id_autor) VALUES ('hola mundo1 admin', '1', '1');
INSERT IGNORE INTO comentarios (texto, id_target, id_autor) VALUES ('hola mundo2 anonimo', '2', '2');
INSERT IGNORE INTO comentarios (texto, id_target, id_autor) VALUES ('hola mundo3 anonimo', '3', '2');
INSERT IGNORE INTO comentarios (texto, id_target, id_autor) VALUES ('hola mundo4 anonimo', '4', '2');
INSERT IGNORE INTO comentarios (texto, id_target, id_autor) VALUES ('hola mundo5 admin', '5', '1');