import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { BookController } from '../../src/controllers/book.controller';
import { BookService } from '../../src/services/book.service';

describe('BookControllerTest', () => {
  let bookController: BookController;

  const mockBookService = {
    postBook: jest.fn((body:any) => {
      return body;
    })
  };

  const body = {

  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({

      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();

    bookController = app.get<BookController>(BookController);
  });

  it("should be defined", () => {
    expect(bookController).toBeDefined();
  });

    // it('Should NOT throw error if body is valid', () => {
    //   expect(bookController
    //     .postBook(body))
    //     .not.toThrowError(Error);
    // });
 
});
