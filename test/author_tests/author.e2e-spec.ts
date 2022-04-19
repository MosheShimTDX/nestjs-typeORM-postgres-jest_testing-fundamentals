import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../src/entities/book.entity';
import { AuthorRepository } from '../../src/repositories/author.repository';
import { AuthorModule } from '../../src/modules/author.module';
import { Author } from '../../src/entities/author.entity';

describe('author (e2e)', () => {
  let app: INestApplication;
  let authorRepository: AuthorRepository;

  // Used for mocking the repository
  // const mockAuthorRepository = {
  //   find: jest.fn().mockResolvedValue([author]),
  // };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // Connecting to the tesing db
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'somePassword',
          database: 'postgres-test',
          entities: ['src/**/*.entity{.ts,.js}'], // The production connection is to '/dist' and not to '/src'
          synchronize: true,
          dropSchema: true, // Deletes all the data every time its making new connection
        }),
        AuthorModule,
      ],
    })
      //Used for mocking the repository
      // .overrideProvider(AuthorRepository) // The provider to mock
      // .useValue(mockAuthorRepository) // the mock to use
      .compile();

    authorRepository = moduleFixture.get(AuthorRepository);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); //For dto validation
    await app.init();
  });

  it('Should find one item after saving one item', async () => {
    await authorRepository.save({
      name: 'author name',
      age: 5,
      country: 'israle',
    });
    expect((await authorRepository.find()).length).toEqual(1);
  });

  // it('/author (GET)', () => {
  //   console.log("first test")
  //   return request(app.getHttpServer()).get('/author').expect(200).expect([]);
  // });

  // it('/author (GET)',  () => {
  //    console.log('second test');
  //    return request(app.getHttpServer()).get('/author').expect(200).expect([]);
  //  });

  // it('/author (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/author')
  //     .expect(200)
  //     .expect([author]);
  // });
});
