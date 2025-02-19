import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn  } from 'typeorm';
import { Student } from './student.entity';

@Entity({name: "note"})
class Note{
    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public title: string;
   
    @Column()
    public content: string;
    
    @Column()
    public description: string;
    
    @CreateDateColumn({ name: 'created_at' })
    public createAt: string;
    
    @UpdateDateColumn({ name: 'updated_at' })
    public updateAt: string;

    @Column({nullable: true})
    public url: string;

    @ManyToOne(() => Student, (student) => student.note)
    @JoinColumn({name : "student_id"})
    student : Student[] 
}
export default Note;