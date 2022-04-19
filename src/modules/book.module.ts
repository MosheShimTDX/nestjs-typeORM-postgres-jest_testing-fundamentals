import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from '../repositories/author.repository';
import { BookController } from '../controllers/book.controller';
import { BooksRepository } from '../repositories/book.repository';
import { BookService } from '../services/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository, AuthorRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
