import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Note from 'src/entity/note.entity'
import { NoteDto } from 'dto/note.dto';
import { StudentService } from '../student/student.service';
@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepo: Repository<Note>
    ){}

    async createNote(noteData : NoteDto){
        const newNote = this.noteRepo.create(noteData)
        return await this.noteRepo.save(newNote)
    }

}
