import { Book } from "../entities/book.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Book) // Custom repository
export class BooksRepository extends Repository<Book>{


}