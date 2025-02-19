import { MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import Note from "./note.entity";
import { Exclude } from "class-transformer";
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
    @Exclude()
    public identification : string

    // @BeforeInsert()
    // generate37StudentId(){
    //     this.studentId = this.studentId + "X"
    // } 
    @OneToMany(() => Note, (note) => note.student)
    note: Note []
}