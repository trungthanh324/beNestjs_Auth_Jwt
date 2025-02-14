import { IsString, IsNotEmpty, MinLength, isNotEmpty } from 'class-validator';
export class NoteDto{
    @IsNotEmpty()
    @MinLength(5)
    public title: string;

    @IsNotEmpty()
    @MinLength(5)
    public content: string;

    @IsNotEmpty()
    @MinLength(5)
    public description: string;
    
    public url: string;
}