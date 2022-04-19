import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookDto } from '../dtos/book.dto';
import { Book } from '../entities/book.entity';
import { BookService } from '../services/book.service';

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

    @Get()
    async getAll(): Promise<Book[]>{
        return this.bookService.getAll();
    }

    @Post()
    async postBook(@Body() dto: BookDto): Promise<Book>{
        return this.bookService.saveBook(dto);
    }
}
