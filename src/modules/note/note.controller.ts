import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoteService } from './note.service';
import Note from 'src/entity/note.entity';
import { NoteDto } from 'dto/note.dto';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService){}

    @Post('create')
    createNote(@Body() post : NoteDto){
        return this.noteService.createNote(post)
    }
}
