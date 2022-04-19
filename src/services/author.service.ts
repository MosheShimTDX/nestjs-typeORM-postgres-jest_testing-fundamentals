import { Injectable } from "@nestjs/common";
import { AuthorDto } from "../dtos/author.dto";
import { Author } from "../entities/author.entity";
import { AuthorRepository } from "../repositories/author.repository";

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async getAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async saveAuthor(dto: AuthorDto): Promise<Author> {
    const author: Author = dto;    
    return await this.authorRepository.save(author);
  }
}