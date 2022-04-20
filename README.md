
## Getting started with nestjs, typeORM, postgres(dokcer), jest testing
I simple nestjs server that uses postgres and typeORM. 

## Postgres on docker
Create an image for postgres

$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

After running your image create a server using your CLI or favorite GUI 

If you notice that you server doesn't work becuase is cannot connect to local host or the port, try to restart you computer and run the container first thing when the computer loads

## Dependencies
For this project I will use npm as my package provider
There are the dependencies that I'm going to use and I will explain more about them later on

nestjs: 
$ nest new %project-name%

typeORM with postgres:
$ npm install --save @nestjs/typeorm typeorm pg

nestjs pipes:
$ npm u --save class-validator class-transformer

## Run the server
$ npm start
or you can run in watch mode (automaticly deploy changes and re run the server)
$ npm run start:dev
