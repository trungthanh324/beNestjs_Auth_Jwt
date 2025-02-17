import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn, CreateDateColumn  } from 'typeorm';

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
    // @Column()
    public createAt: string;
    
   @UpdateDateColumn({ name: 'updated_at' })
    // @Column()
    public updateAt: string;

    @Column({nullable: true})
    public url: string;
}
export default Note;