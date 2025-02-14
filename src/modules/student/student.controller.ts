import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from 'dto/student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post("/create")
    createStudent(@Body() student : StudentDto){
        return this.studentService. createStudent(student)
    }
}
