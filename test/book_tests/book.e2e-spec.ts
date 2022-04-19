import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../../src/modules/book.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../src/entities/book.entity';
import { AuthorRepository } from '../../src/repositories/author.repository';
import { BooksRepository } from '../../src/repositories/book.repository';
import { AuthorModule } from '../../src/modules/author.module';
import { Author } from '../../src/entities/author.entity';
import { response } from 'express';

describe('Book (e2e)', () => {
  let app: INestApplication;

  const createBook = () => new Book('book name', 'genre name', 5345, null);

  //Mocking the functions in the repository
  const mockBookRepository = {
    find: jest.fn().mockResolvedValue([createBook()]),
    save: jest.fn().mockResolvedValue(createBook()),
  };

  //Mocking the functions in the repository
  const mockAuthorRepository = {
    findOne: jest.fn().mockResolvedValue(null),
  };

  beforeAll(async () => {
    //Creating a test environment just for the BookModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
    })

      //Overiding the provides with own providers
      .overrideProvider(BooksRepository)
      .useValue(mockBookRepository)
      .overrideProvider(AuthorRepository)
      .useValue(mockAuthorRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });

  it('/book (GET)', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect([{ ...createBook() }]);
  });

  it('/book (POST)', () => {
    const book = createBook();
    return request(app.getHttpServer())
      .post('/book')
      .expect(201)
      .send({
        name: 'name',
        genre: 'genre',
        price: 5,
      })
      .then((response) => {
        expect(response.body).toMatchObject({ ...Book });
      });
  });
});
