import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity() //Represents an db entity
export class Author {
  @PrimaryGeneratedColumn() //auto increments id, default is integer
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('smallint', { nullable: true })
  age: number;

  @Column('varchar', { length: 100, nullable: false })
  country: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
