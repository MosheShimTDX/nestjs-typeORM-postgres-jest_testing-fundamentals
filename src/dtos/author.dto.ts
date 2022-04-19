import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Book } from 'src/entities/book.entity';

export class AuthorDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @IsOptional()
  books: Book[];
}
