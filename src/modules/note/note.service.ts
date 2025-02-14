import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Note from 'src/entity/note.entity'
@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepo: Repository<Note>
    ){}

    // private arrNote : Note[] = [
    //     {
    //         id: 1,
    //         title: 'thanh ne',
    //         content: 'content ne',
    //         description: 'trung thanh',
    //         createAt: '',
    //         updateAt: '',
    //         url: ''
    //     }
    // ]
    createNote(noteData : Note){
        const newNote = this.noteRepo.create(noteData)
        return this.noteRepo.save(newNote)
    }
}
