import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from 'dto/student.dto';
import { StudentUpdateDto } from 'dto/updateStudent.dto';
import { ResponseData } from 'responsedata/responsedata';
import { Student } from 'src/entity/student.entity';
import { HttpMessage, HttpCode } from 'global/enum';

@Controller('student')
@UseInterceptors(ClassSerializerInterceptor)

export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post("/create")
    createStudent(@Body() student : StudentDto){
        return this.studentService. createStudent(student)
    }

    @Put("/:id")
    updateStudent(@Param("id") id : string, @Body() student: Partial<StudentUpdateDto>){
        return this.studentService.updateStudent(id,student)
    }

    @Get()
    async getAllStudent(): Promise<ResponseData<Student[]>>{
        try {
            return new ResponseData<Student[]>(
                await this.studentService.getAllStudent(),
                HttpMessage.SUCCESS,
                HttpCode.SUCCESS
            )
        } catch (error) {
            return new ResponseData<Student[]>(
                [],
                HttpMessage.ERROR,
                HttpCode.ERROR
            )
        }
    }
    @Get("/:id")
    findStudentById(@Param("id") id : string){
        return this.studentService.findStudentById(id)
    }

    @Delete("/:id")
    deleteStudent(@Param("id") id : string){
        return this.studentService.deleteStudent(id)
    }

}
