import { Author } from "../entities/author.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author>{
    
}