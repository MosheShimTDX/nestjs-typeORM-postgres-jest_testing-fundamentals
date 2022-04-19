import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthorModule } from './author.module';
import { BookModule } from './book.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BookModule, AuthorModule], //TypeOrmModule.forRoot find ormconfig.json automatically and uses the configurations for connecting to the db server
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
