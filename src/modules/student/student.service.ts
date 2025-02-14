import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from 'dto/student.dto';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepo : Repository<Student>)
    {}

    createStudent(studentDto : StudentDto){
        const newStudent = this.studentRepo.create(studentDto)
        return this.studentRepo.save(studentDto)
    }
}
