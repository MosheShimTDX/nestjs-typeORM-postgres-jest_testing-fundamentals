
## Getting started with nestjs, typeORM, postgres(dokcer), jest testing
A simple nestjs server that uses postgres and typeORM.

## Postgres on docker
Create an image for postgres

$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

After running your image create a server using your CLI or favorite GUI 

If you notice that your server doesn't work because is cannot connect to localhost or the port, try to restart your computer and run the container first thing when the computer loads

## Dependencies
For this project, I will use npm as my package provider
There are the dependencies that I'm going to use and I will explain more about them later on

nestjs: 
$ nest new %project-name%

typeORM with postgres:
$ npm install --save @nestjs/typeorm typeorm pg

nestjs pipes:
$ npm u --save class-validator class-transformer

### Run the server
(make sure that you are in the folder)
$ npm start
or you can run it in watch mode (automaticly deploy changes and re run the server)
$ npm run start:dev

If you installed everything you should be able to send a GET request to localhost:3000 and get "Hello World".

## Nestjs workflow and pattern
First is important to know that nest is dependent on 'express'. Express is a server framework for node, there will a lot of use in express.

### Modules

The nest framework is divided into modules. every module contains its providers (usually services), controllers, and other imports that the module needs like other modules or classes. The module that was created at first is the app module. in this module, you will import all the other smaller modules and other global imports like typeORM connection.

The module will be decorated with @Module and the imports will be inside the decorator
```
@Module({
//TypeOrmModule.forRoot find ormconfig.json automatically and uses the configurations to connect the db server
  imports: [TypeOrmModule.forRoot(), BookModule, AuthorModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

And for other modules (BookModule) we will import other modules, providers and controllers
```
@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository, AuthorRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
```

### Controllers

Controllers are the api gateway, they handle the endpoints. Usually, the controllers won't do any business logic, they may use other classes for authenticating the request or validating the body but not containing the business logic inside of them. 

At the beginning of the class, a @Controller is needed. Inside the decorator, you can put a prefix for all the functions.
```
@Controller('prefix')
export class AppController {
  constructor(private readonly appService: AppService) {} // Injecting the service

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
```
In the constructor, you inject the providers you want to use #explaination later


The response will be configured automatically, it will decide if it's string or json and what status it is.
You can configure it like that
```
@Post()
@HttpCode(204)
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

To get a url param you will write it like this
```
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

You can get the requset like this
```
@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

Or if you want only the body
```
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```
### Services/Providers
Services are where the fun part begins, here most of the business logic and magic happens

First, we need to mark a class as injectable

```
@Injectable()
export class AppService {
  getHello(): string {
    // business logic here
    return 'Hello World!';
  }
}
```

If you want to put a constructor parameter in the service which is optional it can be don't like this

```
@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

## TypeORM
After seeing how nest works, we can connect it to a database with typeORM.

First create a filt names ormconfig.json in root folder.
Inside that file you will write all your configurations for the server
```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "somePassword",
  "database": "postgres",
  "entities": ["dist/**/*.entity{.ts,.js}"], // Where the compiled entities will be
  "synchronize": true, // Will automatically update the database schema, Not recommended at all to use in production, in production migration file should be used
  //
 dropSchema: true, // Deletes all the data every time
}
```

###### Notice that when you move files around the typeorm may not sync and you will need to delete the dist folder and restart the server. This will create new dist folder and create the files with the right imports

Now we want to start and use the connections, we will put the connection in app.module so it will be available to the whole app
```
@Module({
  imports: [TypeOrmModule.forRoot(), BookModule, AuthorModule], //TypeOrmModule.forRoot find ormconfig.json automatically and uses the configurations for connecting to the db server
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

That's it! You are now connected (If you did everything right).

##### Creating entities

A simple entity looks like that
```
@Entity() //Represents an db entity
export class Book {
  @PrimaryGeneratedColumn() //auto increments id
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('varchar', { length: 100, nullable: false })
  genre: string;

  @Column('decimal', { nullable: false })
  price: number;

```

Instead of auto-incrementing you can use other decorators like
  //@PrimaryGeneratedColumn("uuid") / @Generated("uuid")(you need to mark this as @PrimartColumn if you want it to be a primary key)
  //@PrimaryColumn() And add id programmably
  
Now typeORM will create a table with the columns as defined

#### Repository
For running queries or simple crus functions you have a few ways to do it. First you can use entity manager but I wont cover it here because there is simpler way that work for most of the time. 

###### Injecting the repository class direclty
```
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private usersRepository: Repository<Book>,
  ) {}
  }
```

This is very convidient but what if we want to use the same repository in different services with custom functions(queries) that we made or use a repository pattern for our application?
For this we need to create a custom repository 

Lets create a repository class
```
@EntityRepository(Book) // Custom repository
export class BooksRepository extends Repository<Book>{
}
```

And now import it in our module as a typeORM feature
```
@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
```

Now we can use it in the service like this:
```
@Injectable()
export class BookService {
  constructor(
    private readonly booksRepository: BooksRepository, //Injecting a custom repository for the entity
  ) {}
  }
```

#### Interacting with the repository
```
 async getAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }
  

  async saveBook(dto: BookDto): Promise<Book> {
    const book = new Book(dto.name, dto.genre, dto.price, author);
    return await this.booksRepository.save(book);
  }
  
  async findByName(firstName: string):Promise<Book> {
        return this.findOne({ name: firstName });
    }

```
Notice that we return a promise of Book

We can create custom query also
```
await this.bookRepository
      .createQueryBuilder('book')
      .where('book.id = :id', { id: 1 })
      .getOne();

```
