# Backend Adoptions API

Proyecto desarrollado para la entrega final de Backend en Coderhouse.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Passport JWT
- Swagger
- Docker
- Mocha / Chai / Supertest

## Documentación API

Swagger disponible en:

http://localhost:8080/api/docs

## Tests

Para ejecutar los tests:

npm test

## Docker

### Construir la imagen

docker build -t backend-adoptions .

### Ejecutar el contenedor

docker run -p 8080:8080 --env-file .env backend-adoptions

## Imagen en DockerHub

https://hub.docker.com/r/kevinpaez5/backend-adoptions