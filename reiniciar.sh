#!/bin/sh

#Eliminar archivos de la carpeta subidos: solo quedan los por defecto

ruta="/home/alumnado/lamp_alumnado/www/bloomJS";
find "${ruta}/assets/subidos/materiales" -type f -name "*"  -exec rm {} +;
find "${ruta}/assets/subidos/modelos" -type f -name "*"  -exec rm {} +;
find "${ruta}/assets/subidos/previsualizacion" -type f -name "*"  -exec rm {} +;
find "${ruta}/assets/subidos/texturas" -type f -name "*"  -exec rm {} +;
find "${ruta}/assets/subidos/imagenesPerfil" -type f -name "*"  -exec rm {} +;

#Eliminar carpetas personales de los usuarios que no son por defecto

find "${ruta}/usuarios" -type d ! \( -name "admin_admin@admin.es" -o -name "anonimo_anonimo@anonimo.es" \) -exec sudo rm -r {} \;

