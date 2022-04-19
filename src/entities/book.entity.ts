import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Table,
} from 'typeorm';
import { Author } from './author.entity';

@Entity() //Represents an db entity
export class Book {
  @PrimaryGeneratedColumn() //auto increments id, default is integer
  //@Generated("uuid") /   @PrimaryGeneratedColumn("uuid")
  //@PrimaryColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('varchar', { length: 100, nullable: false })
  genre: string;

  @Column('decimal', { nullable: false })
  price: number;

  @ManyToOne(() => Author, (author) => author.books,{
  eager:true
  })
  author: Author;

  constructor(
    name: string,
    genre: string,
    price: number,
    author: Author = null,
  ) {
    this.name = name;
    this.genre = genre;
    this.price = price;
    this.author = author;
  }
}
