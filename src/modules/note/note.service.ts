import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Note from 'src/entity/note.entity'
<<<<<<< HEAD
=======
import { NoteDto } from 'dto/note.dto';
>>>>>>> Auth, Jwt, AccessToken, RefreshToken
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
<<<<<<< HEAD
    createNote(noteData : Note){
=======
    createNote(noteData : NoteDto){      
>>>>>>> Auth, Jwt, AccessToken, RefreshToken
        const newNote = this.noteRepo.create(noteData)
        return this.noteRepo.save(newNote)
    }
}
