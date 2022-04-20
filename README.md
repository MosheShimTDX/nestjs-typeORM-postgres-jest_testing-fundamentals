
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
(make sure you are in the folder)
$ npm start
or you can run in watch mode (automaticly deploy changes and re run the server)
$ npm run start:dev

If you installed every thing you should be able to send a GET request to localhost:3000 and get "Hello World".

## Nestjs workflow and pattern
First is importent to know that nest is depended on 'express'. Express is a server framework for node, there will a lot of use in express.

Modules-

The nest framework is devided to modules. every module contains its providers (usually services), controllers and other imports that the module needs like other modules or classes. The module that was created at first is the app module. in this module you will import all the other smaller modules and other global imports like typeORM connection.

The module will be decorated with @Module and the imports will be inside the decorator

@Module({
  imports: [TypeOrmModule.forRoot(), BookModule, AuthorModule], //TypeOrmModule.forRoot find ormconfig.json automatically and uses the configurations for connecting to the db server
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


Controllers-

Controllers are the api gateway, they handle the end points. Usually the controllers wont do any buisness logic, they may use other classes for authentication the request or validating the body but not containing the buisness logic inside of them. 

In the beginning of the class a @Controller is needed. Inside of the decorator you can put a prefix for all the functions.

@Controller('prefix')
export class AppController {
  constructor(private readonly appService: AppService) {} // Injecting the service

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

In the constructor you inject the providers you want to use #explaination later

The response will be configured autometicly, it will decide if its string or json and what status it is.
You can configure it like that

@Post()
@HttpCode(204)
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
