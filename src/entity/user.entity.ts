import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'user'})
class User{
    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column({unique: true})
    public email: string;
   
    @Column()
    public hashedPassword: string;
    
    @Column()
    public firstName: string;
    
    @Column()
    public lastName: string;
    
    @UpdateDateColumn({ name: 'updated_at' })
    @Column()
    public updateAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    @Column()
    public createAt: Date;
}
export default User;