<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 
```
npm install
```
3. Tener Nest CLI unstalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __```.env.template```__ y renombrar la copia __```.env```__
6. Llenar las variables de entorno definidas en el __```.env```__
7. Ejecutar la aplicacion em dev:
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla 
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest

# Production Build
1. Crear el archivo __```.env.prod```__
2. Llenar las varibles de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d 
```