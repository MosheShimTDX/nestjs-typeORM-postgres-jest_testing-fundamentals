import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorDto } from '../dtos/author.dto';
import { Author } from '../entities/author.entity';
import { AuthorService } from '../services/author.service';

@Controller('/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAll(): Promise<Author[]> {
    return this.authorService.getAll();
  }

  @Post()
  async saveAuthor(@Body() dto: AuthorDto): Promise<Author> {
    return this.authorService.saveAuthor(dto);
  }
}
