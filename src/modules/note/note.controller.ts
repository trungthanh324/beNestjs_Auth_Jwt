import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoteService } from './note.service';
import Note from 'src/entity/note.entity';
<<<<<<< HEAD
=======
import { NoteDto } from 'dto/note.dto';
>>>>>>> Auth, Jwt, AccessToken, RefreshToken

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService){}

    @Post('create')
<<<<<<< HEAD
    createNote(@Body() post : Note){
=======
    createNote(@Body() post : NoteDto){
>>>>>>> Auth, Jwt, AccessToken, RefreshToken
        return this.noteService.createNote(post)
    }
}
