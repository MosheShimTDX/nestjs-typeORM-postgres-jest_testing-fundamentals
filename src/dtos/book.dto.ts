import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Author } from 'src/entities/author.entity';

export class BookDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(999)
  price: number;

  @IsNumber()
  @IsOptional()
  author?: number = null;


}
