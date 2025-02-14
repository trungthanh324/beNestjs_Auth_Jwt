import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoteService } from './note.service';
import Note from 'src/entity/note.entity';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService){}

    @Post('create')
    createNote(@Body() post : Note){
        return this.noteService.createNote(post)
    }
}
