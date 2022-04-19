import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from '../controllers/author.controller';
import { AuthorRepository } from '../repositories/author.repository';
import { AuthorService } from '../services/author.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
