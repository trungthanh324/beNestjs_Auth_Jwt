import { HttpStatus, Injectable, Res, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from 'dto/student.dto';
import { StudentUpdateDto } from 'dto/updateStudent.dto';
import { ResponseData } from 'responsedata/responsedata';
import { Student } from 'src/entity/student.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepo : Repository<Student>
    ) 
    {}

    async createStudent(studentDto : StudentDto){
        const newStudent = this.studentRepo.create(studentDto)
        return await this.studentRepo.save(newStudent)
    }

    async updateStudent(id: string, studentDto: Partial<StudentUpdateDto>){
        const student = await this.studentRepo.findOne({
            where: { studentId: id } as FindOptionsWhere<Student>, 
        });       
         if(!student){
            throw new Error('Student not found');
        }
        // Object.assign(student, studentDto)
        this.studentRepo.update(student,studentDto )
        this.studentRepo.save(student);
        return studentDto
    }

    async getAllStudent(){
        try {
            console.log(this.studentRepo.find())
            const student = await this.studentRepo.find()
            return student
        } catch (error) {
            throw new Error(`Failed to fetch students: ${error.message}`)
        }
    }

    async findStudentById(id : string){
        try {
            if(!isUUID(id)){
                throw new Error("Invalid UUID format")
            }
            const student = await this.studentRepo.findOneBy({studentId: id});
            return student
        } catch (error) {
            throw new Error("Invalid UUID format")
        }
    }

    async deleteStudent(id : string){
        try {
           const student = await this.studentRepo.findOne({where : {studentId : id}})
           
           if(!student){
            throw new Error("Invalid UUID format") 
           }

           this.studentRepo.remove(student) 
           return {
            statusCode: HttpStatus.ACCEPTED,
            message: "Delete OK",
           }
        } catch (error) {
            throw new Error("Invalid UUID format")
        }
    }

}
