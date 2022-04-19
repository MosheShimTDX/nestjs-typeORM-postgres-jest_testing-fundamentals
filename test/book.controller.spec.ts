import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookDto } from './dtos/book.dto';
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';

describe('BookControllerTests', () => {
  let bookController: BookController;

  const mockBookService = { // Creating mock class
    saveBook: jest.fn((json) => { // Adding mock function
      return Promise.resolve(new Book());
    })
  };

  const json = () => {
    return {
    id:undefined,
    name:'a book name',
    author:"an author name",
    genre:"action",
    price: 55.5
  }}

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
    
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService) //The class to mock
      .useValue(mockBookService) //The mock used
      .compile();
     
  
    bookController = app.get<BookController>(BookController);
  });

  it("should be defined", () => {
    expect(bookController).toBeDefined();
  });

    it('Should NOT throw error if body is valid', () => {
      expect(() =>
        bookController.postBook(json()))
        .not.toThrow(Error);
    });
  
});
