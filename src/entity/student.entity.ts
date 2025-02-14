import { MaxLength } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity({ name: "students" }) 
@Unique(["identification"])
export class Student{
    @PrimaryGeneratedColumn("uuid")
    public studentId : string

    @MaxLength(50)
    @Column()
    public fullname : string

    @Column()
    public dob : Date

    @Column()
    public email : string

    @Column()
    public phone_number : string

    @Column()
    public enroll_at : Date

    @Column()
    public gender : string

    @Column()
    public identification : string

    // @BeforeInsert()
    // generate37StudentId(){
    //     this.studentId = this.studentId + "X"
    // } 
}