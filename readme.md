# Node Mutante

Esta API te permite revisar si un ADN es mutante o no, ademas luego puedes verificar las estadisticas de los ADN previamente revisados.

## Instalacion

* Tener previamente instalado Node.js (Ultima version estable)
* Tener previamente instalado GIT (Ultima version estable)
* Abrir terminal o linea de comandos
* Dirigirse a la ruta donde clonara el proyecto
* Clonar el repositorio
```bash
git clone https://github.com/cyalvarez/node-mutant.git
```
* Ingresar a la carpeta del proyecto
```bash
cd node-mutantes
```
* Instalar dependencias
```bash
npm install
```
* Pegar archivo .env proveido en la raiz del proyecto o crear archivo .env con las credenciales de la base de datos
* Correr el proyecto
```bash
npm run start
```

## Uso

### Local

* Abrir navegador
* Ingresar a http://localhost:3001/
* Verificar que se vea el mensaje "Server Running ⚛"

### Servidor

* Abrir navegador
* Ingresar a https://node-mutant.herokuapp.com/
* Verificar que se vea el mensaje "Server Running ⚛"

## REST API

### Revisar ADN

#### Request

`POST /dna`

#### Body

Ejemplo

    "dna": ["atcaga","cgaaac","accagc","aaacgc","ctgcac","acgtgc"]

#### Response

    Status Code: 200 OK 
    "is a mutant"

    Status Code: 403 Forbidden
    "is not a mutant"

### Ver estadisticas

#### Request

`GET /dna/stats`

#### Response

    Status Code: 200 OK 
    {"count_mutant_dna":0,"count_human_dna":0,"ratio":0}
