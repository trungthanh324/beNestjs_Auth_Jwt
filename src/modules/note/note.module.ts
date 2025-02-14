import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Note from 'src/entity/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
