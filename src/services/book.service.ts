import { Injectable } from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { AuthorRepository } from '../repositories/author.repository';
import { BookDto } from '../dtos/book.dto';
import { Book } from '../entities/book.entity';
import { BooksRepository } from '../repositories/book.repository';

@Injectable()
export class BookService {
  constructor(
    // @InjectRepository(Book) private readonly bookRepositroy: Repository<Book> // Also an option for repository injecting
    private readonly booksRepository: BooksRepository, //Injecting a custom repository for the entity
    private readonly authorRepository: AuthorRepository,
  ) {}

  async getAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async saveBook(dto: BookDto): Promise<Book> {
    const author: Author | null =
      dto.author != null
        ? await this.authorRepository.findOne({ id: dto.author })
        : null;

    const book = new Book(dto.name, dto.genre, dto.price, author);
    return await this.booksRepository.save(book);
  }
}
