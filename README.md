# GRUPO 5 - ENTORNOS VIRTUALES DE APRENDIZAJE
## INTEGRANTES:
## -GANDARILLAS HEREDIA RODRIGO
## -MAMANI MAMANI ADRIAN LUCAS
## -ORTUÑO CARREÑO MARCELO

## Requisitos para el Frontend
* Nodejs version >=20 (se trabajo con la version 20.12.1)
* npm version >= 10 (se trabajo con la version 10.5.0)
## Instrucciones para Levantar Frontend
* Ingresar a frontend-eva "cd frontend-eva/"
* Instalar todas las dependencias "npm install"
* Correr el Proyecto "npm run dev"
## Requisitos para el Backend
* PHP versión 8.1.17
* Laravel versión 10
* MariaDB 10.4.28
## Instrucciones para Configurar y Levantar el Backend
* Copiar el archivo de ejemplo .env.example y renombrarlo a .env: "cp .env.example .env"
* Editar el archivo .env y configurar los datos de la base de datos
* Generar la clave de la aplicación Laravel: "php artisan key:generate"
* Ejecutar las migraciones para crear las tablas necesarias en la base de datos: "php artisan migrate"
* Iniciar el servidor local usando Artisan: "php artisan serve"
## Instrucciones de uso
* La aplicacion compara las respuestas impresas en consola del docente y del estudiante habilitando así la siguiente pregunta
* si las respuestas no coinciden tras 3 y 5 intentos se mostraran las ayudas respectivas
* Del apartado (creación de ejercicios) para el docente para implemetar las ayudas, estas se deben de colocar el el codigo estudiante en la parte que desea que aparezcan de la siguiente forma #ayuda 1 seguido de la ayuda y #ayuda 2 seguido de la ayuda
